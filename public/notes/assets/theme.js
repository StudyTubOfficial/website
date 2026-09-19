/**
 * Theme for the static notes pages.
 *
 * Shares localStorage["theme"] with the React app's ThemeToggle, so a choice
 * made in either place holds across both. Without this the app's toggle had no
 * effect here and a user in dark mode hit a white page on every link.
 *
 * Loaded SYNCHRONOUSLY in <head>, before any content renders — deferring it
 * would paint the light theme first and flash white on a dark-mode device.
 */
(function () {
  "use strict";

  function stored() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }

  function apply(theme) {
    // No attribute at all means "follow the system", which the CSS media query
    // then handles. Only an explicit choice is stamped.
    if (theme === "dark" || theme === "light") {
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  apply(stored());

  function current() {
    var s = stored();
    if (s === "dark" || s === "light") return s;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark" : "light";
  }

  window.__toggleTheme = function () {
    var next = current() === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", next); } catch (e) { /* private mode */ }
    apply(next);
  };

  // Follow the system while the user has made no explicit choice.
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function () { if (!stored()) apply(null); };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  // Keep tabs in sync — changing the theme in the React app updates open pages.
  window.addEventListener("storage", function (ev) {
    if (ev.key === "theme") apply(ev.newValue);
  });
})();
