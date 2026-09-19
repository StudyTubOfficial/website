# Why Your Website Is Slow (And How to Find Out)

**URL:** https://studytub.netlify.app/blog/why-your-website-is-slow.html
**Published:** 2026-08-09
**Tags:** Web, Performance

Render-blocking resources, oversized images, third-party scripts and unused JavaScript — the four causes behind most slow pages, and how to measure rather than guess.

## Measure first

Every performance discussion should start with a measurement, because intuition is wrong more often than not. Lighthouse in Chrome DevTools takes thirty seconds and tells you which of the following applies.

## 1. Render-blocking resources

A stylesheet or synchronous script in \`<head>\` stops the browser painting until it loads.

<pre><code>&lt;!-- blocks: parser waits for a network round trip --&gt;
&lt;script src="https://analytics.example.com/script.js"&gt;&lt;/script&gt;

&lt;!-- does not block --&gt;
&lt;script defer src="https://analytics.example.com/script.js"&gt;&lt;/script&gt;</code></pre>

Analytics, chat widgets and ad scripts have no reason to block first paint. \`defer\` costs one word.

Your own CSS *should* block — the alternative is a flash of unstyled content.

## 2. Images

Usually the largest single cause.

- **Wrong size.** A 2000px image displayed at 200px downloads 100× the pixels needed.
- **Wrong format.** WebP is typically 30% smaller than JPEG at the same quality.
- **No dimensions.** Causes layout shift, which is a separate metric and a separate penalty.

<pre><code>&lt;img src="photo.webp" width="800" height="600" loading="lazy" alt="…"&gt;</code></pre>

\`loading="lazy"\` on below-the-fold images defers them until needed.

## 3. Third-party scripts

The ones you did not write and cannot optimise. An ad script can exceed 200 KB and block the main thread for over 100 ms.

The question worth asking is whether each one earns its cost. A script loading on every page and producing nothing measurable is pure overhead — and that situation is more common than it sounds, particularly with ad scripts left in place after the ad units were removed.

## 4. Unused JavaScript

Shipping code nobody runs. Two common sources:

**No code splitting.** Every route in one bundle means a visitor to the homepage downloads the settings page too. Lazy-load routes.

**Heavy libraries for light tasks.** An animation library for one fade-in, a date library for one format call. Check the size before adding a dependency.

## Lab versus field

Lighthouse simulates one load on your machine. Real users are on slower devices and worse networks, so field data is usually worse than your lab score.

Both are useful: lab to debug, field to know. Only field data tells you what people actually experienced.

## The order to work in

1. Remove what you do not need — unused scripts, dead assets.
2. Stop what remains from blocking — \`defer\`, \`async\`, lazy loading.
3. Shrink what is left — image formats, code splitting.

Deleting is always the biggest win, and it is the step people skip.
