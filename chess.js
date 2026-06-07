// ============================================================
// 国际象棋 — 完整引擎 + AI + UI + 音效 + 特效 + 闯关
// ============================================================

// ==================== SVG 棋子定义 ====================
const PIECE_SVGS = {};
PIECE_SVGS['wk'] = `<svg viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6M20 8h5" stroke-linejoin="miter"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#fff" stroke-linecap="butt" stroke-linejoin="miter"/><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7" fill="#fff"/><path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0"/></g></svg>`;
PIECE_SVGS['wq'] = `<svg viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zm16.5-4.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zm16.5 4.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0z" fill="#fff"/><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15L14 11v14l-7-11" stroke-linejoin="miter" fill="#fff"/><path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1 2.5-1 2.5-1.5 1.5 0 2.5 0 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" fill="#fff" stroke-linecap="butt"/><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6 1.5 15 1.5 21 0"/></g></svg>`;
PIECE_SVGS['wr'] = `<svg viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zm3-3v-4h21v4H12zm3.5-7V12h-3l2-8h16l2 8h-3v17H15.5zM12 4h6m2 0h5m2 0h6" stroke-linejoin="miter" fill="#fff"/><path d="M9 39h27" fill="#fff"/></g></svg>`;
PIECE_SVGS['wb'] = `<svg viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><g fill="#fff" stroke-linecap="butt"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 0z"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/><path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/></g><path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5"/></g></svg>`;
PIECE_SVGS['wn'] = `<svg viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#fff"/><path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3" fill="#fff"/><path d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0zm5.433-9.75a.5 1.5 30 1 1-.866-.5.5 1.5 30 1 1 .866.5z" fill="#000"/></g></svg>`;
PIECE_SVGS['wp'] = `<svg viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#fff" stroke-linecap="butt"/></g></svg>`;
PIECE_SVGS['bk'] = `<svg viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6" stroke-linejoin="miter"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#000" stroke-linecap="butt" stroke-linejoin="miter"/><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7" fill="#000"/><path d="M20 8h5" stroke-linejoin="miter"/><path d="M32 29.5s8.5-4 6.03-9.65C34.15 14 25 18 22.5 24.5l.01 2.1-.01-2.1C20 18 10.856 14 6.97 19.85 4.5 25.5 13 29.5 13 29.5" fill="#000"/><path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0" fill="none"/></g></svg>`;
PIECE_SVGS['bq'] = `<svg viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><g fill="#000"><circle cx="6" cy="12" r="2.75"/><circle cx="14" cy="9" r="2.75"/><circle cx="22.5" cy="8" r="2.75"/><circle cx="31" cy="9" r="2.75"/><circle cx="39" cy="12" r="2.75"/></g><path d="M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-.3-14.1-5.2 13.6-3-14.5-3 14.5-5.2-13.6L14 25 6.5 13.5" stroke-linejoin="miter" fill="#000"/><path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1 2.5-1 2.5-1.5 1.5 0 2.5 0 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" fill="#000" stroke-linecap="butt"/><path d="M11 38.5a35 35 1 0 0 23 0" fill="none" stroke-linecap="butt"/><path d="M11 29a35 35 1 0 1 23 0m-21.5 2.5h20m-21 3a35 35 1 0 0 22 0m-23 3a35 35 1 0 0 24 0" fill="none"/></g></svg>`;
PIECE_SVGS['br'] = `<svg viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zm3.5-7V12h-3l2-8h16l2 8h-3v20H12.5z" stroke-linejoin="miter" fill="#000"/><path d="M20 4h5" fill="none"/><path d="M9 39h27" fill="none"/></g></svg>`;
PIECE_SVGS['bb'] = `<svg viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><g fill="#000" stroke-linecap="butt"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 0z"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"/><path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z"/></g><path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" fill="none"/></g></svg>`;
PIECE_SVGS['bn'] = `<svg viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#000"/><path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3" fill="#000"/><path d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0zm5.433-9.75a.5 1.5 30 1 1-.866-.5.5 1.5 30 1 1 .866.5z" fill="#fff" stroke="none"/></g></svg>`;
PIECE_SVGS['bp'] = `<svg viewBox="0 0 45 45"><g fill="none" fill-rule="evenodd" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#000" stroke-linecap="butt"/></g></svg>`;

// ==================== 音效系统 ====================
let audioCtx = null; let soundEnabled = true;
function getAudioCtx() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); return audioCtx; }
function playTone(freq, duration, type, vol, rampDown) {
  if (!soundEnabled) return;
  try { const ctx = getAudioCtx(); const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.type = type || 'sine'; osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(vol || 0.15, ctx.currentTime);
    if (rampDown) gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + duration);
  } catch(e) {} }
function playMoveSound() { playTone(600, 0.08, 'sine', 0.1, true); }
function playCaptureSound() { playTone(200, 0.15, 'triangle', 0.15, true); playTone(150, 0.15, 'sawtooth', 0.08, true); }
function playCheckSound() { playTone(800, 0.1, 'square', 0.12); setTimeout(() => playTone(1000, 0.15, 'square', 0.12, true), 100); }
function playCastleSound() { playTone(400, 0.06, 'sine', 0.1, true); setTimeout(() => playTone(600, 0.08, 'sine', 0.1, true), 60); }
function playPromoteSound() { playTone(523, 0.08, 'sine', 0.1, true); setTimeout(() => playTone(659, 0.08, 'sine', 0.1, true), 80); setTimeout(() => playTone(784, 0.12, 'sine', 0.12, true), 160); }
function playVictorySound() { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => playTone(f, 0.2, 'sine', 0.15, true), i * 150)); }
function playDrawSound() { playTone(300, 0.3, 'sine', 0.1, true); playTone(250, 0.3, 'sine', 0.1, true); }
function playSuccessSound() { playTone(660, 0.1, 'sine', 0.12, true); setTimeout(() => playTone(880, 0.15, 'sine', 0.15, true), 100); }
function playFailSound() { playTone(200, 0.2, 'sawtooth', 0.1, true); playTone(150, 0.3, 'sine', 0.08, true); }
function toggleSound() { soundEnabled = !soundEnabled; document.getElementById('btn-sound').textContent = soundEnabled ? '\u{1F50A}' : '\u{1F507}'; document.getElementById('btn-sound').classList.toggle('muted', !soundEnabled); }


