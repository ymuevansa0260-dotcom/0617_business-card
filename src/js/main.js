/**
 * 名片系統 - 單人名片完成品腳本
 * 功能：定義範本資料、渲染名片內容、預備 API 格式工具
 * 說明：本頁面為給訪客觀看的靜態名片範例，目前不會呼叫任何 API。
 */

// ============================================================
// 1. 名片範本資料
// 用途：頁面第一次載入時顯示的個人名片內容。
// 欄位對應 docs/api.md 的欄位對照表
// ============================================================
const businessCardData = {
  name: "王大衛",
  company: "晨光音樂工作室",
  jobTitle: "音樂製作人",
  phone: "02-2345-6789",
  email: "david@morninglight.tw",
  lineId: "morning_david",
  services: [
    "流行音樂製作",
    "配樂編曲",
    "錄音混音",
    "母帶後製"
  ],
  taxId: "12345678",
  fax: "02-2345-6790"
};

/**
 * 建立帶有文字內容的 DOM 元素
 * 使用方法：createTextElement("li", "service-tag", "流行音樂製作");
 * 回傳：建立完成的 DOM 元素（尚未插入頁面）
 */
function createTextElement(tagName, className, textContent) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = textContent;
  return element;
}

/**
 * 渲染單一文字欄位到對應 DOM 元素
 * 使用方法：renderTextField("personName", businessCardData.name);
 */
function renderTextField(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = value || "";
  }
}

/**
 * 渲染聯絡資訊清單
 * 根據名片資料中的聯絡欄位，動態產生成對的 label / value。
 * 使用方法：renderContactList("contactList", businessCardData);
 */
function renderContactList(listElementId, data) {
  const listElement = document.getElementById(listElementId);
  if (!listElement) return;

  // 定義聯絡欄位與對應英文標籤
  const contacts = [
    { key: "phone", label: "TEL" },
    { key: "email", label: "EMAIL" },
    { key: "lineId", label: "LINE" },
    { key: "taxId", label: "TAX ID" },
    { key: "fax", label: "FAX" }
  ];

  listElement.innerHTML = "";

  contacts.forEach((contact) => {
    const value = data[contact.key];
    if (!value) return;

    const item = document.createElement("li");
    item.className = "contact-item";

    const labelSpan = createTextElement("span", "contact-label", contact.label);
    const valueSpan = createTextElement("span", "contact-value", value);

    item.appendChild(labelSpan);
    item.appendChild(valueSpan);
    listElement.appendChild(item);
  });
}

/**
 * 渲染服務項目標籤
 * 使用方法：renderServices("servicesList", businessCardData.services);
 */
function renderServices(listElementId, services) {
  const listElement = document.getElementById(listElementId);
  if (!listElement) return;

  listElement.innerHTML = "";

  if (!Array.isArray(services) || services.length === 0) return;

  services.forEach((serviceName) => {
    const tag = createTextElement("li", "service-tag", serviceName);
    listElement.appendChild(tag);
  });
}

/**
 * 整張名片渲染函式
 * 使用方法：renderCard(businessCardData);
 */
function renderCard(data) {
  if (!data) return;

  renderTextField("companyName", data.company);
  renderTextField("personName", data.name);
  renderTextField("jobTitle", data.jobTitle);
  renderContactList("contactList", data);
  renderServices("servicesList", data.services);
}

/**
 * 根據名片資料產生 API 請求 JSON
 * 使用方法：const payload = prepareApiPayload(businessCardData, "update");
 * 回傳：符合 docs/api.md 規範的 JSON 物件
 */
function prepareApiPayload(data, action) {
  if (!data || !action) return null;

  return {
    action: action,
    name: data.name,
    company: data.company,
    jobTitle: data.jobTitle,
    phone: data.phone,
    email: data.email,
    lineId: data.lineId,
    services: Array.isArray(data.services) ? data.services : [],
    taxId: data.taxId,
    fax: data.fax
  };
}

// ============================================================
// 頁面載入完成後，執行名片渲染
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderCard(businessCardData);
});
