import { useState, useEffect, useRef } from "react";

const injectFont = () => {
  if (document.getElementById("ess-fonts")) return;
  const link = document.createElement("link");
  link.id = "ess-fonts";
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=General+Sans:wght@300;400;500;600;700&display=swap";
  document.head.appendChild(link);
};

const injectStyles = () => {
  if (document.getElementById("ess-styles")) return;
  const s = document.createElement("style");
  s.id = "ess-styles";
  s.textContent = `
    :root {
      --teal: #2dd4bf;
      --teal-bright: #5eead4;
      --teal-dark: #14b8a6;
      --teal-glow: rgba(45,212,191,0.1);
      --teal-deep: rgba(45,212,191,0.06);
      --black: #0a0a0a;
      --black-mid: #141414;
      --black-soft: #1e1e1e;
      --black-card: #191919;
      --smoke: #888888;
      --ash: #555555;
      --mist: #b0b0b0;
      --cloud: #f5fdfb;
      --ice: #e2f5f0;
      --sheet: #f7f7f5;
      --white: #ffffff;
    }

    .ess * { box-sizing: border-box; margin: 0; padding: 0; }
    .ess {
      font-family: 'General Sans', sans-serif;
      color: var(--black);
      background: var(--sheet);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    @keyframes ess-up {
      from { opacity: 0; transform: translateY(40px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes ess-marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes ess-typing {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
      30%            { transform: translateY(-5px); opacity: 1; }
    }
    @keyframes ess-float {
      0%, 100% { transform: translateY(0) rotate(-0.5deg); }
      50%      { transform: translateY(-10px) rotate(0.5deg); }
    }

    .ess-a { animation: ess-up 0.8s cubic-bezier(.22,1,.36,1) both; }
    .ess-a1 { animation-delay: 0.1s; }
    .ess-a2 { animation-delay: 0.2s; }
    .ess-a3 { animation-delay: 0.34s; }
    .ess-a4 { animation-delay: 0.48s; }

    /* ── NAV ── */
    .ess-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 1.15rem 5%;
      transition: all 0.35s ease;
    }
    .ess-nav.stuck {
      background: rgba(247,247,245,0.94);
      backdrop-filter: blur(16px);
      box-shadow: 0 1px 0 rgba(0,0,0,0.06);
    }
    .ess-logo {
      font-family: 'Manrope', sans-serif;
      font-weight: 800; font-size: 1.15rem;
      color: var(--white); text-decoration: none;
      transition: color 0.3s; letter-spacing: -0.04em;
    }
    .ess-nav.stuck .ess-logo { color: var(--black); }
    .ess-nav-links { display: flex; align-items: center; gap: 2.25rem; }
    .ess-nav-link {
      font-size: 0.84rem; font-weight: 600;
      color: rgba(255,255,255,0.5); text-decoration: none;
      transition: color 0.25s;
    }
    .ess-nav-link:hover { color: var(--white); }
    .ess-nav.stuck .ess-nav-link { color: var(--smoke); }
    .ess-nav.stuck .ess-nav-link:hover { color: var(--black); }
    .ess-nav-btn {
      background: var(--teal); color: var(--black);
      padding: 0.6rem 1.5rem; border-radius: 8px;
      font-size: 0.84rem; font-weight: 700;
      text-decoration: none; transition: all 0.25s;
    }
    .ess-nav-btn:hover { background: var(--teal-dark); transform: translateY(-1px); }

    /* ── HERO ── */
    .ess-hero {
      min-height: 100vh;
      background: var(--black);
      position: relative; overflow: hidden;
      display: flex; align-items: center;
      padding: 0 5%;
    }
    .ess-hero-bg {
      position: absolute; inset: 0;
      background:
        radial-gradient(ellipse 60% 55% at 20% 55%, rgba(45,212,191,0.05), transparent),
        radial-gradient(ellipse 50% 50% at 85% 30%, rgba(45,212,191,0.03), transparent),
        linear-gradient(175deg, var(--black), #0d0d0d);
    }
    .ess-hero-texture {
      position: absolute; inset: 0; pointer-events: none;
      background-image: radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px);
      background-size: 28px 28px;
      mask-image: radial-gradient(ellipse 75% 65% at 50% 50%, black 25%, transparent 100%);
    }
    .ess-hero-inner {
      position: relative; z-index: 2;
      display: grid; grid-template-columns: 1.2fr 1fr;
      align-items: center; gap: 4rem;
      max-width: 1180px; margin: 0 auto;
      width: 100%; padding: 8rem 0 6rem;
    }
    .ess-badge {
      display: inline-flex; align-items: center; gap: 0.5rem;
      background: var(--teal-deep);
      border: 1px solid rgba(45,212,191,0.15);
      padding: 0.4rem 1rem 0.4rem 0.7rem;
      border-radius: 8px; margin-bottom: 1.75rem;
    }
    .ess-badge-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--teal);
    }
    .ess-badge-text {
      font-size: 0.72rem; font-weight: 700;
      color: var(--teal-bright);
      letter-spacing: 0.1em; text-transform: uppercase;
    }
    .ess-h1 {
      font-family: 'Manrope', sans-serif;
      font-size: clamp(2.8rem, 5.5vw, 4.4rem);
      font-weight: 800; line-height: 1.06;
      letter-spacing: -0.04em; color: var(--white);
      margin-bottom: 1.5rem;
    }
    .ess-h1-pop { color: var(--teal); }
    .ess-hero-p {
      font-size: 1.1rem; color: rgba(255,255,255,0.4);
      max-width: 480px; font-weight: 400; line-height: 1.8;
      margin-bottom: 2.5rem;
    }
    .ess-hero-p strong { color: rgba(255,255,255,0.7); font-weight: 600; }
    .ess-hero-ctas { display: flex; gap: 0.85rem; flex-wrap: wrap; }
    .ess-btn {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.9rem 2rem;
      font-family: 'General Sans', sans-serif;
      font-weight: 700; font-size: 0.95rem;
      cursor: pointer; border: none; text-decoration: none;
      transition: all 0.25s ease; border-radius: 8px;
    }
    .ess-btn-teal {
      background: var(--teal); color: var(--black);
      box-shadow: 0 4px 20px rgba(45,212,191,0.25);
    }
    .ess-btn-teal:hover {
      background: var(--teal-dark); transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(45,212,191,0.35);
    }
    .ess-btn-ghost {
      background: rgba(255,255,255,0.05);
      color: rgba(255,255,255,0.5);
      border: 1.5px solid rgba(255,255,255,0.1);
    }
    .ess-btn-ghost:hover {
      color: var(--white); background: rgba(255,255,255,0.08);
      border-color: rgba(255,255,255,0.2);
    }

    /* ── HERO VISUAL ── */
    .ess-hero-vis {
      display: flex; justify-content: center;
      animation: ess-float 7s ease-in-out infinite;
    }
    .ess-vis-card {
      background: var(--black-soft);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 20px; padding: 1.75rem;
      width: 100%; max-width: 340px;
      position: relative;
    }
    .ess-vis-float {
      position: absolute; padding: 0.5rem 0.9rem;
      border-radius: 10px; font-size: 0.73rem;
      font-weight: 700; white-space: nowrap;
    }
    .ess-vf1 {
      top: -14px; right: -14px;
      background: var(--teal); color: var(--black);
      box-shadow: 0 8px 24px rgba(45,212,191,0.25);
    }
    .ess-vf2 {
      bottom: -14px; left: -10px;
      background: var(--black-mid); color: var(--smoke);
      border: 1px solid rgba(255,255,255,0.08);
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    }
    .ess-vis-header {
      display: flex; align-items: center; gap: 0.65rem;
      margin-bottom: 1.25rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .ess-vis-avi {
      width: 38px; height: 38px; border-radius: 10px;
      background: var(--black-card);
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem;
    }
    .ess-vis-name { font-weight: 700; color: var(--white); font-size: 0.88rem; }
    .ess-vis-type { font-size: 0.7rem; color: rgba(255,255,255,0.25); }
    .ess-vis-chat-preview {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.04);
      border-radius: 12px; padding: 1rem;
      margin-bottom: 1rem;
    }
    .ess-vis-chat-msg {
      font-size: 0.78rem; line-height: 1.5;
      margin-bottom: 0.6rem;
    }
    .ess-vis-chat-msg:last-child { margin-bottom: 0; }
    .ess-vis-chat-bot { color: rgba(255,255,255,0.5); }
    .ess-vis-chat-cust { color: var(--teal); text-align: right; }
    .ess-vis-stats { display: flex; gap: 0.75rem; }
    .ess-vis-mini-stat {
      flex: 1; text-align: center;
      background: rgba(255,255,255,0.02);
      border-radius: 8px; padding: 0.6rem 0.5rem;
    }
    .ess-vis-mini-num {
      font-family: 'Manrope', sans-serif;
      font-weight: 800; font-size: 1.15rem;
      color: var(--white);
    }
    .ess-vis-mini-num span { color: var(--teal); }
    .ess-vis-mini-lbl {
      font-size: 0.58rem; font-weight: 600;
      color: rgba(255,255,255,0.2);
      letter-spacing: 0.08em; text-transform: uppercase;
    }

    /* ── TRUST STRIP ── */
    .ess-trust {
      background: var(--cloud); padding: 2.5rem 5%;
      display: flex; justify-content: center; align-items: center;
      gap: 3rem; flex-wrap: wrap;
      border-bottom: 1px solid var(--ice);
    }
    .ess-trust-item {
      display: flex; align-items: center; gap: 0.6rem;
      font-size: 0.88rem; font-weight: 600;
      color: var(--ash);
    }
    .ess-trust-icon {
      width: 32px; height: 32px; border-radius: 8px;
      background: var(--teal-glow);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.85rem;
    }

    /* ── MARQUEE ── */
    .ess-marquee {
      background: var(--black); padding: 0.75rem 0;
      overflow: hidden; white-space: nowrap;
    }
    .ess-marquee-track {
      display: inline-block;
      animation: ess-marquee 30s linear infinite;
    }
    .ess-marquee-item {
      display: inline-flex; align-items: center; gap: 1.25rem;
      font-weight: 600; font-size: 0.7rem;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: rgba(255,255,255,0.15); padding: 0 1.75rem;
    }
    .ess-marquee-dot {
      width: 4px; height: 4px; border-radius: 50%;
      background: var(--teal); opacity: 0.4;
      display: inline-block;
    }

    /* ── SECTIONS ── */
    .ess-section { padding: 6.5rem 5%; }
    .ess-section-inner { max-width: 1100px; margin: 0 auto; }
    .ess-tag {
      font-size: 0.7rem; font-weight: 700;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--teal-dark); margin-bottom: 1rem;
      display: flex; align-items: center; gap: 0.6rem;
    }
    .ess-tag-line { width: 20px; height: 2px; background: var(--teal); border-radius: 2px; }
    .ess-h2 {
      font-family: 'Manrope', sans-serif;
      font-size: clamp(2rem, 3.8vw, 2.7rem);
      font-weight: 800; letter-spacing: -0.035em;
      line-height: 1.1; margin-bottom: 0.75rem;
      color: var(--black);
    }
    .ess-h2 .hl { color: var(--teal-dark); }
    .ess-desc {
      color: var(--smoke); font-size: 1.02rem;
      font-weight: 400; max-width: 500px; line-height: 1.75;
    }

    /* ── SERVICES ── */
    .ess-services {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem; margin-top: 3.5rem;
    }
    .ess-card {
      background: var(--white); border-radius: 16px;
      padding: 2.25rem 2rem;
      border: 1.5px solid rgba(0,0,0,0.06);
      transition: all 0.35s ease; cursor: default;
      position: relative; overflow: hidden;
    }
    .ess-card::after {
      content: ''; position: absolute;
      bottom: 0; left: 0; right: 0; height: 3px;
      background: var(--teal);
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.35s ease;
    }
    .ess-card:hover::after { transform: scaleX(1); }
    .ess-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 48px rgba(0,0,0,0.06);
      border-color: transparent;
    }
    .ess-card-icon {
      width: 50px; height: 50px; border-radius: 12px;
      background: var(--black);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.3rem; margin-bottom: 1.5rem;
      transition: background 0.35s;
    }
    .ess-card:hover .ess-card-icon { background: var(--teal-dark); }
    .ess-card-title {
      font-family: 'Manrope', sans-serif;
      font-weight: 700; font-size: 1.12rem;
      letter-spacing: -0.02em; margin-bottom: 0.5rem;
      color: var(--black);
    }
    .ess-card-body {
      color: var(--smoke); font-size: 0.9rem;
      line-height: 1.7; margin-bottom: 1.25rem;
    }
    .ess-card-price {
      display: inline-block;
      font-size: 0.72rem; font-weight: 700;
      letter-spacing: 0.05em; text-transform: uppercase;
      color: var(--teal-dark); padding: 0.35rem 0.85rem;
      border-radius: 6px; background: var(--teal-glow);
    }

    /* ── DEMO ── */
    .ess-demo-section {
      background: var(--black); padding: 6.5rem 5%;
      position: relative; overflow: hidden;
    }
    .ess-demo-section::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse 50% 60% at 75% 50%, rgba(45,212,191,0.04), transparent);
    }
    .ess-demo-grid {
      max-width: 1100px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1.1fr;
      gap: 5rem; align-items: center;
      position: relative; z-index: 2;
    }
    .ess-demo-grid .ess-h2 { color: var(--white); }
    .ess-demo-grid .ess-h2 .hl { color: var(--teal); }
    .ess-demo-grid .ess-desc { color: rgba(255,255,255,0.35); }

    .ess-chat {
      background: var(--white); border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 30px 80px rgba(0,0,0,0.3);
    }
    .ess-chat-top {
      background: var(--black-mid); padding: 1rem 1.5rem;
      display: flex; align-items: center; gap: 0.7rem;
    }
    .ess-chat-avi {
      width: 34px; height: 34px; border-radius: 10px;
      background: var(--black-soft);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.9rem;
    }
    .ess-chat-who { font-weight: 600; color: var(--white); font-size: 0.85rem; }
    .ess-chat-role { font-size: 0.7rem; color: rgba(255,255,255,0.25); }
    .ess-chat-live {
      margin-left: auto; display: flex; align-items: center; gap: 0.4rem;
      font-size: 0.66rem; color: rgba(255,255,255,0.25);
      font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
    }
    .ess-chat-live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--teal); }
    .ess-chat-body {
      padding: 1.5rem; min-height: 280px;
      display: flex; flex-direction: column; gap: 0.8rem;
      overflow-y: auto; max-height: 340px;
    }
    .ess-m { display: flex; }
    .ess-m-bot { justify-content: flex-start; }
    .ess-m-user { justify-content: flex-end; }
    .ess-m-b {
      max-width: 80%; padding: 0.7rem 1.05rem;
      border-radius: 14px; font-size: 0.88rem; line-height: 1.55;
    }
    .ess-m-bot .ess-m-b {
      background: var(--cloud); color: var(--black);
      border-radius: 4px 14px 14px 14px;
    }
    .ess-m-user .ess-m-b {
      background: var(--teal); color: var(--black);
      border-radius: 14px 4px 14px 14px;
      font-weight: 500;
    }
    .ess-m-typing {
      display: flex; gap: 5px; align-items: center; padding: 0.8rem 1.05rem;
    }
    .ess-m-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--mist);
      animation: ess-typing 1.2s ease-in-out infinite;
    }
    .ess-m-dot:nth-child(2) { animation-delay: 0.2s; }
    .ess-m-dot:nth-child(3) { animation-delay: 0.4s; }
    .ess-chat-bar {
      padding: 0.9rem 1.25rem; border-top: 1px solid rgba(0,0,0,0.06);
      display: flex; gap: 0.65rem; align-items: center;
    }
    .ess-chat-in {
      flex: 1; border: 1.5px solid rgba(0,0,0,0.08);
      border-radius: 10px; padding: 0.6rem 1rem;
      font-family: 'General Sans', sans-serif;
      font-size: 0.86rem; outline: none;
      transition: border-color 0.2s; background: var(--sheet);
    }
    .ess-chat-in:focus { border-color: var(--teal); background: var(--white); }
    .ess-chat-go {
      width: 36px; height: 36px; border-radius: 10px;
      background: var(--teal); border: none;
      cursor: pointer; display: flex;
      align-items: center; justify-content: center;
      transition: all 0.2s; color: var(--black); font-size: 0.9rem;
    }
    .ess-chat-go:hover { background: var(--teal-dark); }

    /* ── CONTACT ── */
    .ess-contact {
      padding: 6.5rem 5%;
      background: var(--cloud);
    }
    .ess-contact-grid {
      max-width: 1100px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1.1fr;
      gap: 5rem;
    }
    .ess-ci {
      display: flex; align-items: center; gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid var(--ice);
    }
    .ess-ci:last-child { border-bottom: none; }
    .ess-ci-icon {
      width: 40px; height: 40px; border-radius: 10px;
      background: var(--white);
      border: 1px solid var(--ice);
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem; flex-shrink: 0;
    }
    .ess-ci-label {
      font-size: 0.66rem; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--smoke); margin-bottom: 0.1rem;
    }
    .ess-ci-val {
      font-weight: 500; font-size: 0.9rem; color: var(--black);
    }
    .ess-form { display: flex; flex-direction: column; gap: 0.85rem; }
    .ess-field {
      width: 100%; padding: 0.85rem 1.15rem;
      border: 1.5px solid rgba(0,0,0,0.08);
      border-radius: 10px;
      font-family: 'General Sans', sans-serif;
      font-size: 0.9rem; color: var(--black);
      outline: none; transition: all 0.2s;
      background: var(--white);
    }
    .ess-field:focus {
      border-color: var(--teal);
      box-shadow: 0 0 0 3px var(--teal-glow);
    }
    .ess-field::placeholder { color: var(--mist); }
    textarea.ess-field { resize: vertical; min-height: 115px; }
    .ess-form-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; }
    .ess-send {
      padding: 0.9rem 2rem; background: var(--teal); color: var(--black);
      border: none; border-radius: 10px; cursor: pointer;
      font-family: 'General Sans', sans-serif; font-weight: 700;
      font-size: 0.95rem; transition: all 0.25s;
      display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    }
    .ess-send:hover {
      background: var(--teal-dark); transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(45,212,191,0.2);
    }
    .ess-ok { text-align: center; padding: 3rem 2rem; }
    .ess-ok-icon {
      width: 56px; height: 56px; border-radius: 50%;
      background: var(--teal-glow);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.4rem; margin: 0 auto 1.25rem; color: var(--teal-dark);
    }

    /* ── FOOTER ── */
    .ess-foot {
      background: var(--black); padding: 2rem 5%;
      display: flex; align-items: center; justify-content: space-between;
    }
    .ess-foot-brand {
      font-family: 'Manrope', sans-serif;
      font-weight: 800; color: var(--white);
      font-size: 0.95rem; letter-spacing: -0.03em;
    }
    .ess-foot-copy { color: rgba(255,255,255,0.2); font-size: 0.74rem; }
    .ess-foot-heart { color: var(--teal); }

    /* ── RESPONSIVE ── */
    @media (max-width: 1024px) {
      .ess-hero-inner { grid-template-columns: 1fr; text-align: center; }
      .ess-hero-p { margin-left: auto; margin-right: auto; }
      .ess-hero-ctas { justify-content: center; }
      .ess-hero-vis { display: none; }
    }
    @media (max-width: 900px) {
      .ess-services { grid-template-columns: 1fr; }
      .ess-demo-grid { grid-template-columns: 1fr; gap: 3rem; }
      .ess-contact-grid { grid-template-columns: 1fr; gap: 3rem; }
      .ess-trust { gap: 1.5rem; }
    }
    @media (max-width: 768px) {
      .ess-nav { padding: 1rem 1.5rem; }
      .ess-nav-links { display: none; }
      .ess-hero { padding: 0 1.5rem; }
      .ess-section { padding: 4.5rem 1.5rem; }
      .ess-demo-section { padding: 4.5rem 1.5rem; }
      .ess-contact { padding: 4.5rem 1.5rem; }
      .ess-trust { padding: 2rem 1.5rem; }
      .ess-form-2col { grid-template-columns: 1fr; }
      .ess-foot { flex-direction: column; gap: 0.7rem; text-align: center; padding: 1.75rem 1.5rem; }
    }
  `;
  document.head.appendChild(s);
};