// ==================== 闯关题库 ====================
const PUZZLES = [
  { id: 1, title: "\u7B2C\u4E00\u6B65\u6740", difficulty: "easy", fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 4", playerColor: 'w', desc: "\u767D\u5148\uFF0C\u4E00\u6B65\u5C06\u6740\u9ED1\u65B9", solution: ["h5f7"], hint: "\u7687\u540E\u914D\u5408\u4E3B\u6559\uFF0C\u5BFB\u627E\u5C06\u519B\u7684\u673A\u4F1A" },
  { id: 2, title: "\u5E95\u7EBF\u6740\u738B", difficulty: "easy", fen: "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1", playerColor: 'w', desc: "\u767D\u5148\uFF0C\u4E00\u6B65\u5C06\u6740", solution: ["e1e8"], hint: "\u9ED1\u738B\u7684\u9000\u8DEF\u88AB\u81EA\u5DF1\u7684\u5175\u6321\u4F4F\u4E86" },
  { id: 3, title: "\u540E\u8F66\u8FDE\u7EBF", difficulty: "easy", fen: "6k1/5p2/6p1/8/8/8/8/4KQ2 w - - 0 1", playerColor: 'w', desc: "\u767D\u5148\uFF0C\u627E\u5230\u4E00\u6B65\u5C06\u6740", solution: ["f1f7"], hint: "\u540E\u653B\u51FB\u7B2C\u4E03\u6A2A\u7EBF\uFF0C\u6CE8\u610F\u9ED1\u738B\u7684\u9003\u8DD1\u65B9\u5411" },
  { id: 4, title: "\u9A6C\u8E0F\u53CC\u8F66", difficulty: "medium", fen: "r2qkb1r/ppp2ppp/2n5/4p3/2B1n3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 6", playerColor: 'w', desc: "\u767D\u5148\uFF0C\u9A6C\u8E0F\u53CC\uFF08\u53CC\u91CD\u653B\u51FB\uFF09\uFF0C\u4E00\u6B65\u5F97\u540E", solution: ["f3e5"], hint: "\u9A6C\u8DF3\u5230\u4E2D\u5FC3\uFF0C\u540C\u65F6\u653B\u51FB\u540E\u548C\u8F66" },
  { id: 5, title: "\u7275\u5236\u5F97\u5B50", difficulty: "medium", fen: "r1b1kb1r/ppp2ppp/2n5/4p3/2B1q3/3P1N2/PPP2PPP/RNBQ1RK1 w kq - 0 6", playerColor: 'w', desc: "\u767D\u5148\uFF0C\u8F66\u7275\u5236\u540E\uFF0C\u4E00\u6B65\u5F97\u540E", solution: ["f1e1"], hint: "\u8F66\u79FB\u52A8\u5230\u548C\u540E\u540C\u4E00\u6761\u7EBF\u4E0A\uFF0C\u540E\u65E0\u6CD5\u9003\u8131" },
  { id: 6, title: "\u540E\u8F66\u6740\u738B\u2161", difficulty: "medium", fen: "r1b2rk1/ppp2ppp/2n2n2/3qp3/2B1P1N1/8/PPPP1PPP/RNBQK2R w KQ - 0 7", playerColor: "w", desc: "\u767D\u5148\uFF0C\u4E00\u6B65\u6740", solution: ["d1h5"], hint: "\u540E\u653B\u51FBh5\uFF0C\u914D\u5408\u9A6C\u548C\u4E3B\u6559\u7684\u591A\u91CD\u5A01\u80C1" },
  { id: 7, title: "\u8F66\u540E\u6740\u738B", difficulty: "medium", fen: "r3k2r/ppp2ppp/2n5/3qp3/2B1P3/2PP4/PP3PPP/R2Q1RK1 w kq - 0 8", playerColor: "w", desc: "\u767D\u5148\uFF0C\u4E00\u6B65\u5C06\u6740\uFF08\u9ED1\u65B9\u672A\u6613\u4F4D\uFF09", solution: ["a1a8"], hint: "\u8F66\u653B\u51FB\u5E95\u7EBF\uFF0C\u9ED1\u738B\u65E0\u6CD5\u9003\u8131" },
  { id: 8, title: "\u540E\u8F66\u6740\u738B\u2162", difficulty: "medium", fen: "r2q1rk1/ppp2ppp/2n5/3Qp3/2B1n3/3P1N2/PPP2PPP/RNB1K2R w KQ - 0 8", playerColor: "w", desc: "\u767D\u5148\uFF0C\u4E00\u6B65\u5C06\u6740", solution: ["d5f7"], hint: "\u540E\u548C\u4E3B\u6559\u914D\u5408\uFF0C\u653B\u51FBf7\u683C" },
  { id: 9, title: "\u727A\u540E\u5F15\u79BB", difficulty: "hard", fen: "r1b2rk1/ppp1qppp/2n5/3p4/2B1n3/3P1N2/PPP2PPP/R1BQ1RK1 w - - 0 9", playerColor: "w", desc: "\u767D\u5148\uFF0C\u727A\u7272\u540E\u5F15\u79BB\u9ED1\u540E\uFF0C\u4E09\u6B65\u5B8C\u6210", solution: ["f3g5", "e7g5", "d1h5", "g5h6", "f1f3", "h6h5", "f3h3"], hint: "\u9A6C\u8DF3g5\u8BF1\u4F7F\u9ED1\u540E\u79BB\u5F00\u5B88\u536B\u4F4D\u7F6E\uFF0C\u518D\u7528\u8F66\u653B\u738B" },
  { id: 10, title: "\u53D8\u9B54\u672F\u6740\u738B", difficulty: "hard", fen: "r1bq1rk1/ppp2ppp/2n2n2/3Qp1N1/2B1P3/8/PPPP1PPP/RNB1K2R w KQ - 0 7", playerColor: "w", desc: "\u767D\u5148\uFF0C\u4E09\u6B65\u5C06\u6740", solution: ["g5f7", "f8f7", "d5f7", "g8h8", "f7h7"], hint: "\u9A6C\u8FDB\u5165f7\u53CC\u5C06\uFF0C\u8DDF\u8FDB\u540E\u6740\u738B" },
  { id: 11, title: "\u53CC\u9A6C\u6349\u53CC", difficulty: "hard", fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR b KQkq - 0 4", playerColor: "b", desc: "\u9ED1\u5148\uFF0C\u9A6C\u8E0F\u53CC\uFF08\u540C\u65F6\u653B\u51FB\u540E\u548C\u738B\uFF09\uFF0C\u4E00\u6B65\u5F97\u540E", solution: ["f6e4"], hint: "\u9A6C\u8DF3\u5230e4\uFF0C\u540C\u65F6\u653B\u51FB\u767D\u540E\u548C\u767D\u738B" },
  { id: 12, title: "\u53CC\u91CD\u5C06\u519B\u6740\u738B", difficulty: "hard", fen: "r1bq1rk1/ppp2ppp/2n2n2/3Qp1N1/2B1P3/8/PPPP1PPP/RNB1K2R w KQ - 0 7", playerColor: 'w', desc: "\u767D\u5148\uFF0C\u4E09\u6B65\u5185\u5C06\u6740\u9ED1\u65B9", solution: ["g5f7", "f8f7", "d5f7", "g8h8", "f7h7"], hint: "\u9A6C\u8FDB\u5165f7\u53CC\u5C06\uFF0C\u8F6C\u6362\u540E\u540E\u8DDF\u8FDB\u6740\u738B" },
  { id: 13, title: "\u5F00\u653E\u7EBF\u6A21\u5F0F", difficulty: "easy", fen: "r2qk2r/ppp2ppp/2n5/3Qp3/2B1n3/3P1N2/PPP2PPP/RNB1K2R w KQkq - 0 8", playerColor: 'w', desc: "\u767D\u5148\uFF0C\u4E00\u6B65\u5C06\u6740", solution: ["d5f7"], hint: "\u540E\u548C\u4E3B\u6559\u914D\u5408\uFF0C\u653B\u51FBf7\u683C" },
  { id: 14, title: "\u5E95\u7EBF\u6740\u738B\u2161", difficulty: "easy", fen: "4r1k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1", playerColor: "w", desc: "\u767D\u5148\uFF0C\u4E00\u6B65\u5C06\u6740", solution: ["e1e8"], hint: "\u8F66\u653B\u51FB\u5E95\u7EBF\uFF0C\u9ED1\u738B\u65E0\u6CD5\u9003\u8131" },
  { id: 15, title: "\u5F00\u653E\u7EBF\u6740\u738B", difficulty: "hard", fen: "r1bq1rk1/ppp2ppp/2n2n2/3Qp1N1/2B1P3/8/PPPP1PPP/RNB1K2R w KQ - 0 7", playerColor: "w", desc: "\u767D\u5148\uFF0C\u4E09\u6B65\u5185\u5C06\u6740\u9ED1\u65B9", solution: ["g5f7", "f8f7", "d5f7", "g8h8", "f7h7"], hint: "\u9A6C\u8FDB\u5165f7\u53CC\u5C06\uFF0C\u8F6C\u6362\u540E\u540E\u8DDF\u8FDB\u6740\u738B" },
];

// ==================== 常量 ====================
const WHITE = 'w', BLACK = 'b';
const PAWN = 'p', KNIGHT = 'n', BISHOP = 'b', ROOK = 'r', QUEEN = 'q', KING = 'k';
const PIECE_VALUES = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 };
const PST = {
  p: [0,0,0,0,0,0,0,0, 50,50,50,50,50,50,50,50, 10,10,20,30,30,20,10,10, 5,5,10,25,25,10,5,5, 0,0,0,20,20,0,0,0, 5,-5,-10,0,0,-10,-5,5, 5,10,10,-20,-20,10,10,5, 0,0,0,0,0,0,0,0],
  n: [-50,-40,-30,-30,-30,-30,-40,-50, -40,-20,0,0,0,0,-20,-40, -30,0,10,15,15,10,0,-30, -30,5,15,20,20,15,5,-30, -30,0,15,20,20,15,0,-30, -30,5,10,15,15,10,5,-30, -40,-20,0,5,5,0,-20,-40, -50,-40,-30,-30,-30,-30,-40,-50],
  b: [-20,-10,-10,-10,-10,-10,-10,-20, -10,0,0,0,0,0,0,-10, -10,0,10,10,10,10,0,-10, -10,5,5,10,10,5,5,-10, -10,0,5,10,10,5,0,-10, -10,10,5,10,10,5,10,-10, -10,5,0,0,0,0,5,-10, -20,-10,-10,-10,-10,-10,-10,-20],
  r: [0,0,0,0,0,0,0,0, 5,10,10,10,10,10,10,5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, 0,0,0,5,5,0,0,0],
  q: [-20,-10,-10,-5,-5,-10,-10,-20, -10,0,0,0,0,0,0,-10, -10,0,5,5,5,5,0,-10, -5,0,5,5,5,5,0,-5, 0,0,5,5,5,5,0,-5, -10,5,5,5,5,5,0,-10, -10,0,5,0,0,0,0,-10, -20,-10,-10,-5,-5,-10,-10,-20],
  k: [-30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30, -20,-30,-30,-40,-40,-30,-30,-20, -10,-20,-20,-20,-20,-20,-20,-10, 20,20,0,0,0,0,20,20, 20,30,10,0,0,10,30,20]
};

const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';


// ==================== 游戏状态 ====================
let gameState = null;
let selectedSquare = null;
let legalMovesForSelected = [];
let lastMoveFrom = null;
let lastMoveTo = null;
let mode = 'pvp';
let playerColor = 'w';
let aiThinking = false;
let promotionMove = null;
let difficulty = 'normal';
let animating = false;

// 闯关状态
let puzzleIndex = 0;        // 当前关卡索引 (0-based)
let puzzleStep = 0;         // 当前已完成的步数
let puzzleSolved = false;   // 是否已解出
let completedPuzzles = {};  // { id: true } 已完成关卡

// 闯关进度存储
try { completedPuzzles = JSON.parse(localStorage.getItem('chess_puzzles') || '{}'); } catch(e) { completedPuzzles = {}; }

// ==================== FEN 解析 ====================
function parseFEN(fen) {
  const parts = fen.split(' ');
  const board = Array.from({ length: 8 }, () => Array(8).fill(null));
  const rows = parts[0].split('/');
  for (let r = 0; r < 8; r++) {
    let c = 0;
    for (const ch of rows[r]) {
      if (ch >= '1' && ch <= '8') { c += parseInt(ch); }
      else { board[r][c] = { type: ch.toLowerCase(), color: ch === ch.toUpperCase() ? WHITE : BLACK }; c++; }
    }
  }
  return {
    board, currentPlayer: parts[1] === 'w' ? WHITE : BLACK,
    castlingRights: { wK: parts[2].includes('K'), wQ: parts[2].includes('Q'), bK: parts[2].includes('k'), bQ: parts[2].includes('q') },
    enPassantTarget: parts[3] === '-' ? null : squareToRC(parts[3]),
    halfMoveClock: parseInt(parts[4]), fullMoveNumber: parseInt(parts[5]), moveHistory: []
  };
}

function squareToRC(sq) { return { row: 8 - parseInt(sq[1]), col: sq.charCodeAt(0) - 97 }; }
function rcToSquare(r, c) { return String.fromCharCode(97 + c) + (8 - r); }
function inBounds(r, c) { return r >= 0 && r < 8 && c >= 0 && c < 8; }
function cloneState(state) {
  return {
    board: state.board.map(row => row.map(cell => cell ? { ...cell } : null)),
    currentPlayer: state.currentPlayer, castlingRights: { ...state.castlingRights },
    enPassantTarget: state.enPassantTarget ? { ...state.enPassantTarget } : null,
    halfMoveClock: state.halfMoveClock, fullMoveNumber: state.fullMoveNumber, moveHistory: [...state.moveHistory]
  };
}

// ==================== 攻击/将军检测 ====================
function isSquareAttacked(state, r, c, byColor) {
  const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  for (let i = 0; i < 8; i++) {
    let rr = r + dirs[i][0], cc = c + dirs[i][1];
    while (inBounds(rr, cc)) {
      const p = state.board[rr][cc];
      if (p) {
        if (p.color === byColor) {
          const isDiag = dirs[i][0] !== 0 && dirs[i][1] !== 0, isOrth = !isDiag;
          if (p.type === QUEEN) return true;
          if (isDiag && p.type === BISHOP) return true;
          if (isOrth && p.type === ROOK) return true;
          if (Math.abs(rr - r) <= 1 && Math.abs(cc - c) <= 1 && p.type === KING) return true;
          if (isDiag && p.type === PAWN) { if (rr === r + (p.color === WHITE ? 1 : -1)) return true; }
        }
        break;
      }
      rr += dirs[i][0]; cc += dirs[i][1];
    }
  }
  for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
    const tr = r + dr, tc = c + dc;
    if (inBounds(tr, tc)) { const p = state.board[tr][tc]; if (p && p.color === byColor && p.type === KNIGHT) return true; }
  }
  return false;
}

