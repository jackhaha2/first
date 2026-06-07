# 单机国际象棋 — 项目说明文档

一个纯前端国际象棋游戏，无需安装任何依赖，用浏览器打开 `index.html` 即可运行。

---

## 文件总览

| 文件 | 大小 | 作用 |
|---|---|---|
| `index.html` | 4 KB | 页面结构与 HTML 骨架 |
| `style.css` | 13.5 KB | 全局样式表 |
| `chess.js` | 57 KB | 游戏引擎 + AI + 闯关逻辑 |

---

## index.html

游戏的 HTML 骨架，定义所有 UI 元素的 DOM 结构。

| 模块 | 说明 |
|---|---|
| 模式切换栏 (`.toolbar` → `.mode-switch`) | 三个按钮切换游戏模式：**双人**（PVP）、**人机**（PVE）、**闯关**（Puzzle）。点击时调用 `setMode()`。 |
| 人机选项 (`#pve-options`) | 在选择人机模式后显示：玩家执白/执黑（`setPlayerColor()`）、难度下拉框（初学者 / 新手 / 普通 / 困难，`setDifficulty()`）。 |
| 闯关进度 (`#puzzle-options`) | 闯关模式下显示当前关卡进度。 |
| 操作按钮 (`.actions`) | 音效开关（`toggleSound()`）、悔棋（`undoMove()`）、闯关提示（`showPuzzleHint()`）、新游戏（`newGame()`）。 |
| 棋盘区域 (`.board-container`) | 包含文件列标签（a-h）、行标签（1-8），以及一个 `#board` 的 8×8 网格，由 JS 动态生成格子。 |
| 侧边栏 (`.sidebar`) | 闯关信息面板（标题、描述、提示、结果）、走棋记录（`#move-history`）、游戏状态（`#game-status`）、闯关翻页按钮。 |
| 悬停提示 (`#hover-hint`) | 鼠标悬停在合法走法格子上时，显示走法分析（如"吃子 / 将军 / 将死"）。 |
| 升变弹窗 (`#promotion-overlay`) | 兵到达底线时弹出，让玩家选择升变为后/车/象/马。 |
| 胜利特效层 (`#effects-layer`) | 游戏结束时播放烟花/撒花全屏特效。 |
| 启动脚本 | 页面加载完成后调用 `initGame()` 初始化整个游戏。 |

---

## style.css

全局样式表，负责所有视觉呈现。

| 模块 | 说明 |
|---|---|
| CSS 变量 (`:root`) | 定义棋盘深浅格颜色、选中高亮、最近走法标记、将军闪烁色，以及整体暗色主题的配色（背景 `#312e2b`、面板 `#3d3a37`、强调色 `#81b64c`）。 |
| 工具栏 (`.toolbar`) | 模式按钮的激活态、难度下拉框样式、操作按钮的悬停/禁用态。 |
| 棋盘 (`.board`) | 使用 CSS Grid 8×8 布局，棋盘尺寸由 `--board-size` 变量控制。格子用 `.light` / `.dark` 类控制颜色，`.selected` / `.last-move-*` / `.in-check` 类控制状态高亮。 |
| 棋盘标签 (`.board-labels`) | 文件（a-h）和行号（1-8）的布局与样式。 |
| 将军动画 (`@keyframes checkPulse` / `checkGlow`) | 被将军的国王格子红色脉冲闪烁 + 发光边框。 |
| 合法走法标记 (`.legal-dot` / `.legal-capture`) | 合法走法显示为半透明圆点，可吃子显示为圆环。 |
| 棋盘抖动 (`@keyframes boardShake`) | 走错棋时棋盘抖动效果。 |
| 侧边栏 (`.sidebar`) | 走棋记录滚动区域、状态消息的渐变色（胜利绿色、平局灰色、将军红色）。 |
| 闯关信息面板 (`.puzzle-info`) | 标题、难度标签（简单绿/中等橙/困难红）、提示、结果（成功/失败）。 |
| 升变弹窗 (`.overlay` / `.promotion-dialog`) | 半透明遮罩 + 居中弹窗，棋子选项悬停放大。 |
| 胜利特效层 (`.effects-layer`) | 全屏覆盖，用于放置烟花粒子。 |
| 响应式 (`@media`) | 根据屏幕宽度缩小棋盘和字体，适配手机/平板。 |

---

## chess.js

游戏的核心引擎，约 811 行，包含完整的国际象棋逻辑、AI、音效、闯关题库和 UI 交互。

### 1. SVG 棋子定义 (`PIECE_SVGS`)

行 5–18。定义所有 12 种棋子的内联 SVG 图形（白/黑 × 王/后/车/象/马/兵），供棋盘渲染时使用。

