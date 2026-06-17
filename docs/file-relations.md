# 檔案關係說明

這份文件說明目前專案內各檔案的用途與彼此之間的關係。

## 專案根目錄

```
0617_business-card/
├── .gitattributes       ← Git 換行與編碼設定（既有檔案）
├── README.md            ← 專案簡介（既有檔案）
├── PRODUCT.md           ← 產品策略文件：定位、用戶、品牌個性、設計原則
└── docs/
    ├── api.md           ← API 規格文件，描述 read / update 的 JSON 格式
    ├── design.md        ← 視覺設計文件，包含色盤、字型、布局、元件規範
    ├── dev-log.md       ← 開發日誌，記錄進度與決策
    └── file-relations.md ← 本文件

src/（目前僅在建立 UI 時使用）
├── index.html           ← 名片頁面結構
├── css/
│   └── style.css        ← 名片樣式（實作 design.md 的設計系統）
└── js/
    └── main.js           ← 名片資料渲染與輔助函式
```

## 文件間的關係

| 檔案 | 被誰參考 / 影響誰 | 說明 |
|------|------------------|------|
| `PRODUCT.md` | 影響 `docs/design.md` 與未來所有 UI 決策 | 先確定品牌定位與原則，設計文件才在此基礎上展開 |
| `docs/design.md` | 指導 `src/css/style.css` 與 `src/index.html` | 樣式與結構需遵循設計文件中的色盤、字型與布局 |
| `docs/api.md` | 影響 `src/js/main.js` | JS 中 `prepareApiPayload()` 與未來 `fetchCard()` 的資料格式需符合 API 文件 |
| `src/js/main.js` | 被 `src/index.html` 載入 | HTML 最下方透過 `<script>` 引用主腳本 |
| `src/css/style.css` | 被 `src/index.html` 載入 | HTML 在 `<head>` 透過 `<link>` 引用樣式 |
| `docs/dev-log.md` | 記錄所有檔案變更 | 開發過程的時間軸與決策備忘 |

## 資料流（Data Flow）

```
名片資料
   │
   ▼
src/js/main.js 中的 businessCardData（範本資料）
   │
   ├── renderCard() ─────────► 更新 src/index.html 中的文字與清單
   │
   └── prepareApiPayload() ──► 產生符合 docs/api.md 的 JSON（未來已串接時使用）
```

## 備註

- `docs/` 內為規劃與說明文件；`src/` 內為實際運行的網頁程式碼。
- 目前 `src/` 僅包含展示用名片頁面，不會主動呼叫 API。
- 以後若要新增後台表單，建議新增獨立資料夾（例如 `admin/`），並共用 `src/js/main.js` 或抽出共用模組，避免重複撰寫。
