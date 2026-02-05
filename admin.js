/*********************************
 ADMIN LOGIN SYSTEM
**********************************/

document.addEventListener("DOMContentLoaded", () => {

  const loginBox = document.getElementById("adminLogin");
  const panel = document.getElementById("adminPanel");
  const form = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("adminLogoutBtn");

  function showPanel() {
    loginBox.style.display = "none";
    panel.style.display = "block";
  }

  function showLogin() {
    panel.style.display = "none";
    loginBox.style.display = "flex";
  }

  if (CONFIG_HELPERS.isAdminAuthenticated()) {
    showPanel();
  } else {
    showLogin();
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const pass = document.getElementById("adminPassword").value;
    const hash = await CONFIG_HELPERS.md5(pass);

    if (hash === CONFIG.adminPasswordHash) {
      CONFIG_HELPERS.setAdminAuth("true");
      showPanel();
    } else {
      alert("Wrong password");
    }
  });

  logoutBtn.addEventListener("click", () => {
    CONFIG_HELPERS.setAdminAuth("false");
    location.reload();
  });

});
