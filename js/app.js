window.addEventListener("DOMContentLoaded", () => {
  const currentSession = localStorage.getItem("crm_session");
  if (currentSession) {
    window.location.href = "dashboard.html";
  }
});
