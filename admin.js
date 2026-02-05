/*********************************
 SIMPLE ADMIN ACCESS (NO LOGIN)
**********************************/

document.addEventListener("DOMContentLoaded", () => {

  const loginBox = document.getElementById("adminLogin");
  const panel = document.getElementById("adminPanel");

  // Always show admin panel
  if (loginBox) loginBox.style.display = "none";
  if (panel) panel.style.display = "block";

});
