/**
 * Netlify Edge Function — AEO (Answer Engine Optimization)
 * Implements AEO Spec v1.0: https://dualmark.dev/docs/spec/overview
 *
 * Fixes all 11 failing checks:
 *
 * [REQUIRED]
 *   md.contentType           → Content-Type: text/markdown; charset=utf-8
 *   md.tokensHeader          → X-Markdown-Tokens: <positive-integer>
 *   md.noindex               → X-Robots-Tag: noindex
 *   md.vary                  → Vary: Accept on markdown responses
 *   html.linkAlternate       → Link: <url.md>; rel="alternate"; type="text/markdown"
 *   negotiation.acceptHeader → Accept: text/markdown → text/markdown response
 *
 * [RECOMMENDED]
 *   md.aeoVersion            → X-AEO-Version: 1.0
 *   md.nosniff               → X-Content-Type-Options: nosniff
 *   html.vary                → Vary: Accept on HTML responses
 *   negotiation.botUa        → GPTBot + other AI bots → text/markdown response
 *   negotiation.notAcceptable→ Accept excluding html+markdown → 406
 */

// ---------------------------------------------------------------------------
// AEO Spec v1.0 AI Bot Registry
// Source: https://dualmark.dev/docs/spec/ai-bot-detection
// ---------------------------------------------------------------------------
const AI_BOT_PATTERNS = [
    /GPTBot/i,
    /ChatGPT-User/i,
    /OAI-SearchBot/i,
    /ClaudeBot/i,
    /Claude-Web/i,
    /anthropic-ai/i,
    /PerplexityBot/i,
    /Google-Extended/i,
    /CCBot/i,
    /YouBot/i,
    /cohere-ai/i,
    /Bytespider/i,
    /FacebookBot/i,
    /meta-externalagent/i,
    /Applebot-Extended/i,
    /Timpibot/i,
    /iaskspider/i,
    /DuckAssistBot/i,
];

/** Returns true when the UA matches a known AI crawler. */
function detectAIBot(ua) {
    return AI_BOT_PATTERNS.some((pattern) => pattern.test(ua));
}

/**
 * Whitespace-split token estimator — fast, zero-dep.
 * Matches the algorithm used by @dualmark/core.estimateTokens.
 */
function estimateTokens(text) {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words * 1.3));
}

/**
 * Parse Accept header per RFC 7231 §5.3.2.
 * Returns "markdown" | "html" | null (→ 406).
 *
 * Logic:
 *  - If text/markdown has strictly higher q-factor than text/html → "markdown"
 *  - If text/html (or wildcard) has equal or higher q              → "html"
 *  - If neither is acceptable                                       → null (406)
 */
function negotiateFormat(accept) {
    if (!accept) return "html";

    const entries = accept
        .split(",")
        .map((part) => {
            const segs = part.trim().split(";");
            const type = segs[0].trim().toLowerCase();
            const qSeg = segs.slice(1).find((s) => s.trim().startsWith("q="));
            const q = qSeg ? parseFloat(qSeg.trim().slice(2)) : 1.0;
            return { type, q: isNaN(q) ? 1.0 : q };
        })
        .filter(({ q }) => q > 0);

    // Effective quality for a given media-type (respects wildcards).
    const qOf = (target) => {
        const exact = entries.find(({ type }) => type === target);
        if (exact) return exact.q;
        if (target.startsWith("text/")) {
            const sub = entries.find(({ type }) => type === "text/*");
            if (sub) return sub.q;
        }
        const wild = entries.find(({ type }) => type === "*/*");
        return wild ? wild.q : 0;
    };

    const qHtml = qOf("text/html");
    const qMd = qOf("text/markdown");

    if (qHtml === 0 && qMd === 0) return null; // 406
    if (qMd > qHtml) return "markdown";
    return "html";
}

/**
 * Convert an HTML page path to its markdown twin path.
 *   /          → /index.md
 *   /about     → /about.md
 *   /about.md  → /about.md  (idempotent)
 */
function toMdPath(pathname) {
    if (pathname.endsWith(".md")) return pathname;
    const clean = pathname.replace(/\/$/, "") || "/index";
    return clean === "/" ? "/index.md" : `${clean}.md`;
}

/**
 * Build the full set of required + recommended AEO response headers
 * for a markdown twin response.
 */
function buildMarkdownHeaders(body) {
    return {
        "Content-Type": "text/markdown; charset=utf-8",
        "X-Markdown-Tokens": String(estimateTokens(body)),
        "X-Robots-Tag": "noindex",
        "Vary": "Accept",
        "X-AEO-Version": "1.0",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "public, max-age=3600",
    };
}

// ---------------------------------------------------------------------------
// Edge Function handler
// ---------------------------------------------------------------------------
export default async function handler(request, context) {
    const url = new URL(request.url);
    const { pathname } = url;
    const accept = request.headers.get("accept") ?? "";
    const ua = request.headers.get("user-agent") ?? "";

    const isBot = detectAIBot(ua);
    const fmt = negotiateFormat(accept);
    const isMdRequest = pathname.endsWith(".md");

    // ── negotiation.notAcceptable ─────────────────────────────────────────────
    // Return 406 for non-bot requests whose Accept excludes both text/html and
    // text/markdown.  Bots always get markdown regardless of Accept.
    if (fmt === null && !isBot) {
        return new Response("406 Not Acceptable", {
            status: 406,
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Vary": "Accept",
            },
        });
    }

    // ── Serve markdown twin ───────────────────────────────────────────────────
    // Triggered by:  direct .md URL  |  Accept: text/markdown  |  AI bot UA
    //
    // Fixes: md.contentType, md.tokensHeader, md.noindex, md.vary,
    //        md.aeoVersion, md.nosniff, negotiation.acceptHeader,
    //        negotiation.botUa
    if (isMdRequest || fmt === "markdown" || isBot) {
        const mdPath = isMdRequest ? pathname : toMdPath(pathname);

        // Rewrite the request to the static .md file that lives in the build
        // output (copied from public/*.md by `npm run build`).
        // Netlify serves physical files before the /* SPA redirect rule fires,
        // so build/index.md, build/about.md, … are served directly.
        const mdUrl = new URL(request.url);
        mdUrl.pathname = mdPath;
        mdUrl.search = "";

        const staticRes = await context.next(new Request(mdUrl.toString(), { method: "GET" }));

        if (!staticRes.ok) {
            const fallback = `# Page Not Found\n\nNo markdown twin exists at \`${mdPath}\`.\n`;
            return new Response(fallback, {
                status: 404,
                headers: buildMarkdownHeaders(fallback),
            });
        }

        const body = await staticRes.text();
        return new Response(body, {
            status: 200,
            headers: buildMarkdownHeaders(body),
        });
    }

    // ── HTML response — inject AEO discovery headers ──────────────────────────
    // Pass through to the static site, then bolt on Link rel=alternate + Vary.
    //
    // Fixes: html.linkAlternate, html.vary
    const res = await context.next();
    const mdPath = toMdPath(pathname);
    const headers = new Headers(res.headers);

    // html.linkAlternate
    headers.set("Link", `<${mdPath}>; rel="alternate"; type="text/markdown"`);

    // html.vary — merge "Accept" into whatever Vary is already set
    const existingVary = headers.get("Vary") ?? "";
    const varySet = new Set(
        existingVary ? existingVary.split(",").map((v) => v.trim()) : []
    );
    varySet.add("Accept");
    headers.set("Vary", [...varySet].join(", "));

    return new Response(res.body, { status: res.status, headers });
}

export const config = { path: "/*" };
