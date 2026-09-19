# What Happens When You Type a URL and Press Enter

**URL:** https://studytub.netlify.app/blog/http-request-lifecycle.html
**Published:** 2026-08-31
**Tags:** Networks, Web

DNS, TCP, TLS, HTTP, rendering — the whole chain, at the depth a networks course expects and an interview asks for.

## The classic interview question

It is asked because a complete answer touches DNS, transport, cryptography, HTTP and browser internals. Here is the chain.

## 1. URL parsing

The browser splits \`https://studytub.netlify.app/notes/\` into scheme, host and path, and checks HSTS — a list of domains that must be HTTPS. If listed, an http:// link is upgraded before any request leaves.

## 2. DNS resolution

The hostname becomes an IP address, through a cache hierarchy:

1. Browser cache
2. OS cache
3. Router / ISP resolver
4. Root → TLD (.app) → authoritative nameserver

Each level caches for the record's TTL, which is why a DNS change takes time to propagate.

## 3. TCP handshake

Three packets before any data moves:

    Client → SYN
    Server → SYN-ACK
    Client → ACK

One full round trip. On a 100 ms connection that is 100 ms spent before a single byte of your page.

## 4. TLS handshake

For HTTPS, another negotiation: cipher agreement, the server's certificate, and key exchange. TLS 1.3 needs one round trip, TLS 1.2 needed two.

The certificate is verified against a chain of trust ending at a root CA your OS already trusts. This is what makes the padlock meaningful.

## 5. The HTTP request

    GET /notes/ HTTP/1.1
    Host: studytub.netlify.app
    Accept: text/html

The server responds with a status line, headers and a body.

## 6. Rendering

The browser parses HTML into the DOM, and CSS into the CSSOM. The two combine into a render tree, which is laid out (positions and sizes) and then painted.

The critical detail: **a stylesheet in \`<head>\` blocks rendering**, because the browser cannot paint without knowing styles. A synchronous \`<script>\` blocks parsing too, which is why \`defer\` and \`async\` exist.

## Why this is worth knowing

Every one of these steps is somewhere a page gets slow. A slow first byte is DNS, TCP or server time. A slow first paint is usually a render-blocking resource. Knowing the chain is how you know which one to measure.