function findKing(state, color) {
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++)
    if (state.board[r][c]?.type === KING && state.board[r][c]?.color === color) return { row: r, col: c };
  return null;
}

function isInCheck(state, color) {
  const king = findKing(state, color);
  return king && isSquareAttacked(state, king.row, king.col, color === WHITE ? BLACK : WHITE);
}


// ==================== 伪合法走法生成 ====================
function getPseudoLegalMoves(state, r, c) {
  const piece = state.board[r][c]; if (!piece) return [];
  const moves = [], color = piece.color, opponent = color === WHITE ? BLACK : WHITE;
  function addMove(tr, tc, pt) {
    if (!inBounds(tr, tc)) return false;
    const t = state.board[tr][tc]; if (t && t.color === color) return false;
    moves.push({ fromR: r, fromC: c, toR: tr, toC: tc, promotion: pt || null, capture: !!t }); return !t;
  }
  function slideMoves(drs, dcs) {
    for (let i = 0; i < drs.length; i++) { let rr = r + drs[i], cc = c + dcs[i]; while (inBounds(rr, cc)) { if (!addMove(rr, cc)) break; rr += drs[i]; cc += dcs[i]; } }
  }
  switch (piece.type) {
    case PAWN: {
      const dir = color === WHITE ? -1 : 1, startRow = color === WHITE ? 6 : 1, promoRow = color === WHITE ? 0 : 7;
      if (inBounds(r + dir, c) && !state.board[r + dir][c]) {
        if (r + dir === promoRow) for (const pt of [QUEEN, ROOK, BISHOP, KNIGHT]) moves.push({ fromR: r, fromC: c, toR: r + dir, toC: c, promotion: pt, capture: false });
        else moves.push({ fromR: r, fromC: c, toR: r + dir, toC: c, promotion: null, capture: false });
        if (r === startRow && !state.board[r + 2 * dir][c]) moves.push({ fromR: r, fromC: c, toR: r + 2 * dir, toC: c, promotion: null, capture: false });
      }
      for (const dc of [-1, 1]) {
        const tr = r + dir, tc = c + dc; if (!inBounds(tr, tc)) continue;
        const t = state.board[tr][tc];
        if (t && t.color === opponent) {
          if (tr === promoRow) for (const pt of [QUEEN, ROOK, BISHOP, KNIGHT]) moves.push({ fromR: r, fromC: c, toR: tr, toC: tc, promotion: pt, capture: true });
          else moves.push({ fromR: r, fromC: c, toR: tr, toC: tc, promotion: null, capture: true });
        }
        if (state.enPassantTarget && tr === state.enPassantTarget.row && tc === state.enPassantTarget.col) moves.push({ fromR: r, fromC: c, toR: tr, toC: tc, promotion: null, capture: true, enPassant: true });
      }
      break;
    }
    case KNIGHT: for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) addMove(r + dr, c + dc); break;
    case BISHOP: slideMoves([-1,-1,1,1], [-1,1,-1,1]); break;
    case ROOK: slideMoves([-1,1,0,0], [0,0,-1,1]); break;
    case QUEEN: slideMoves([-1,-1,1,1,-1,1,0,0], [-1,1,-1,1,0,0,-1,1]); break;
    case KING:
      for (const [dr, dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) addMove(r + dr, c + dc);
      const row = color === WHITE ? 7 : 0;
      if (r === row && c === 4) {
        if (color === WHITE) {
          if (state.castlingRights.wK && !state.board[7][5] && !state.board[7][6] && state.board[7][7]?.type === ROOK)
            if (!isSquareAttacked(state, 7, 4, BLACK) && !isSquareAttacked(state, 7, 5, BLACK) && !isSquareAttacked(state, 7, 6, BLACK)) moves.push({ fromR: 7, fromC: 4, toR: 7, toC: 6, castling: 'K' });
          if (state.castlingRights.wQ && !state.board[7][3] && !state.board[7][2] && !state.board[7][1] && state.board[7][0]?.type === ROOK)
            if (!isSquareAttacked(state, 7, 4, BLACK) && !isSquareAttacked(state, 7, 3, BLACK) && !isSquareAttacked(state, 7, 2, BLACK)) moves.push({ fromR: 7, fromC: 4, toR: 7, toC: 2, castling: 'Q' });
        } else {
          if (state.castlingRights.bK && !state.board[0][5] && !state.board[0][6] && state.board[0][7]?.type === ROOK)
            if (!isSquareAttacked(state, 0, 4, WHITE) && !isSquareAttacked(state, 0, 5, WHITE) && !isSquareAttacked(state, 0, 6, WHITE)) moves.push({ fromR: 0, fromC: 4, toR: 0, toC: 6, castling: 'k' });
          if (state.castlingRights.bQ && !state.board[0][3] && !state.board[0][2] && !state.board[0][1] && state.board[0][0]?.type === ROOK)
            if (!isSquareAttacked(state, 0, 4, WHITE) && !isSquareAttacked(state, 0, 3, WHITE) && !isSquareAttacked(state, 0, 2, WHITE)) moves.push({ fromR: 0, fromC: 4, toR: 0, toC: 2, castling: 'q' });
        }
      }
      break;
  }
  return moves;
}

