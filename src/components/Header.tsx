"use client";
import { useRef, useState } from "react";
const links = [
  ["Learn", "#learn"],
  ["Games", "#games"],
  ["Pathways", "#pathways"],
  ["Field Notes", "#field-notes"],
  ["About", "#about"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Strategy Lab home">
        <span className="brand-icon" aria-hidden="true">
          ↗
        </span>
        Strategy Lab<span className="brand-period">.</span>
      </a>
      <button
        ref={toggle}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close −" : "Menu +"}
      </button>
      <nav
        id="main-navigation"
        aria-label="Main navigation"
        className={open ? "navigation is-open" : "navigation"}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            toggle.current?.focus();
          }
        }}
      >
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a
          className="button ink small"
          href="#learn"
          onClick={() => setOpen(false)}
        >
          Start learning <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