### 2. 音效系统

行 20–41。使用 Web Audio API 生成程序化音效，无需外部音频文件：

- `getAudioCtx()` — 获取或创建 AudioContext
- `playTone(freq, duration, type, vol)` — 播放指定频率/波形/时长的音调
- `playMoveSound()` — 普通走子音效
- `playCaptureSound()` — 吃子音效（叠加两个频率）
- `playCheckSound()` — 将军音效（两声高频）
- `playCastleSound()` — 王车易位音效
- `playPromoteSound()` — 升变音效（三连音上行）
- `playVictorySound()` — 胜利音效（四音阶上行）
- `playDrawSound()` — 和棋音效
- `playSuccessSound()` / `playFailSound()` — 闯关成功/失败音效
- `toggleSound()` — 切换音效开关

### 3. 闯关题库 (`PUZZLES`)

行 43–61。内置多个国际象棋残局/战术题，每道题包含：FEN 初始局面、答案走法序列（`moves`）、标题、描述、提示、难度。

### 4. 常量定义

行 62–76：

- `WHITE` / `BLACK` — 颜色常量
- `PAWN` / `KNIGHT` / `BISHOP` / `ROOK` / `QUEEN` / `KING` — 棋子类型常量
- `PIECE_VALUES` — 棋子基础分值（兵 100、马 320、象 330、车 500、后 900、王 20000）
- `PST` — 棋子位置表（Piece-Square Table），按位置给棋子加减分，用于 AI 评估
- `INITIAL_FEN` — 标准开局 FEN 字符串

### 5. 游戏状态变量

行 78–95。全局状态变量，包括当前棋盘局面 `gameState`、选中的格子 `selectedSquare`、合法走法列表、最后一步走法、当前模式、AI 思考标志、升变待处理走法、闯关进度等。

### 6. FEN 解析 (`parseFEN`)

行 100–128。将 FEN 字符串解析为内部棋盘状态对象，包含：8×8 二维数组、当前走子方、王车易位权限、过路兵目标格、半回合数、整回合数。

辅助函数：
- `squareToRC(sq)` — 代数坐标（如 "e4"）转行列索引
- `rcToSquare(r, c)` — 行列索引转代数坐标
- `inBounds(r, c)` — 判断坐标是否在棋盘内
- `cloneState(state)` — 深拷贝游戏状态

### 7. 攻击与将军检测

行 132–170：

- `isSquareAttacked(state, r, c, byColor)` — 检查某格是否被指定颜色攻击。遍历 8 个方向（直线/斜线）检测后、车、象、王、兵的攻击，以及马的 L 形攻击。
- `findKing(state, color)` — 查找指定颜色的王的位置。
- `isInCheck(state, color)` — 判断指定颜色是否被将军。

### 8. 走法生成

行 172–270：

- `getPseudoLegalMoves(state, r, c)` — 生成某棋子的所有伪合法走法（不考虑走后是否让己方被将军）。处理兵（前进、双步前进、斜吃、过路兵、升变）、马、象、车、后（滑动走法）、王（含王车易位）。
- `getLegalMoves(state, r, c)` — 过滤伪合法走法，留下真正合法的走法（走后己方王不被将军）。
- `applyMove(state, move)` — 在给定局面应用一步走法，返回新局面（深拷贝）。
- `makeMove(move)` — 在当前游戏状态中执行走法。
- `getAllLegalMoves(state, color)` — 获取某方所有合法走法。
- `getGameStatus(state)` — 判断游戏状态：正常 / 被将军 / 将杀 / 逼和 / 三次重复 / 五十步规则。
- `moveToAlgebraic(move, piece)` — 将内部走法转为代数记谱法（如 "Nf3"、"exd5"、"O-O"）。

### 9. AI 引擎

行 279–306：

- `evaluateSimple(state)` — 简单评估：纯棋子分值累加。
- `evaluate(state, usePST)` — 带位置表的评估，可选是否使用 PST 表。
- `minimax(state, depth, alpha, beta, maximizing, usePST)` — 极小化极大搜索（带 Alpha-Beta 剪枝），支持不同深度。
- `getAIMove()` — AI 走法入口。初学者 1 层、新手 2 层、普通 3 层、困难 4 层搜索深度。

### 10. 闯关逻辑

行 308–427：

