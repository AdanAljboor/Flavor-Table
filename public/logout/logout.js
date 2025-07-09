const alertBox = document.getElementById("alertBox");

localStorage.removeItem("token");
alertBox.textContent = "You have successfully logged out.";
alertBox.style.display = "block";
alertBox.style.color = "green";

setTimeout(() => {
  window.location.href = "../login/login.html";
}, 1500);
