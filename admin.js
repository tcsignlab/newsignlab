/************************************
 BASIC ADMIN PANEL ENGINE
************************************/

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================
     SHOW PANEL (NO LOGIN)
  ========================== */

  document.getElementById("adminLogin")?.remove();
  document.getElementById("adminPanel").style.display = "block";

  /* ==========================
     TAB SWITCHING
  ========================== */

  const tabs = document.querySelectorAll(".admin-tab");
  const contents = document.querySelectorAll(".admin-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {

      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.style.display = "none");

      tab.classList.add("active");
      document.getElementById(tab.dataset.tab + "Tab").style.display = "block";

    });
  });

  /* ==========================
     LOAD SAMPLE PRODUCTS
  ========================== */

  const tableBody = document.getElementById("productsTableBody");

  if (typeof SAMPLE_PRODUCTS !== "undefined") {
    renderProducts(SAMPLE_PRODUCTS);
  }

  function renderProducts(products) {
    tableBody.innerHTML = "";

    products.forEach(p => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.id}</td>
        <td><img src="${p.image}" width="60"></td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.description}</td>
        <td>${p.status}</td>
        <td>
          <button>Edit</button>
          <button>Delete</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  /* ==========================
     GOOGLE SHEETS SYNC
  ========================== */

  document.getElementById("syncSheetsBtn")
    .addEventListener("click", async () => {

      if (!CONFIG.sheetsId || !CONFIG.apiKey) {
        alert("Enter Sheets ID and API Key in config.js first.");
        return;
      }

      const url =
        `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.sheetsId}/values/Products?key=${CONFIG.apiKey}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (!data.values) {
          alert("Sheet empty or inaccessible");
          return;
        }

        const rows = data.values.slice(1);

        const products = rows.map(r => ({
          id: r[0],
          name: r[1],
          category: r[2],
          description: r[3],
          image: r[4],
          status: r[5]
        }));
