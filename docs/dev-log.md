# 開發日誌（Dev Log）

## 2026-06-17

### 今日完成

1. **專案初始化**
   - 確認專案目錄：`C:\Users\User20240117\Desktop\菜鳥救星-AI 網頁開發全攻略_從零基礎到網站上架\20260617_business card practice\0617_business-card`
   - 保留README.md、.gitattributes 與 docs/ 目錄。

2. **API 規格文件**
   - 建立 `docs/api.md`。
   - 定義 POST `/api/card/read` 與 POST `/api/card/update` 的 JSON 格式。
   - 所有 JSON 深度不超過兩層。
   - 包含欄位對照表、`status`/`message`/`data` 回應結構與 HTTP 狀態碼參考。

3. **名片 UI 範本（第一版）**
   - 建立 `src/index.html`、`src/css/style.css`、`src/js/main.js`。
   - 原生 HTML/CSS/JS，檔案分離。
   - 簡約日式無印風格，內容以音樂製作人為範例。
   - 可重複使用的 JS 函式：`renderCard`、`renderContactList`、`renderServices`、`renderTextField`、`createTextElement`、`prepareApiPayload`。
   - 不主動呼叫 API，僅預留 `prepareApiPayload` 供未來串接。

4. **一度刪除 UI**
   - 根據需求刪除 `src/` 下 HTML/CSS/JS，重新建立給別人觀看的名片完成品範本。

5. **產品與設計脈絡文件**
   - 建立 `PRODUCT.md`：定位為 brand register，使用者、目的、品牌個性、反參考、設計原則、可及性。
   - 建立 `docs/design.md`：Google Stitch 格式，視覺摘要、OKLCH 色盤、字型、布局、元件、動畫、響應式規則。
   - 建立 `docs/dev-log.md`（本文件）。
   - 建立 `docs/file-relations.md`：說明各檔案關係。

### 當日後續調整

- 執行 `npx impeccable skills update`：回報「No impeccable skill folders found in this project」，需要改跑 `npx impeccable install` 才能完整安裝。
- 調整 `src/css/style.css`：
  - 頁面背景改為純白（`--color-page: #ffffff`）。
  - 名片本體改為溫暖奶油色（`--color-paper: #f5f2eb`）。
  - 加入 SVG feTurbulence 噪點，以 `::before` 低透明度疊加，模擬紙張紋路質感。
  - 加深次要文字與標籤顏色，確保在奶油色背景上有足夠對比。
  - 加入輕微進場動畫與 `prefers-reduced-motion` 降級。
- 同步更新 `docs/design.md` 的 Current implementation notes。

### 設計決策

- 選擇品牌定位為 `brand`，因為這張名片頁面的存在本身就是為了傳達個人品牌印象，而不是操作工具或後台。
- 品牌個性確認為「安靜、溫暖、沉穩」。
- 配色以 moss green 為主色，搭配溫暖的 umber 強調色與紙張般的暖白表面。
- 使用 `Noto Sans TC` 作為單一字型家族，透過字重與字距建立層次，避免多種字型競爭。

### 待補 / 下一步

- API 端點與驗證方式尚未提供，`docs/api.md` 中的端點為範例路徑。
- 未來若需要後台表單，將在 `src/` 以外新增 admin 目錄，並複用 `renderCard` / `prepareApiPayload` 等現有函式。
- 若實際串接 API，需新增錯誤狀態 UI（例如讀取失敗提示）。
- 視覺細節可再透過實機截圖與對比檢查進行 polish。