function getLegalMoves(state, r, c) {
  const piece = state.board[r][c]; if (!piece) return [];
  return getPseudoLegalMoves(state, r, c).filter(m => { const s = applyMove(state, m, true); return !isInCheck(s, piece.color); });
}

function applyMove(state, move, cloneOnly) {
  const s = cloneOnly ? cloneState(state) : state;
  const piece = s.board[move.fromR][move.fromC];
  s.enPassantTarget = null;
  if (move.enPassant) s.board[move.toR + (piece.color === WHITE ? 1 : -1)][move.toC] = null;
  if (move.castling) { const row = move.fromR; if (move.toC === 6) { s.board[row][5] = s.board[row][7]; s.board[row][7] = null; } else { s.board[row][3] = s.board[row][0]; s.board[row][0] = null; } }
  s.board[move.toR][move.toC] = piece; s.board[move.fromR][move.fromC] = null;
  if (move.promotion) s.board[move.toR][move.toC] = { type: move.promotion, color: piece.color };
  if (piece.type === PAWN && Math.abs(move.toR - move.fromR) === 2) s.enPassantTarget = { row: (move.fromR + move.toR) / 2, col: move.fromC };
  if (piece.type === KING) { if (piece.color === WHITE) { s.castlingRights.wK = false; s.castlingRights.wQ = false; } else { s.castlingRights.bK = false; s.castlingRights.bQ = false; } }
  if (piece.type === ROOK) { if (move.fromR === 7 && move.fromC === 0) s.castlingRights.wQ = false; if (move.fromR === 7 && move.fromC === 7) s.castlingRights.wK = false; if (move.fromR === 0 && move.fromC === 0) s.castlingRights.bQ = false; if (move.fromR === 0 && move.fromC === 7) s.castlingRights.bK = false; }
  [ [7,0,'wQ'], [7,7,'wK'], [0,0,'bQ'], [0,7,'bK'] ].forEach(([cr, cc, key]) => { if (move.toR === cr && move.toC === cc) s.castlingRights[key] = false; });
  s.currentPlayer = s.currentPlayer === WHITE ? BLACK : WHITE;
  s.halfMoveClock = (piece.type === PAWN || move.capture) ? 0 : s.halfMoveClock + 1;
  if (s.currentPlayer === WHITE) s.fullMoveNumber++;
  return s;
}

function makeMove(move) {
  const oldState = { board: gameState.board.map(row => row.map(cell => cell ? { ...cell } : null)), currentPlayer: gameState.currentPlayer, castlingRights: { ...gameState.castlingRights }, enPassantTarget: gameState.enPassantTarget ? { ...gameState.enPassantTarget } : null, halfMoveClock: gameState.halfMoveClock, fullMoveNumber: gameState.fullMoveNumber };
  applyMove(gameState, move, false);
  gameState.moveHistory.push({ move, oldState });
}

function getAllLegalMoves(state, color) {
  const all = [];
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (state.board[r][c]?.color === color) all.push(...getLegalMoves(state, r, c));
  return all;
}

function getGameStatus(state) {
  const moves = getAllLegalMoves(state, state.currentPlayer);
  if (moves.length === 0) return isInCheck(state, state.currentPlayer) ? 'checkmate' : 'stalemate';
  return isInCheck(state, state.currentPlayer) ? 'check' : 'playing';
}

function moveToAlgebraic(move, piece) {
  if (move.castling) return move.castling === 'K' || move.castling === 'k' ? 'O-O' : 'O-O-O';
  const tm = { k: 'K', q: 'Q', r: 'R', b: 'B', n: 'N', p: '' }; let n = tm[piece.type];
  if (move.capture) { if (piece.type === PAWN) n += String.fromCharCode(97 + move.fromC); n += 'x'; }
  n += rcToSquare(move.toR, move.toC);
  if (move.promotion) n += '=' + tm[move.promotion].toUpperCase();
  return n;
}


