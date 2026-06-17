# 名片系統 API 文件

> 文件狀態：規劃階段，JSON 資料格式已設計完成。  
> 實際後端端點與驗證機制尚未提供，待確認後再補充。  
> 所有 API 皆以 `POST` 呼叫，請求與回應 JSON 深度皆不超過兩層。

---

## 1. 基礎資訊

| 項目 | 規格 |
|------|------|
| 傳輸協定 | HTTP/HTTPS |
| 請求方法 | `POST` |
| 內容類型 | `application/json` |
| 資料格式 | JSON，最多兩層結構 |
| 範例端點（讀取） | `POST /api/card/read` |
| 範例端點（更新） | `POST /api/card/update` |

---

## 2. 通用資料結構

### 2.1 請求通用結構

```json
{
  "action": "read | update",
  // 視動作帶入對應欄位，詳見下方各節
}
```

| 欄位 | 型別 | 說明 | 必填 |
|------|------|------|------|
| `action` | string | 動作參數，區分讀取或更新 | 是 |

### 2.2 回應通用結構

```json
{
  "status": "success | error",
  "message": "操作結果說明",
  "data": { }
}
```

| 欄位 | 型別 | 說明 | 必填 |
|------|------|------|------|
| `status` | string | 操作狀態：`success` 或 `error` | 是 |
| `message` | string | 結果訊息，供顯示或除錯使用 | 是 |
| `data` | object | 返回資料或空的資料物件 | 是 |

---

## 3. 讀取名片資料

### 3.1 請求格式

```json
{
  "action": "read"
}
```

### 3.2 成功回應範例

```json
{
  "status": "success",
  "message": "名片資料讀取成功",
  "data": {
    "name": "王大衛",
    "company": "晨光音樂工作室",
    "jobTitle": "音樂製作人",
    "phone": "02-2345-6789",
    "email": " david@morninglight.tw",
    "lineId": "morning_david",
    "services": [
      "流行音樂製作",
      "配樂編曲",
      "錄音混音",
      "母帶後製"
    ],
    "taxId": "12345678",
    "fax": "02-2345-6790"
  }
}
```

### 3.3 失敗回應範例

```json
{
  "status": "error",
  "message": "無法讀取名片資料，請稍後再試",
  "data": {}
}
```

---

## 4. 更新名片資料

### 4.1 請求格式

```json
{
  "action": "update",
  "name": "王大衛",
  "company": "晨光音樂工作室",
  "jobTitle": "音樂製作人",
  "phone": "02-2345-6789",
  "email": "david@morninglight.tw",
  "lineId": "morning_david",
  "services": [
    "流行音樂製作",
    "配樂編曲",
    "錄音混音",
    "母帶後製"
  ],
  "taxId": "12345678",
  "fax": "02-2345-6790"
}
```

### 4.2 成功回應範例

```json
{
  "status": "success",
  "message": "名片資料更新成功",
  "data": {}
}
```

### 4.3 失敗回應範例

```json
{
  "status": "error",
  "message": "更新失敗，請檢查欄位格式是否正確",
  "data": {}
}
```

---

## 5. 欄位對照表

| 欄位名稱 | 型別 | 說明 | 必填 / 可選 | 備註 |
|----------|------|------|-------------|------|
| `action` | string | 動作參數：`read` 或 `update` | 必填 | 用於區分讀取或更新 |
| `name` | string | 姓名 | 必填 | 名片上的個人名稱 |
| `company` | string | 服務單位 / 公司名稱 | 必填 | 音樂工作室或公司名 |
| `jobTitle` | string | 職稱 | 必填 | 例如：音樂製作人 |
| `phone` | string | 連絡電話 | 必填 | 建議包含區碼與分機格式 |
| `email` | string | 電子信箱 | 必填 | 需符合 email 格式 |
| `lineId` | string | Line ID | 可選 | 用於即時通訊聯繫 |
| `services` | array | 服務項目 | 可選 | 字串陣列，列出提供的音樂服務 |
| `taxId` | string | 公司統編 | 可選 | 台灣公司統一編號 |
| `fax` | string | 傳真號碼 | 可選 | 有傳真服務時填寫 |

---

## 6. 動作參數說明

| 動作參數 | 說明 | 對應端點範例 |
|----------|------|--------------|
| `read` | 從伺服器取得目前最新的名片資料 | `POST /api/card/read` |
| `update` | 將編輯後的名片資料送出並儲存 | `POST /api/card/update` |

---

## 7. HTTP 狀態碼參考

| HTTP 狀態碼 | 說明 |
|-------------|------|
| `200` | 請求成功，請務必再檢查回應 JSON 內的 `status` |
| `400` | 請求格式錯誤或缺少必填欄位 |
| `401` | 未授權，可能需要登入驗證 |
| `500` | 伺服器內部錯誤 |

---

## 8. 注意事項

1. 所有 JSON 深度不超過兩層，前端可直接以扁平方式解析。  
2. `services` 為字串陣列，若無項目可傳入空陣列 `[]`。  
3. 實際端點、驗證方式與錯誤訊息欄位名稱，待後端 API 提供後再更新本文件。  
4. 前端呼叫 API 時，應優先根據回應 JSON 的 `status` 與 `message` 判斷結果，再決定畫面呈現。
