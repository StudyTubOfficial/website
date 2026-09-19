import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiSearch, FiCornerDownLeft, FiLock } from "react-icons/fi";
import { isLoggedIn } from "../../utils/driveLink";
import "./notesSearch.css";

/**
 * Search across every semester, subject and note file.
 *
 * The index is built at build time from the real drive listing
 * (public/notes/assets/search-index.json — 478 entries) and fetched lazily on
 * first focus, so it costs nothing on initial page load.
 *
 * Results route to the on-site page that describes the material rather than
 * straight to the drive: that page is crawlable, explains what the folder
 * holds, and gates the file link itself. A signed-out user who picks a result
 * still lands on a useful page rather than a login wall.
 */
const KINDS = { semester: "Semester", subject: "Subject", file: "File" };

export default function NotesSearch({ autoFocus = false, placeholder = "Search notes, subjects or a subject code…" }) {
  const [index, setIndex] = useState(null);
  const [q, setQ] = useState("");
  const [hits, setHits] = useState([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef(null);
  const inputRef = useRef(null);

  // Fetch once, on first interaction — 61 KB should not be on the critical path.
  const load = useCallback(() => {
    if (index) return;
    fetch("/notes/assets/search-index.json")
      .then((r) => (r.ok ? r.json() : []))
      .then(setIndex)
      .catch(() => setIndex([]));
  }, [index]);

  useEffect(() => {
    if (!q.trim() || !index) { setHits([]); return; }
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    const scored = [];
    for (const e of index) {
      const hay = (e.t + " " + (e.c || []).join(" ") + " " + (e.m || "")).toLowerCase();
      if (!terms.every((t) => hay.includes(t))) continue;
      const title = e.t.toLowerCase();
      // Rank: exact subject-code match, then title prefix, then kind, then length.
      let score = 0;
      if ((e.c || []).some((c) => c.toLowerCase() === terms[0])) score -= 100;
      if (title.startsWith(terms[0])) score -= 50;
      score += e.k === "semester" ? 0 : e.k === "subject" ? 5 : 20;
      score += title.length / 100;
      scored.push([score, e]);
    }
    scored.sort((a, b) => a[0] - b[0]);
    setHits(scored.slice(0, 8).map((x) => x[1]));
    setActive(0);
  }, [q, index]);

  // Close on outside click.
  useEffect(() => {
    const onDoc = (ev) => { if (boxRef.current && !boxRef.current.contains(ev.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // "/" focuses search from anywhere, the way most doc sites behave.
  useEffect(() => {
    const onKey = (ev) => {
      if (ev.key === "/" && document.activeElement?.tagName !== "INPUT") {
        ev.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (hit) => {
    if (!hit) return;
    // Pages are public; only the files behind them need an account. Send a
    // signed-out user through login so they return to the page they chose.
    window.location.href = isLoggedIn() ? hit.u : `/login?redirect=${encodeURIComponent(hit.u)}`;
  };

  const onKeyDown = (ev) => {
    if (!open || !hits.length) return;
    if (ev.key === "ArrowDown") { ev.preventDefault(); setActive((i) => (i + 1) % hits.length); }
    else if (ev.key === "ArrowUp") { ev.preventDefault(); setActive((i) => (i - 1 + hits.length) % hits.length); }
    else if (ev.key === "Enter") { ev.preventDefault(); go(hits[active]); }
    else if (ev.key === "Escape") { setOpen(false); inputRef.current?.blur(); }
  };

  const signedOut = !isLoggedIn();

  return (
    <div className="nsearch" ref={boxRef}>
      <div className="nsearch__field">
        <FiSearch className="nsearch__icon" size={20} aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          className="nsearch__input"
          value={q}
          placeholder={placeholder}
          autoFocus={autoFocus}
          aria-label="Search notes"
          autoComplete="off"
          onFocus={() => { load(); setOpen(true); }}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onKeyDown={onKeyDown}
        />
        <kbd className="nsearch__kbd">/</kbd>
      </div>

      {open && q.trim() && (
        <div className="nsearch__panel" role="listbox">
          {hits.length === 0 ? (
            <div className="nsearch__empty">
              {index === null ? "Loading notes…" : (
                <>No match for <strong>{q}</strong>. Try a subject name, or a code like <code>18EC1T12</code>.</>
              )}
            </div>
          ) : (
            <>
              {hits.map((h, i) => (
                <button
                  key={h.k + h.t + i}
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  className={`nsearch__hit${i === active ? " is-active" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(h)}
                >
                  <span className={`nsearch__kind nsearch__kind--${h.k}`}>{KINDS[h.k]}</span>
                  <span className="nsearch__title">{h.t}</span>
                  <span className="nsearch__meta">
                    {(h.c || []).length ? h.c[0] : h.m}
                    {signedOut && <FiLock size={12} aria-label="sign in required" />}
                  </span>
                </button>
              ))}
              <div className="nsearch__foot">
                <span><FiCornerDownLeft size={12} /> to open</span>
                <span>↑↓ to navigate</span>
                {signedOut && <span>Files need a free account</span>}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
