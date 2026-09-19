/**
 * Gate the drive links on the static notes pages.
 *
 * These pages are deliberately public so Google can index them — that is the
 * whole point of having them. The FILES behind them are not: clicking through
 * to the drive requires the same login the React app uses.
 *
 * How it works: every link to notes.studytub.workers.dev is intercepted. With a
 * token in localStorage the click proceeds untouched. Without one the visitor
 * goes to /login?redirect=<the drive url they wanted>, and Login.js sends them
 * back there after signing in.
 *
 * This is not a security boundary — localStorage is client-side and the drive
 * URL is visible in the page source. It is an access gate of the same strength
 * as the rest of the site's auth. Anything that must be truly private has to be
 * enforced by the drive itself, not here.
 */
(function () {
    "use strict";

    var DRIVE_HOST = "notes.studytub.workers.dev";

    function isLoggedIn() {
        try {
            return !!localStorage.getItem("token");
        } catch (e) {
            // Private browsing or blocked storage — treat as logged out rather
            // than throwing and leaving every link dead.
            return false;
        }
    }

    function markState() {
        var loggedIn = isLoggedIn();
        document.documentElement.setAttribute("data-auth", loggedIn ? "in" : "out");

        // Swap the sign-in prompt for a signed-in note.
        var banner = document.querySelector("[data-auth-banner]");
        if (banner) banner.hidden = loggedIn;

        // Label the drive buttons so the gate is visible before the click.
        var links = document.querySelectorAll('a[href*="' + DRIVE_HOST + '"]');
        for (var i = 0; i < links.length; i++) {
            var a = links[i];
            if (a.hasAttribute("data-no-gate")) continue;
            a.setAttribute("data-gated", loggedIn ? "false" : "true");
            if (!loggedIn && !a.querySelector(".lock")) {
                var lock = document.createElement("span");
                lock.className = "lock";
                lock.setAttribute("aria-hidden", "true");
                lock.textContent = " 🔒";
                a.appendChild(lock);
            }
        }
    }

    document.addEventListener("click", function (ev) {
        var a = ev.target.closest ? ev.target.closest("a") : null;
        if (!a || !a.href || a.hasAttribute("data-no-gate")) return;
        if (a.href.indexOf(DRIVE_HOST) === -1) return;
        if (isLoggedIn()) return;

        ev.preventDefault();
        // Carry the intended destination so login can return the user to it.
        window.location.href = "/login?redirect=" + encodeURIComponent(a.href);
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", markState);
    } else {
        markState();
    }
})();
