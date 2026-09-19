# Core Web Vitals Explained: LCP, CLS and INP

**URL:** https://studytub.netlify.app/blog/core-web-vitals-explained.html
**Published:** 2026-08-23
**Tags:** Web, Performance

Three metrics Google uses as a ranking signal, what each measures in terms a user would recognise, and the usual causes of a bad score.

## Why these three

Google needed metrics that correlate with how a page *feels*, not how fast a file downloads. Core Web Vitals are the result: loading, stability and responsiveness.

They are a ranking factor, which is why they appear in SEO discussions as well as engineering ones.

## LCP — Largest Contentful Paint

**When the main content appears.** Measured to the render of the largest visible element — usually a hero image, a heading or a block of text.

Good is under 2.5 seconds.

LCP has two halves worth separating: time spent *loading* the resource, and time spent *waiting*. A diagnostic showing 0 ms of network time and 3 seconds of "render delay" means the element was ready and something prevented it painting — almost always JavaScript.

A common cause: an animation library that starts elements at \`opacity: 0\` and reveals them after it loads. The text was there the whole time, invisible, waiting on a bundle.

## CLS — Cumulative Layout Shift

**How much the page jumps around.** You start reading, an image loads above, and the text moves.

Good is under 0.1.

The dominant cause is images without dimensions:

<pre><code>&lt;img src="photo.jpg"&gt;                        <!-- browser cannot reserve space -->
&lt;img src="photo.jpg" width="800" height="600"&gt; <!-- space reserved before load -->
</code></pre>

Ads and late-injected banners are the other frequent culprit.

## INP — Interaction to Next Paint

**How quickly the page responds to a click or tap.** Replaced FID in 2024, and measures the whole interaction rather than only the first.

Good is under 200 ms.

Bad INP usually means long tasks blocking the main thread. JavaScript is single-threaded, so a 300 ms task means 300 ms where nothing can respond. Breaking work into smaller chunks, or moving it off the main thread, is the fix.

## Lab versus field

Lighthouse runs one simulated load on one machine — useful for debugging, not representative.

Field data comes from real visitors on real devices and networks. It is the data Google actually uses, and it is usually worse than your lab score, because your laptop is faster than your median visitor's phone.

Collecting it yourself, from your own analytics, is the only way to see what people actually experience.
