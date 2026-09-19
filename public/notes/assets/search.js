/**
 * Search for the static notes pages.
 *
 * Same index as the React component on the homepage, but plain DOM — these
 * pages deliberately do not load the app bundle. Progressive: the field only
 * appears once the index resolves, so a failed fetch leaves no dead input.
 */
(function () {
  "use strict";
  var box = document.querySelector("[data-notes-search]");
  if (!box) return;

  var input = box.querySelector("input");
  var panel = box.querySelector("[data-results]");
  var index = null, hits = [], active = 0;

  function loggedIn() {
    try { return !!localStorage.getItem("token"); } catch (e) { return false; }
  }

  function load() {
    if (index) return;
    index = [];
    fetch("/notes/assets/search-index.json")
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (d) { index = d; render(); })
      .catch(function () { index = []; });
  }

  function search(q) {
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length || !index) return [];
    var out = [];
    for (var i = 0; i < index.length; i++) {
      var e = index[i];
      var hay = (e.t + " " + (e.c || []).join(" ") + " " + (e.m || "")).toLowerCase();
      var all = terms.every(function (t) { return hay.indexOf(t) !== -1; });
      if (!all) continue;
      var score = 0, title = e.t.toLowerCase();
      if ((e.c || []).some(function (c) { return c.toLowerCase() === terms[0]; })) score -= 100;
      if (title.indexOf(terms[0]) === 0) score -= 50;
      score += e.k === "semester" ? 0 : e.k === "subject" ? 5 : 20;
      out.push([score + title.length / 100, e]);
    }
    return out.sort(function (a, b) { return a[0] - b[0]; }).slice(0, 8).map(function (x) { return x[1]; });
  }

  var KIND = { semester: "Semester", subject: "Subject", file: "File" };

  function render() {
    var q = input.value.trim();
    if (!q) { panel.hidden = true; panel.innerHTML = ""; return; }
    hits = search(q);
    panel.hidden = false;
    if (!hits.length) {
      panel.innerHTML = '<div class="nsearch__empty">' +
        (index && index.length ? "No match. Try a subject name or a code like 18EC1T12." : "Loading notes\u2026") +
        "</div>";
      return;
    }
    panel.innerHTML = hits.map(function (h, i) {
      return '<button type="button" class="nsearch__hit' + (i === active ? " is-active" : "") +
        '" data-i="' + i + '">' +
        '<span class="nsearch__kind nsearch__kind--' + h.k + '">' + KIND[h.k] + "</span>" +
        '<span class="nsearch__title"></span>' +
        '<span class="nsearch__meta"></span></button>';
    }).join("") +
      '<div class="nsearch__foot"><span>\u21B5 to open</span><span>\u2191\u2193 to navigate</span>' +
      (loggedIn() ? "" : "<span>Files need a free account</span>") + "</div>";
    // Titles set as text, never innerHTML — file names are external data.
    var nodes = panel.querySelectorAll(".nsearch__hit");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].querySelector(".nsearch__title").textContent = hits[i].t;
      nodes[i].querySelector(".nsearch__meta").textContent =
        (hits[i].c && hits[i].c.length ? hits[i].c[0] : hits[i].m) || "";
    }
  }

  function go(h) {
    if (!h) return;
    window.location.href = loggedIn() ? h.u : "/login?redirect=" + encodeURIComponent(h.u);
  }

  input.addEventListener("focus", load);
  input.addEventListener("input", function () { active = 0; render(); });
  input.addEventListener("keydown", function (ev) {
    if (!hits.length) return;
    if (ev.key === "ArrowDown") { ev.preventDefault(); active = (active + 1) % hits.length; render(); }
    else if (ev.key === "ArrowUp") { ev.preventDefault(); active = (active - 1 + hits.length) % hits.length; render(); }
    else if (ev.key === "Enter") { ev.preventDefault(); go(hits[active]); }
    else if (ev.key === "Escape") { panel.hidden = true; input.blur(); }
  });
  panel.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-i]");
    if (b) go(hits[+b.getAttribute("data-i")]);
  });
  document.addEventListener("mousedown", function (ev) {
    if (!box.contains(ev.target)) panel.hidden = true;
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "/" && document.activeElement.tagName !== "INPUT") {
      ev.preventDefault(); input.focus();
    }
  });
})();