// ==================== AI 引擎 ====================
function evaluateSimple(state) { let s = 0; for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) { const p = state.board[r][c]; if (p) s += p.color === WHITE ? PIECE_VALUES[p.type] : -PIECE_VALUES[p.type]; } return s; }
function evaluate(state, usePST) {
  if (!usePST) return evaluateSimple(state);
  let s = 0;
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
    const p = state.board[r][c]; if (!p) continue;
    let v = PIECE_VALUES[p.type]; const idx = p.color === WHITE ? (7 - r) * 8 + c : r * 8 + c;
    v += PST[p.type] ? PST[p.type][idx] : 0; s += p.color === WHITE ? v : -v;
  }
  return s;
}
function minimax(state, depth, alpha, beta, maximizing, usePST) {
  if (depth === 0) return { score: evaluate(state, usePST), move: null };
  const color = maximizing ? WHITE : BLACK, moves = getAllLegalMoves(state, color);
  if (moves.length === 0) return { score: isInCheck(state, color) ? (maximizing ? -99999 + depth : 99999 - depth) : 0, move: null };
  moves.sort((a, b) => { const av = a.capture ? PIECE_VALUES[state.board[a.toR][a.toC]?.type || 'p'] : 0, bv = b.capture ? PIECE_VALUES[state.board[b.toR][b.toC]?.type || 'p'] : 0; return bv - av; });
  let bestMove = moves[0];
  if (maximizing) { let ms = -Infinity; for (const m of moves) { const r = minimax(applyMove(state, m, true), depth - 1, alpha, beta, false, usePST); if (r.score > ms) { ms = r.score; bestMove = m; } alpha = Math.max(alpha, ms); if (alpha >= beta) break; } return { score: ms, move: bestMove }; }
  else { let ms = Infinity; for (const m of moves) { const r = minimax(applyMove(state, m, true), depth - 1, alpha, beta, true, usePST); if (r.score < ms) { ms = r.score; bestMove = m; } beta = Math.min(beta, ms); if (alpha >= beta) break; } return { score: ms, move: bestMove }; }
}
function getAIMove() {
  const cfg = { beginner: { d: 1, p: false, r: 0.4 }, novice: { d: 2, p: false, r: 0.25 }, normal: { d: 3, p: true, r: 0.05 }, hard: { d: 4, p: true, r: 0 } };
  const c = cfg[difficulty] || cfg.normal, moves = getAllLegalMoves(gameState, gameState.currentPlayer);
  if (moves.length === 0) return null; if (moves.length === 1) return moves[0];
  if (Math.random() < c.r) { const safe = moves.filter(m => { const ts = applyMove(gameState, m, true); const sd = evaluate(ts, false) - evaluate(gameState, false); return sd * (gameState.currentPlayer === WHITE ? 1 : -1) > -200; }); return (safe.length > 0 ? safe : moves)[Math.floor(Math.random() * (safe.length > 0 ? safe : moves).length)]; }
  return minimax(gameState, c.d, -Infinity, Infinity, gameState.currentPlayer === WHITE, c.p).move;
}

// ==================== 闯关逻辑 ====================
let currentPuzzle = null;

function loadPuzzle(idx) {
  puzzleIndex = idx; puzzleStep = 0; puzzleSolved = false;
  currentPuzzle = PUZZLES[idx];
  gameState = parseFEN(currentPuzzle.fen);
  selectedSquare = null; legalMovesForSelected = []; lastMoveFrom = null; lastMoveTo = null; aiThinking = false; promotionMove = null; animating = false;
  document.getElementById('promotion-overlay').classList.add('hidden');
  document.getElementById('game-status').className = 'game-status';
  document.getElementById('effects-layer').innerHTML = '';
  document.getElementById('puzzle-result').classList.add('hidden');
  document.getElementById('puzzle-result').textContent = '';
  document.getElementById('puzzle-hint-text').classList.add('hidden');
  document.querySelector('.puzzle-info').classList.remove('hidden');
  document.getElementById('puzzle-title').textContent = '\u{1F3AF} \u7B2C' + (idx + 1) + '\u5173\uFF1A' + currentPuzzle.title;
  const badge = document.getElementById('puzzle-difficulty');
  badge.textContent = { easy: '\u7B80\u5355', medium: '\u4E2D\u7B49', hard: '\u56F0\u96BE' }[currentPuzzle.difficulty];
  badge.className = 'puzzle-badge ' + (currentPuzzle.difficulty === 'hard' ? 'hard-p' : currentPuzzle.difficulty);
  document.getElementById('puzzle-desc').textContent = currentPuzzle.desc;
  if (completedPuzzles[currentPuzzle.id]) {
    document.getElementById('puzzle-result').textContent = '\u2705 \u5DF2\u5B8C\u6210';
    document.getElementById('puzzle-result').classList.add('success');
    document.getElementById('puzzle-result').classList.remove('hidden');
  }
  updatePuzzleProgress();
  hideHoverHint();
  renderBoard();
}

function updatePuzzleProgress() {
  const total = PUZZLES.length, done = Object.keys(completedPuzzles).length;
  document.getElementById('puzzle-progress').textContent = '\u{1F3C6} \u5DF2\u8FC7 ' + done + '/' + total + ' \u5173';
  document.getElementById('btn-prev-puzzle').disabled = puzzleIndex === 0;
}

function validatePuzzleMove(move) {
  if (!currentPuzzle || puzzleSolved) return false;
  const uci = rcToSquare(move.fromR, move.fromC) + rcToSquare(move.toR, move.toC);
  if (move.promotion) {
    const pMap = { q: 'q', r: 'r', b: 'b', n: 'n' };
    // 加上升变标记匹配
    return currentPuzzle.solution[puzzleStep] === uci + (pMap[move.promotion] || 'q');
  }
  return currentPuzzle.solution[puzzleStep] === uci;
}

function onPuzzleCorrect() {
  puzzleStep++;
  playSuccessSound();
  // 检查是否完成整个解答
  if (puzzleStep >= currentPuzzle.solution.length) {
    puzzleSolved = true;
    completedPuzzles[currentPuzzle.id] = true;
    try { localStorage.setItem('chess_puzzles', JSON.stringify(completedPuzzles)); } catch(e) {}
    const result = document.getElementById('puzzle-result');
    result.textContent = '\u{1F389} \u89E3\u7B54\u6B63\u786E\uFF01\u592A\u68D2\u4E86\uFF01';
    result.className = 'puzzle-result success';
    result.classList.remove('hidden');
    updatePuzzleProgress();
    playVictorySound();
    showSimpleConfetti();
    return;
  }
  // 自动执行解答中的下一步（对手走棋）
  setTimeout(() => {
    const nextUci = currentPuzzle.solution[puzzleStep];
    const from = squareToRC(nextUci.substring(0, 2)), to = squareToRC(nextUci.substring(2, 4));
    let promo = null;
    if (nextUci.length > 4) { const pt = nextUci[4]; promo = pt; }
    const nextMove = { fromR: from.row, fromC: from.col, toR: to.row, toC: to.col, promotion: promo, capture: !!gameState.board[to.row][to.col] };
    playMoveSounds(nextMove);
    animateMove(nextMove, () => {
      makeMove(nextMove);
      nextMove.notation = moveToAlgebraic(nextMove, { type: promo ? PAWN : gameState.board[nextMove.toR][nextMove.toC].type });
      lastMoveFrom = { row: nextMove.fromR, col: nextMove.fromC };
      lastMoveTo = { row: nextMove.toR, col: nextMove.toC };
      puzzleStep++;
      renderBoard();
      // 检查对手走后是否完成了整个解答
      if (puzzleStep >= currentPuzzle.solution.length) {
        puzzleSolved = true;
        completedPuzzles[currentPuzzle.id] = true;
        try { localStorage.setItem('chess_puzzles', JSON.stringify(completedPuzzles)); } catch(e) {}
        const result = document.getElementById('puzzle-result');
        result.textContent = '\u{1F389} \u89E3\u7B54\u6B63\u786E\uFF01\u592A\u68D2\u4E86\uFF01';
        result.className = 'puzzle-result success';
        result.classList.remove('hidden');
        updatePuzzleProgress();
        playVictorySound();
        showSimpleConfetti();
      }
    });
  }, 300);
}

function onPuzzleWrong() {
  playFailSound();
  const result = document.getElementById('puzzle-result');
  result.textContent = '\u274C \u4E0D\u6B63\u786E\uFF0C\u518D\u8BD5\u4E00\u6B21\u5427\uFF01';
  result.className = 'puzzle-result fail';
  result.classList.remove('hidden');
  // 1.5秒后重置
  setTimeout(() => { loadPuzzle(puzzleIndex); }, 1500);
}

function showPuzzleHint() {
  if (!currentPuzzle) return;
  document.getElementById('puzzle-hint-text').textContent = '\u{1F4A1} \u63D0\u793A\uFF1A' + currentPuzzle.hint;
  document.getElementById('puzzle-hint-text').classList.remove('hidden');
}

