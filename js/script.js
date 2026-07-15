function attachPasswordToggleListeners() {
  const toggleButtons = document.querySelectorAll(".toggle-password");
  toggleButtons.forEach((button) => button.addEventListener("click", togglePasswordVisibility));
}

function validateConfirmPasswordMatch() {
  const password = document.getElementById("registerPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  if (!password || !confirmPassword) return;

  if (confirmPassword.value !== password.value) {
    confirmPassword.setCustomValidity("Mật khẩu xác nhận không trùng khớp.");
  } else {
    confirmPassword.setCustomValidity("");
  }
}

function togglePasswordVisibility(event) {
  const button = event.currentTarget;
  const input = document.getElementById(button.dataset.target);
  if (!input) return;
  
  const icon = button.querySelector("i");
  const isHidden = input.type === "password";

  input.type = isHidden ? "text" : "password";
  icon.classList.toggle("bi-eye", !isHidden);
  icon.classList.toggle("bi-eye-slash", isHidden);
}

// đăng nhập
function handleLoginFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const alertBox = document.getElementById("loginAlert");
  if (!alertBox) return;

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    alertBox.classList.add("d-none");
    return;
  }

  form.classList.add("was-validated");
  alertBox.textContent = "Đăng nhập thành công! (demo)";
  alertBox.classList.remove("d-none");
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 800);
}

// dang ky
function handleRegisterFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const alertBox = document.getElementById("registerAlert");
  if (!alertBox) return;

  validateConfirmPasswordMatch();

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    alertBox.classList.add("d-none");
    return;
  }
  form.classList.add("was-validated");
  alertBox.textContent = "Đăng ký thành công! (demo)";
  alertBox.classList.remove("d-none");
  setTimeout(() => {
    window.location.href = "./login.html";
  }, 800);
}

// event cho dang nhap
function initLoginPage() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;
  loginForm.addEventListener("submit", handleLoginFormSubmit);
}

// đoán xem
function initRegisterPage() {
  const registerForm = document.getElementById("registerForm");
  if (!registerForm) return;

  registerForm.addEventListener("submit", handleRegisterFormSubmit);

  const passwordInput = document.getElementById("registerPassword");
  const confirmInput = document.getElementById("confirmPassword");
  
  // Chỉ giữ lại sự kiện check khớp mật khẩu
  if (passwordInput) {
    passwordInput.addEventListener("input", validateConfirmPasswordMatch);
  }
  if (confirmInput) {
    confirmInput.addEventListener("input", validateConfirmPasswordMatch);
  }
}

function initAuthPage() {
  attachPasswordToggleListeners();
  initLoginPage();
  initRegisterPage();
}

document.addEventListener("DOMContentLoaded", initAuthPage);