- `loadPuzzle(idx)` — 加载指定索引的闯关题，初始化棋盘和走法序列。
- `updatePuzzleProgress()` — 更新闯关进度显示。
- `validatePuzzleMove(move)` — 验证玩家走法是否匹配当前步的正确答案。
- `onPuzzleCorrect()` — 答对处理：播放音效、显示动画、推进下一步或通关。
- `onPuzzleWrong()` — 答错处理：播放失败音效、棋盘抖动、重置当前题。
- `showPuzzleHint()` — 显示当前题的提示。
- `prevPuzzle()` / `nextPuzzle()` — 闯关翻页。
- `showSimpleConfetti()` — 通关撒花特效。

### 11. 悬停提示

行 429–450：

- `analyzeMove(move)` — 分析走法并返回文字描述（如"吃后 / 将军"、"将死！"、"王车易位"等）。
- `showHoverHint(move, event)` — 在鼠标位置显示走法分析气泡。
- `hideHoverHint()` — 隐藏气泡。

### 12. 动画辅助

行 452–462：

- `getSquareElement(r, c)` — 通过 data 属性获取棋盘格子 DOM 元素。
- `animateMove(move, callback)` — 走子动画：棋子从起点平滑移动到终点。

### 13. 胜利特效

行 464–474：

- `showVictoryEffects(winner)` — 在特效层生成烟花粒子动画（随机颜色、位置、速度）。
- `dismissVictory()` — 关闭特效并开始新游戏。

### 14. UI 渲染

行 483–539：

- `renderBoard()` — 核心渲染函数。遍历 8×8 生成所有格子，设置深浅色、棋子 SVG、选中/最后走法/将军/合法走法标记。
- `updateMoveHistory()` — 更新侧边栏走棋记录，每行显示回合号和双方走法。
- `updateStatus()` — 更新游戏状态消息（将军 / 将杀 / 逼和 等）。

### 15. 升变弹窗

行 541–610：

- `renderPromotionDialog(color)` — 显示升变选择弹窗，根据颜色显示对应的后/车/象/马。
- `completePromotion(type)` — 完成升变并继续游戏。
- `handlePuzzlePromotion(move, type)` / `onPuzzleCorrectAfterPromotion()` — 闯关模式下的升变处理。

### 16. 交互处理

行 612–734：

- `onSquareClick(r, c)` — 格子点击事件分发：选择棋子 / 移动棋子 / 取消选择。
- `selectPiece(r, c)` — 选中棋子，计算合法走法并重新渲染。
- `clearSelection()` — 清除选中状态。
- `executeMove(move)` — 执行走法的主流程：动画、音效、更新状态、检查游戏结束。
- `doMove(move)` — 实际执行走法（更新棋盘状态、走棋记录）。
- `checkPostMove()` — 走子后的后续检查（游戏是否结束、AI 是否应走棋）。
- `onPuzzleComplete()` — 闯关通关处理。
- `triggerAI()` — 触发 AI 思考并走棋（使用 `setTimeout` 让 UI 先更新）。

### 17. 控制函数

行 736–789：

- `setMode(m)` — 切换游戏模式（双人/人机/闯关），显示/隐藏对应 UI。
- `setPlayerColor(c)` — 设置玩家执白还是执黑。
- `setDifficulty(val)` — 设置 AI 难度。
- `undoMove()` — 悔棋（从走棋记录中回退两步）。
- `newGame()` — 开始新游戏，重置所有状态并重新渲染。

### 18. 响应式棋盘 & 初始化

行 791–811：

- `resizeBoard()` — 根据窗口宽度动态调整 `--board-size` CSS 变量，使棋盘在移动端也能完整显示。
- `initGame()` — 游戏入口函数：设置 `resizeBoard` 的窗口监听器，加载初始 FEN 局面，渲染棋盘。

---

## 运行方式

用任意浏览器打开 `index.html` 即可。

```
单机国际象棋/
├── index.html    # 页面结构与 HTML
├── style.css     # 全局样式表
├── chess.js      # 游戏引擎 + AI + 闯关逻辑
└── README.md     # 本文档
```

## 数据流

```
用户点击格子
  → onSquareClick() 判断（选择 / 移动 / 取消）
  → executeMove() 执行走法
    → animateMove() 播放动画
    → playMoveSounds() 播放音效
    → makeMove() 更新 gameState
    → renderBoard() 重新渲染
    → updateMoveHistory() / updateStatus() 更新 UI
    → checkPostMove() 检查游戏结束 / 触发 AI
```

## 游戏模式

| 模式 | 说明 |
|---|---|
| 双人（PVP） | 两人在同一设备上轮流走棋。 |
| 人机（PVE） | 玩家对 AI，可选执白或执黑，支持 4 个难度级别。 |
| 闯关（Puzzle） | 内置残局/战术题库，玩家需走出正确走法序列过关。 |

---

*最后更新：2026-06-07*