function prevPuzzle() { if (puzzleIndex > 0) loadPuzzle(puzzleIndex - 1); }
function nextPuzzle() { if (puzzleIndex < PUZZLES.length - 1) loadPuzzle(puzzleIndex + 1); }
function showSimpleConfetti() {
  const layer = document.getElementById('effects-layer'), colors = ['#f0c040','#ff6b6b','#4ecdc4','#45b7d1','#6ab04c'];
  for (let i = 0; i < 30; i++) { const c = document.createElement('div'); c.className = 'confetti'; c.style.left = Math.random() * 100 + '%'; c.style.top = -(Math.random() * 10) + 'vh'; c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; c.style.width = (6 + Math.random() * 8) + 'px'; c.style.height = (6 + Math.random() * 8) + 'px'; c.style.animationDuration = (2 + Math.random() * 2) + 's'; c.style.animationDelay = Math.random() * 0.3 + 's'; layer.appendChild(c); }
  setTimeout(() => { layer.querySelectorAll('.confetti').forEach(c => c.remove()); }, 5000);
}


// ==================== 悬停提示 ====================
function analyzeMove(move) {
  const state = gameState, piece = state.board[move.fromR][move.fromC], target = state.board[move.toR][move.toC], testState = applyMove(state, move, true);
  const oppColor = piece.color === WHITE ? BLACK : WHITE, oppKing = findKing(testState, oppColor);
  const givesCheck = oppKing && isSquareAttacked(testState, oppKing.row, oppKing.col, piece.color);
  const destAttacked = isSquareAttacked(testState, move.toR, move.toC, oppColor);
  let type = 'neutral', text = '';
  if (givesCheck) { type = 'check'; text = '\u2694\uFE0F \u5C06\u519B\uFF01'; }
  else if (move.capture) { const val = PIECE_VALUES[target.type], myVal = PIECE_VALUES[piece.type]; if (val > myVal) { type = 'opportunity'; text = '\u{1F4C8} \u5927\u4F18\uFF1A\u5403' + getName2(target) + '\uFF08+' + val + '\u5206\uFF09'; } else if (val >= myVal) { type = 'opportunity'; text = '\u{1F4C8} \u4F18\u52BF\uFF1A\u5403' + getName2(target); } else { type = 'risk'; text = '\u26A0\uFE0F \u635F\u5931\uFF1A\u7528' + getName2(piece) + '\u6362' + getName2(target); } }
  if (!text && destAttacked) { type = 'risk'; text = '\u{1F6AB} \u5371\u9669\uFF1A\u6B64\u683C\u88AB\u653B\u51FB'; }
  if (!text) text = '\u2705 \u5B89\u5168\u4E00\u6B65';
  return { type, text };
}
function getName2(p) { const names = { k: '\u738B', q: '\u540E', r: '\u8F66', b: '\u8C61', n: '\u9A6C', p: '\u5175' }; return names[p.type] || '?'; }
function showHoverHint(move, event) {
  const hint = analyzeMove(move), el = document.getElementById('hover-hint');
  el.classList.remove('hidden');
  let cls = 'hint-neutral'; if (hint.type === 'opportunity') cls = 'hint-opportunity'; else if (hint.type === 'risk') cls = 'hint-risk'; else if (hint.type === 'check') cls = 'hint-check';
  el.innerHTML = '<span class="' + cls + '">' + hint.text + '</span>';
  el.style.left = event.clientX + 'px'; el.style.top = event.clientY + 'px';
}
function hideHoverHint() { document.getElementById('hover-hint').classList.add('hidden'); }

// ==================== 动画辅助 ====================
function getSquareElement(r, c) { return document.querySelector('.square[data-row="' + r + '"][data-col="' + c + '"]'); }
function animateMove(move, callback) {
  animating = true;
  const fromEl = getSquareElement(move.fromR, move.fromC), toEl = getSquareElement(move.toR, move.toC), pieceEl = fromEl?.querySelector('.piece');
  if (move.capture) { const tp = toEl?.querySelector('.piece'); if (tp) tp.classList.add('capturing'); }
  if (pieceEl) { pieceEl.classList.add('animating');
    setTimeout(() => { if (pieceEl) pieceEl.classList.remove('animating'); if (toEl) toEl.classList.add('receive-piece');
      setTimeout(() => { if (toEl) toEl.classList.remove('receive-piece'); }, 400); if (callback) callback(); animating = false; }, 200);
  } else { if (callback) callback(); animating = false; }
}

// ==================== 胜利特效 ====================
function showVictoryEffects(winner) {
  const layer = document.getElementById('effects-layer'), colors = ['#f0c040','#ff6b6b','#4ecdc4','#45b7d1','#f9ca24','#6ab04c','#e056a0','#f0932b'];
  for (let i = 0; i < 50; i++) { const c = document.createElement('div'); c.className = 'confetti'; c.style.left = Math.random() * 100 + '%'; c.style.top = -(Math.random() * 10) + 'vh'; c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; c.style.width = (6 + Math.random() * 10) + 'px'; c.style.height = (6 + Math.random() * 10) + 'px'; c.style.animationDuration = (2 + Math.random() * 3) + 's'; c.style.animationDelay = Math.random() * 0.5 + 's'; layer.appendChild(c); }
  const banner = document.createElement('div'); banner.className = 'victory-banner';
  banner.innerHTML = '<h2>\u{1F3C6} ' + winner + '\u83B7\u80DC\uFF01</h2><p>\u7CBE\u5F69\u7684\u4E00\u5C40\uFF01</p><button onclick="dismissVictory()">\u518D\u6765\u4E00\u5C40</button>';
  layer.appendChild(banner);
  setTimeout(() => { banner.querySelector('button').style.pointerEvents = 'auto'; }, 600);
  setTimeout(() => { layer.querySelectorAll('.confetti').forEach(c => c.remove()); }, 6000);
}
function dismissVictory() { document.getElementById('effects-layer').innerHTML = ''; newGame(); }

function playMoveSounds(move) {
  if (move.castling) { playCastleSound(); return; }
  if (move.promotion) { playPromoteSound(); return; }
  if (move.capture) playCaptureSound(); else playMoveSound();
}


// ==================== UI 渲染 ====================
function renderBoard() {
  const boardEl = document.getElementById('board');
  boardEl.innerHTML = '';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const sq = document.createElement('div');
      sq.className = 'square ' + ((r + c) % 2 === 0 ? 'light' : 'dark');
      sq.dataset.row = r; sq.dataset.col = c;
      if (lastMoveFrom && r === lastMoveFrom.row && c === lastMoveFrom.col) sq.classList.add('last-move-from');
      if (lastMoveTo && r === lastMoveTo.row && c === lastMoveTo.col) sq.classList.add('last-move-to');
      if (selectedSquare && r === selectedSquare.row && c === selectedSquare.col) sq.classList.add('selected');
      const lm = legalMovesForSelected.find(m => m.toR === r && m.toC === c);
      if (lm) sq.classList.add(gameState.board[r][c] ? 'legal-capture' : 'legal-dot');
      if (gameState) {
        const king = findKing(gameState, gameState.currentPlayer);
        if (king && r === king.row && c === king.col && isInCheck(gameState, gameState.currentPlayer)) sq.classList.add('in-check');
      }
      const piece = gameState.board[r][c];
      if (piece) { const pe = document.createElement('div'); pe.className = 'piece'; pe.innerHTML = PIECE_SVGS[piece.color + piece.type]; sq.appendChild(pe); }
      sq.addEventListener('click', () => onSquareClick(r, c));
      if (selectedSquare) {
        const hm = legalMovesForSelected.find(m => m.toR === r && m.toC === c);
        sq.addEventListener('mouseenter', (e) => { if (hm) { sq.classList.add('hover-target'); showHoverHint(hm, e); } });
        sq.addEventListener('mouseleave', () => { sq.classList.remove('hover-target'); hideHoverHint(); });
      }
      boardEl.appendChild(sq);
    }
  }
  updateMoveHistory();
  updateStatus();
}

