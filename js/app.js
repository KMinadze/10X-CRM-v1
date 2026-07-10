window.addEventListener("DOMContentLoaded", () => {
  const currentSession = localStorage.getItem("crm_session");
  if (currentSession) {
    window.location.href = "dashboard.html";
  }
});

// ფორმის გაგზავნის ლოგიკა
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");

  const emailValue = emailInput.value.trim().toLowerCase();
  const passwordValue = passwordInput.value;

  // შეცდომების გასუფთავება
  clearLoginErrors();

  let hasErrors = false;

  if (emailValue === "") {
    showLoginError("loginEmailError", "Email is required");
    hasErrors = true;
  }

  if (passwordValue === "") {
    showLoginError("loginPasswordError", "Password is required");
    hasErrors = true;
  }

  if (hasErrors) return;

  const crmUsers = JSON.parse(localStorage.getItem("crm_users")) || [];

  const foundUser = crmUsers.find(
    (user) => user.email.toLowerCase() === emailValue,
  );

  // შემოწმება: არსებობს თუ არა იუზერი და ემთხვევა თუ არა პაროლი
  if (!foundUser || foundUser.password !== passwordValue) {
    const generalErrorDiv = document.getElementById("generalError");
    generalErrorDiv.innerText = "Invalid email or password";
    generalErrorDiv.style.display = "block";
    return;
  }

  // 1. იქმნება Session ობიექტი და იწერება crm_session-ში
  const sessionData = {
    userId: foundUser.id,
    email: foundUser.email,
    loggedInAt: new Date().toISOString(),
  };
  localStorage.setItem("crm_session", JSON.stringify(sessionData));

  window.location.href = "dashboard.html";
});

// დამხმარე ფუნქციები შეცდომებისთვის
function showLoginError(elementId, text) {
  const errDiv = document.getElementById(elementId);
  errDiv.innerText = text;
  errDiv.style.display = "block";
}

function clearLoginErrors() {
  const errors = document.querySelectorAll(".error-message");
  errors.forEach((err) => {
    err.innerText = "";
    err.style.display = "none";
  });
  document.getElementById("generalError").style.display = "none";
}