const DEMO_SCRIPT = [
  { role: "bot", text: "Hey there! 👋 Welcome to Mike's Electric. Need a quote or have a question about our services?" },
  { role: "user", text: "Do you do panel upgrades?" },
  { role: "bot", text: "Absolutely — we handle 100A to 200A panel upgrades, sub-panel installs, and full rewires across the Denver metro. Want me to set up a free estimate?" },
  { role: "user", text: "Yeah that'd be great" },
  { role: "bot", text: "Perfect — just need your name, address, and best time to reach you. Our team will follow up within the hour. ⚡" },
];

const SERVICES = [
  {
    icon: "🌐", title: "A Website That Works",
    body: "Your customers Google you before they call. We build fast, clean sites that show up in search results and make your phone ring.",
    price: "Starting at $500",
  },
  {
    icon: "💬", title: "Automated Chat Assistant",
    body: "A smart assistant on your site that answers common questions, captures contact info, and books estimates — even at midnight.",
    price: "Starting at $300",
  },
  {
    icon: "🔧", title: "We Maintain Everything",
    body: "Hosting, updates, fixes — handled. You'll never get a call about your site being down. Just focus on your work, we've got the rest.",
    price: "From $100/mo",
  },
];

export default function LandingPage() {
  injectFont();
  injectStyles();

  const [scrolled, setScrolled] = useState(false);
  const [demoMessages, setDemoMessages] = useState([DEMO_SCRIPT[0]]);
  const [demoInput, setDemoInput] = useState("");
  const [demoStep, setDemoStep] = useState(1);
  const [demoTyping, setDemoTyping] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const msgEnd = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [demoMessages, demoTyping]);

  const advanceDemo = (txt) => {
    if (demoStep >= DEMO_SCRIPT.length) return;
    setDemoMessages((p) => [...p, { role: "user", text: txt }]);
    setDemoInput("");
    setDemoTyping(true);
    setTimeout(() => {
      setDemoTyping(false);
      setDemoMessages((p) => [...p, DEMO_SCRIPT[demoStep]]);
      setDemoStep((s) => s + 1);
    }, 1200);
  };

  const sendDemo = () => {
    const t = demoInput.trim() || DEMO_SCRIPT[demoStep - 1]?.text || "Tell me more";
    advanceDemo(t);
  };

  const onKey = (e) => { if (e.key === "Enter") sendDemo(); };
  const onForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submitForm = () => setSubmitted(true);

  return (
    <div className="ess">
      <nav className={`ess-nav ${scrolled ? "stuck" : ""}`}>
        <a href="#" className="ess-logo">Elevated Software</a>
        <div className="ess-nav-links">
          <a href="#services" className="ess-nav-link">Services</a>
          <a href="#demo" className="ess-nav-link">See It Work</a>
          <a href="#contact" className="ess-nav-link">Contact</a>
          <a href="#contact" className="ess-nav-btn">Free Quote</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="ess-hero">
        <div className="ess-hero-bg" />
        <div className="ess-hero-texture" />
        <div className="ess-hero-inner">
          <div>
            <div className="ess-badge ess-a">
              <span className="ess-badge-dot" />
              <span className="ess-badge-text">Built for Trades & Service Businesses</span>
            </div>
            <h1 className="ess-h1 ess-a ess-a1">
              Stop missing calls.<br />
              Start <span className="ess-h1-pop">booking jobs.</span>
            </h1>
            <p className="ess-hero-p ess-a ess-a2">
              <strong>Your website should work as hard as you do.</strong> We build
              sites that show up on Google and smart tools that answer
              customer questions, capture leads, and book estimates —
              even when you're on a job.
            </p>
            <div className="ess-hero-ctas ess-a ess-a3">
              <a href="#demo" className="ess-btn ess-btn-teal">See How It Works →</a>
              <a href="#contact" className="ess-btn ess-btn-ghost">Free Site Review</a>
            </div>
          </div>

          <div className="ess-hero-vis ess-a ess-a4">
            <div className="ess-vis-card">
              <div className="ess-vis-float ess-vf1">+47% more leads</div>
              <div className="ess-vis-header">
                <div className="ess-vis-avi">⚡</div>
                <div>
                  <div className="ess-vis-name">Mike's Electric LLC</div>
                  <div className="ess-vis-type">Electrician · Denver, CO</div>
                </div>
              </div>
              <div className="ess-vis-chat-preview">
                <div className="ess-vis-chat-msg ess-vis-chat-bot">
                  "Need a panel upgrade quote? I can help with that!"
                </div>
                <div className="ess-vis-chat-msg ess-vis-chat-cust">
                  "Yes — 200A upgrade please"
                </div>
                <div className="ess-vis-chat-msg ess-vis-chat-bot">
                  "Got it. Let me grab your info..."
                </div>
              </div>
              <div className="ess-vis-stats">
                <div className="ess-vis-mini-stat">
                  <div className="ess-vis-mini-num">142</div>
                  <div className="ess-vis-mini-lbl">Chats</div>
                </div>
                <div className="ess-vis-mini-stat">
                  <div className="ess-vis-mini-num">38<span>%</span></div>
                  <div className="ess-vis-mini-lbl">Booked</div>
                </div>
                <div className="ess-vis-mini-stat">
                  <div className="ess-vis-mini-num">24<span>/7</span></div>
                  <div className="ess-vis-mini-lbl">Active</div>
                </div>
              </div>
              <div className="ess-vis-float ess-vf2">📩 New lead captured</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="ess-trust">
        <div className="ess-trust-item">
          <div className="ess-trust-icon">📋</div>
          Clear pricing, no surprises
        </div>
        <div className="ess-trust-item">
          <div className="ess-trust-icon">💬</div>
          Plain English, no tech jargon
        </div>
        <div className="ess-trust-item">
          <div className="ess-trust-icon">📞</div>
          Real person picks up the phone
        </div>
        <div className="ess-trust-item">
          <div className="ess-trust-icon">✅</div>
          Free site review, no obligation
        </div>
      </div>

      {/* MARQUEE */}
      <div className="ess-marquee">
        <div className="ess-marquee-track">
          {[...Array(8)].map((_, i) => (
            <span key={i}>
              <span className="ess-marquee-item">Smart Chat Tools <span className="ess-marquee-dot" /></span>
              <span className="ess-marquee-item">Modern Websites <span className="ess-marquee-dot" /></span>
              <span className="ess-marquee-item">Lead Capture <span className="ess-marquee-dot" /></span>
              <span className="ess-marquee-item">Electricians <span className="ess-marquee-dot" /></span>
              <span className="ess-marquee-item">Plumbers <span className="ess-marquee-dot" /></span>
              <span className="ess-marquee-item">Contractors <span className="ess-marquee-dot" /></span>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section className="ess-section" id="services">
        <div className="ess-section-inner">
          <div className="ess-tag"><span className="ess-tag-line" /> What We Do</div>
          <h2 className="ess-h2">Simple tools that<br /><span className="hl">get you more work.</span></h2>
     <p className="ess-desc" style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
  No complicated software. No learning curve.
  We set it up, you get more customers. That's the deal.
</p>
          <div className="ess-services">
            {SERVICES.map((s) => (
              <div className="ess-card" key={s.title}>
                <div className="ess-card-icon">{s.icon}</div>
                <div className="ess-card-title">{s.title}</div>
                <p className="ess-card-body">{s.body}</p>
                <span className="ess-card-price">{s.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section className="ess-demo-section" id="demo">
        <div className="ess-demo-grid">
          <div>
            <div className="ess-tag"><span className="ess-tag-line" /> See It Work</div>
            <h2 className="ess-h2">This is what your<br />customers <span className="hl">would see.</span></h2>
            <p className="ess-desc" style={{ marginBottom: "1.5rem" }}>
              A smart assistant sits right on your website. When a customer visits,
              it answers their questions, grabs their info, and sends it straight
              to you. No app to download. Nothing for you to manage.
            </p>
            <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.25)", lineHeight: 1.7 }}>
              Try it out below — this is an electrician demo. Type anything or click send.
            </p>
          </div>

          <div className="ess-chat">
            <div className="ess-chat-top">
              <div className="ess-chat-avi">⚡</div>
              <div>
                <div className="ess-chat-who">Mike's Electric</div>
                <div className="ess-chat-role">Online Assistant</div>
              </div>
              <div className="ess-chat-live"><span className="ess-chat-live-dot" /> Online</div>
            </div>
            <div className="ess-chat-body">
              {demoMessages.map((msg, i) => (
                <div key={i} className={`ess-m ess-m-${msg.role}`}>
                  <div className="ess-m-b">{msg.text}</div>
                </div>
              ))}
              {demoTyping && (
                <div className="ess-m ess-m-bot">
                  <div className="ess-m-b ess-m-typing">
                    <div className="ess-m-dot" /><div className="ess-m-dot" /><div className="ess-m-dot" />
                  </div>
                </div>
              )}
              <div ref={msgEnd} />
            </div>
            <div className="ess-chat-bar">
              <input
                className="ess-chat-in"
                placeholder={demoStep < DEMO_SCRIPT.length ? `Try: "${DEMO_SCRIPT[demoStep - 1]?.text}"` : "That's the full demo!"}
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
                onKeyDown={onKey}
                disabled={demoStep >= DEMO_SCRIPT.length}
              />
              <button className="ess-chat-go" onClick={sendDemo} disabled={demoStep >= DEMO_SCRIPT.length}>➤</button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="ess-contact" id="contact">
        <div className="ess-contact-grid">
          <div>
            <div className="ess-tag"><span className="ess-tag-line" /> Get In Touch</div>
            <h2 className="ess-h2">Let's get your<br />business <span className="hl">found online.</span></h2>
            <p className="ess-desc" style={{ marginBottom: "1.5rem" }}>
              Tell me what you do. I'll take a look at your online presence for
              free and show you exactly where you're leaving money on the table.
              No pressure, no tech talk.
            </p>
            <div>
              <div className="ess-ci">
                <div className="ess-ci-icon">📍</div>
                <div><div className="ess-ci-label">Based In</div><div className="ess-ci-val">Denver, CO — working with businesses nationwide</div></div>
              </div>
              <div className="ess-ci">
                <div className="ess-ci-icon">📞</div>
                <div><div className="ess-ci-label">Response Time</div><div className="ess-ci-val">Within 24 hours, guaranteed</div></div>
              </div>
              <div className="ess-ci">
                <div className="ess-ci-icon">🎯</div>
                <div><div className="ess-ci-label">Free Offer</div><div className="ess-ci-val">Free website review — see what you're missing</div></div>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="ess-ok">
                <div className="ess-ok-icon">✓</div>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "1.35rem", marginBottom: "0.6rem" }}>Got it — I'll be in touch.</h3>
                <p style={{ color: "var(--smoke)", lineHeight: 1.7, fontSize: "0.9rem" }}>I'll review your info and reach out within 24 hours with a free site review and a clear plan.</p>
              </div>
            ) : (
              <div className="ess-form" role="form">
                <div className="ess-form-2col">
                  <input className="ess-field" name="name" placeholder="Your name" value={form.name} onChange={onForm} />
                  <input className="ess-field" name="email" type="email" placeholder="Best email" value={form.email} onChange={onForm} />
                </div>
                <input className="ess-field" name="business" placeholder="Business name & what you do (e.g. Mike's Electric — Electrician)" value={form.business} onChange={onForm} />
                <textarea className="ess-field" name="message" placeholder="What do you need help with? (new website, online booking, not sure yet — all good)" value={form.message} onChange={onForm} />
                <button className="ess-send" type="button" onClick={submitForm}>Send Message →</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="ess-foot">
        <div className="ess-foot-brand">Elevated Software Solutions</div>
        <div className="ess-foot-copy">© 2026 · Built with <span className="ess-foot-heart">♥</span> in Denver, CO</div>
      </footer>
    </div>
  );
}