function updateMoveHistory() {
  const el = document.getElementById('move-history');
  if (gameState.moveHistory.length === 0) { el.innerHTML = '<p class="placeholder">等待第一步……</p>'; return; }
  let html = '';
  for (let i = 0; i < gameState.moveHistory.length; i++) {
    const e = gameState.moveHistory[i];
    if (i % 2 === 0) { html += '<div class="move-entry"><span class="move-num">' + (Math.floor(i / 2) + 1) + '.</span><span class="move-white">' + (e.move.notation || '') + '</span>'; }
    else { html += '<span class="move-black">' + (e.move.notation || '') + '</span></div>'; }
  }
  el.innerHTML = html; el.scrollTop = el.scrollHeight;
}

function updateStatus() {
  const el = document.getElementById('game-status'), s = getGameStatus(gameState);
  el.className = 'game-status'; el.textContent = '';
  if (s === 'checkmate') { el.textContent = '\u{1F3C6} ' + (gameState.currentPlayer === WHITE ? '\u9ED1\u65B9' : '\u767D\u65B9') + '\u83B7\u80DC\uFF01'; el.classList.add('visible', 'win'); }
  else if (s === 'stalemate') { el.textContent = '\u{1F91D} \u903C\u548C\uFF01'; el.classList.add('visible', 'draw'); }
  else if (s === 'check') { el.textContent = '\u26A0\uFE0F \u5C06\u519B\uFF01'; el.classList.add('visible', 'check'); }
  // 闯关模式额外状态
  if (mode === 'puzzle' && currentPuzzle && puzzleSolved && s !== 'checkmate') {
    el.textContent = '\u{1F389} \u5173\u5361\u5B8C\u6210\uFF01';
    el.classList.add('visible', 'win');
  }
}

// ==================== 升变弹窗 ====================
function renderPromotionDialog(color) {
  const overlay = document.getElementById('promotion-overlay'), piecesEl = document.getElementById('promotion-pieces');
  overlay.classList.remove('hidden'); piecesEl.innerHTML = '';
  for (const type of [QUEEN, ROOK, BISHOP, KNIGHT]) {
    const div = document.createElement('div'); div.className = 'promotion-piece'; div.innerHTML = PIECE_SVGS[color + type];
    div.addEventListener('click', () => completePromotion(type)); piecesEl.appendChild(div);
  }
}
function completePromotion(type) {
  document.getElementById('promotion-overlay').classList.add('hidden');
  if (!promotionMove) return;
  const move = { ...promotionMove, promotion: type };
  if (mode === 'puzzle') { handlePuzzlePromotion(move, type); return; }
  playMoveSounds(move);
  animateMove(move, () => {
    makeMove(move); move.notation = moveToAlgebraic(move, { type: PAWN });
    lastMoveFrom = { row: move.fromR, col: move.fromC }; lastMoveTo = { row: move.toR, col: move.toC };
    selectedSquare = null; legalMovesForSelected = []; promotionMove = null;
    renderBoard(); checkPostMove();
  });
}
function handlePuzzlePromotion(move, type) {
  move.promotion = type;
  if (validatePuzzleMove(move)) {
    playPromoteSound();
    animateMove(move, () => {
      makeMove(move); move.notation = moveToAlgebraic(move, { type: PAWN });
      lastMoveFrom = { row: move.fromR, col: move.fromC }; lastMoveTo = { row: move.toR, col: move.toC };
      selectedSquare = null; legalMovesForSelected = []; promotionMove = null;
      puzzleStep++;
      renderBoard();
      onPuzzleCorrectAfterPromotion();
    });
  } else { onPuzzleWrong(); }
}
function onPuzzleCorrectAfterPromotion() {
  playSuccessSound();
  if (puzzleStep >= currentPuzzle.solution.length) {
    puzzleSolved = true; completedPuzzles[currentPuzzle.id] = true;
    try { localStorage.setItem('chess_puzzles', JSON.stringify(completedPuzzles)); } catch(e) {}
    const result = document.getElementById('puzzle-result');
    result.textContent = '\u{1F389} \u89E3\u7B54\u6B63\u786E\uFF01\u592A\u68D2\u4E86\uFF01';
    result.className = 'puzzle-result success'; result.classList.remove('hidden');
    updatePuzzleProgress(); playVictorySound(); showSimpleConfetti();
    return;
  }
  // 自动执行对手走法
  setTimeout(() => {
    const nextUci = currentPuzzle.solution[puzzleStep];
    const from = squareToRC(nextUci.substring(0, 2)), to = squareToRC(nextUci.substring(2, 4));
    let promo = nextUci.length > 4 ? nextUci[4] : null;
    const nm = { fromR: from.row, fromC: from.col, toR: to.row, toC: to.col, promotion: promo, capture: !!gameState.board[to.row][to.col] };
    playMoveSounds(nm);
    animateMove(nm, () => {
      makeMove(nm); nm.notation = moveToAlgebraic(nm, { type: promo ? PAWN : gameState.board[nm.toR][nm.toC].type });
      lastMoveFrom = { row: nm.fromR, col: nm.fromC }; lastMoveTo = { row: nm.toR, col: nm.toC };
      puzzleStep++; renderBoard();
      if (puzzleStep >= currentPuzzle.solution.length) {
        puzzleSolved = true; completedPuzzles[currentPuzzle.id] = true;
        try { localStorage.setItem('chess_puzzles', JSON.stringify(completedPuzzles)); } catch(e) {}
        document.getElementById('puzzle-result').textContent = '\u{1F389} \u89E3\u7B54\u6B63\u786E\uFF01\u592A\u68D2\u4E86\uFF01';
        document.getElementById('puzzle-result').className = 'puzzle-result success';
        document.getElementById('puzzle-result').classList.remove('hidden');
        updatePuzzleProgress(); playVictorySound(); showSimpleConfetti();
      }
    });
  }, 300);
}


// ==================== 交互处理 ====================
function onSquareClick(r, c) {
  if (aiThinking || animating) return;
  if (mode === 'puzzle' && puzzleSolved) return;
  const status = getGameStatus(gameState);
  if (mode !== 'puzzle' && (status === 'checkmate' || status === 'stalemate')) return;
  if (mode === 'pve' && gameState.currentPlayer !== playerColor) return;
  if (mode === 'puzzle' && gameState.currentPlayer !== currentPuzzle.playerColor) return;

  const piece = gameState.board[r][c];
  if (selectedSquare) {
    const move = legalMovesForSelected.find(m => m.toR === r && m.toC === c);
    if (move) { executeMove(move); return; }
    if (piece && piece.color === gameState.currentPlayer) { selectPiece(r, c); return; }
    clearSelection(); return;
  }
  if (piece && piece.color === gameState.currentPlayer) selectPiece(r, c);
}

function selectPiece(r, c) { selectedSquare = { row: r, col: c }; legalMovesForSelected = getLegalMoves(gameState, r, c); hideHoverHint(); renderBoard(); }
function clearSelection() { selectedSquare = null; legalMovesForSelected = []; hideHoverHint(); renderBoard(); }

function executeMove(move) {
  if (mode === 'puzzle') {
    if (move.promotion) {
      // 升变走法直接验证
      if (validatePuzzleMove(move)) {
        playMoveSounds(move);
        animateMove(move, () => {
          makeMove(move); move.notation = moveToAlgebraic(move, { type: PAWN });
          lastMoveFrom = { row: move.fromR, col: move.fromC }; lastMoveTo = { row: move.toR, col: move.toC };
          selectedSquare = null; legalMovesForSelected = []; puzzleStep++;
          renderBoard(); onPuzzleCorrectAfterPromotion();
        });
      } else { onPuzzleWrong(); }
      return;
    }
    // 非升变走法
    const piece = gameState.board[move.fromR][move.fromC];
    if (piece.type === PAWN && (move.toR === 0 || move.toR === 7)) {
      promotionMove = move; renderPromotionDialog(piece.color); return;
    }
    if (!validatePuzzleMove(move)) { onPuzzleWrong(); return; }
    playMoveSounds(move);
    animateMove(move, () => {
      makeMove(move); move.notation = moveToAlgebraic(move, { type: piece.type });
      lastMoveFrom = { row: move.fromR, col: move.fromC }; lastMoveTo = { row: move.toR, col: move.toC };
      selectedSquare = null; legalMovesForSelected = []; puzzleStep++;
      renderBoard();
      // 检查棋局是否结束或已完成解答
      const status = getGameStatus(gameState);
      if (status === 'checkmate') {
        onPuzzleComplete(); return;
      }
      onPuzzleCorrect();
    });
    return;
  }
  // 非闯关模式
  const piece = gameState.board[move.fromR][move.fromC];
  if (piece.type === PAWN && (move.toR === 0 || move.toR === 7)) { promotionMove = move; renderPromotionDialog(piece.color); return; }
  doMove(move);
}

