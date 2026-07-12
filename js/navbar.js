// P0.2 - გლობალური ნავიგაციის დინამიური ჩატვირთვა
// ==========================================
function renderGlobalNavbar() {
  const navbarContainer = document.getElementById("global-navbar");
  if (!navbarContainer) return; // თუ გვერდზე ეს კონტეინერი არ არის, კოდი არ გაეშვება (მაგ. ლოგინზე)

  const path = window.location.pathname.toLowerCase();

  // განვსაზღვროთ აქტიური კლასი
  const isDashboard = path.includes("dashboard.html") ? "active" : "";
  const isClients = path.includes("clients.html") ? "active" : "";
  const isProfile = path.includes("profile.html") ? "active" : "";

  // ჩავწეროთ ერთიანი HTML სტრუქტურა
  navbarContainer.innerHTML = `
    <nav class="navbar">
        <a href="dashboard.html" class="nav-logo">10X CRM</a>
        <div class="nav-links">
            <a href="dashboard.html" class="${isDashboard}">Dashboard</a>
            <a href="clients.html" class="${isClients}">Clients</a>
            <a href="profile.html" class="${isProfile}">Profile</a>
            <button id="themeToggle" style="background: none; border: 1px solid #fff; color: white; padding: 4px 10px; border-radius: 6px; cursor: pointer; margin-left: 10px;">Theme 🌓</button>
        </div>
        <button class="btn-logout" id="globalLogoutBtn">Logout</button>
    </nav>
  `;

  // იქვე მივაბათ Logout-ის ფუნქციონალიც
  document.getElementById("globalLogoutBtn").addEventListener("click", () => {
    localStorage.removeItem("crm_session");
    window.location.href = "index.html";
  });
}

// ჩავსვათ DOMContentLoaded-ში, რომ სხვა ფუნქციებთან ერთად ეგრევე გაეშვას
window.addEventListener("DOMContentLoaded", () => {
  renderGlobalNavbar(); // <--- აი ეს ჩაემატა
});