function doMove(move) {
  playMoveSounds(move); hideHoverHint();
  animateMove(move, () => {
    makeMove(move); move.notation = moveToAlgebraic(move, { type: move.promotion ? PAWN : gameState.board[move.toR][move.toC].type });
    lastMoveFrom = { row: move.fromR, col: move.fromC }; lastMoveTo = { row: move.toR, col: move.toC };
    selectedSquare = null; legalMovesForSelected = []; renderBoard(); checkPostMove();
  });
}

function checkPostMove() {
  const status = getGameStatus(gameState);
  if (status === 'check') playCheckSound();
  if (status === 'checkmate') {
    const winner = gameState.currentPlayer === WHITE ? '\u9ED1\u65B9' : '\u767D\u65B9';
    playVictorySound(); document.getElementById('board').classList.add('shake');
    setTimeout(() => document.getElementById('board').classList.remove('shake'), 400);
    setTimeout(() => showVictoryEffects(winner), 500); return;
  }
  if (status === 'stalemate') { playDrawSound(); return; }
  if (mode === 'pve' && gameState.currentPlayer !== playerColor) triggerAI();
}

function onPuzzleComplete() {
  puzzleSolved = true; completedPuzzles[currentPuzzle.id] = true;
  try { localStorage.setItem('chess_puzzles', JSON.stringify(completedPuzzles)); } catch(e) {}
  const result = document.getElementById('puzzle-result');
  result.textContent = '\u{1F389} \u89E3\u7B54\u6B63\u786E\uFF01\u592A\u68D2\u4E86\uFF01';
  result.className = 'puzzle-result success'; result.classList.remove('hidden');
  updatePuzzleProgress(); playVictorySound(); showSimpleConfetti();
}

function triggerAI() {
  aiThinking = true; document.getElementById('btn-undo').disabled = true;
  const sidebar = document.querySelector('.sidebar'); let thinkEl = document.getElementById('thinking-indicator');
  if (!thinkEl) { thinkEl = document.createElement('div'); thinkEl.id = 'thinking-indicator'; thinkEl.className = 'thinking-indicator'; thinkEl.textContent = '\u{1F9E0} AI\u601D\u8003\u4E2D...'; sidebar.appendChild(thinkEl); }
  thinkEl.style.display = 'block';
  setTimeout(() => {
    const aimove = getAIMove();
    if (aimove) {
      playMoveSounds(aimove);
      animateMove(aimove, () => {
        makeMove(aimove); aimove.notation = moveToAlgebraic(aimove, { type: aimove.promotion ? PAWN : gameState.board[aimove.toR][aimove.toC].type });
        lastMoveFrom = { row: aimove.fromR, col: aimove.fromC }; lastMoveTo = { row: aimove.toR, col: aimove.toC };
        renderBoard();
        const status = getGameStatus(gameState);
        if (status === 'check') playCheckSound();
        if (status === 'checkmate') {
          playVictorySound(); document.getElementById('board').classList.add('shake');
          setTimeout(() => document.getElementById('board').classList.remove('shake'), 400);
          setTimeout(() => showVictoryEffects(gameState.currentPlayer === WHITE ? '\u9ED1\u65B9' : '\u767D\u65B9'), 500);
        }
        if (status === 'stalemate') playDrawSound();
      });
    }
    aiThinking = false; document.getElementById('btn-undo').disabled = false;
    if (thinkEl) thinkEl.style.display = 'none';
  }, 50);
}


// ==================== 控制函数 ====================
function setMode(m) {
  mode = m;
  document.getElementById('btn-mode-pvp').classList.toggle('active', m === 'pvp');
  document.getElementById('btn-mode-pve').classList.toggle('active', m === 'pve');
  document.getElementById('btn-mode-puzzle').classList.toggle('active', m === 'puzzle');
  document.getElementById('pve-options').classList.toggle('hidden', m !== 'pve');
  document.getElementById('puzzle-options').classList.toggle('hidden', m !== 'puzzle');
  document.getElementById('puzzle-info').classList.toggle('hidden', m !== 'puzzle');
  document.getElementById('puzzle-nav').classList.toggle('hidden', m !== 'puzzle');
  document.getElementById('btn-hint').classList.toggle('hidden', m !== 'puzzle');
  document.getElementById('effects-layer').innerHTML = '';
  if (m === 'puzzle') {
    loadPuzzle(puzzleIndex);
  } else {
    newGame();
  }
  resizeBoard();
}

function setPlayerColor(c) {
  playerColor = c;
  document.getElementById('btn-color-white').classList.toggle('active', c === 'w');
  document.getElementById('btn-color-black').classList.toggle('active', c === 'b');
  if (mode !== 'puzzle') newGame();
}

function setDifficulty(val) { difficulty = val; if (mode === 'pve') newGame(); }

function undoMove() {
  if (aiThinking || animating || mode === 'puzzle') return;
  const count = mode === 'pve' ? 2 : 1;
  if (gameState.moveHistory.length < count) return;
  for (let i = 0; i < count; i++) gameState.moveHistory.pop();
  let s = parseFEN(INITIAL_FEN);
  for (const entry of gameState.moveHistory) applyMove(s, entry.move, false);
  gameState.board = s.board; gameState.currentPlayer = s.currentPlayer; gameState.castlingRights = s.castlingRights; gameState.enPassantTarget = s.enPassantTarget; gameState.halfMoveClock = s.halfMoveClock; gameState.fullMoveNumber = s.fullMoveNumber;
  if (gameState.moveHistory.length > 0) { const last = gameState.moveHistory[gameState.moveHistory.length - 1].move; lastMoveFrom = { row: last.fromR, col: last.fromC }; lastMoveTo = { row: last.toR, col: last.toC }; }
  else { lastMoveFrom = null; lastMoveTo = null; }
  selectedSquare = null; legalMovesForSelected = []; hideHoverHint(); renderBoard();
}

function newGame() {
  if (mode === 'puzzle') { loadPuzzle(puzzleIndex); return; }
  gameState = parseFEN(INITIAL_FEN);
  selectedSquare = null; legalMovesForSelected = []; lastMoveFrom = null; lastMoveTo = null; aiThinking = false; promotionMove = null; animating = false;
  hideHoverHint();
  document.getElementById('promotion-overlay').classList.add('hidden');
  document.getElementById('game-status').className = 'game-status';
  document.getElementById('effects-layer').innerHTML = '';
  const thinkEl = document.getElementById('thinking-indicator'); if (thinkEl) thinkEl.style.display = 'none';
  renderBoard();
  if (mode === 'pve' && playerColor === BLACK) triggerAI();
}

// ==================== 响应式棋盘 ====================
function resizeBoard() {
  const vw = window.innerWidth, vh = window.innerHeight;
  // 减去侧边栏(220px)、工具栏高度、边距
  const maxBoardWidth = vw - 280;  // 220 sidebar + margins/padding
  const maxBoardHeight = vh - 160; // toolbar + margins
  let size = Math.min(maxBoardWidth, maxBoardHeight, 800);
  size = Math.max(size, 280); // 最小280px
  document.documentElement.style.setProperty('--board-size', size + 'px');
  // 同步更新ranks高度
  const ranksEl = document.querySelector('.board-labels.ranks');
  if (ranksEl) ranksEl.style.height = size + 'px';
}

function initGame() {
  resizeBoard();
  newGame();
}

window.addEventListener('resize', resizeBoard);

