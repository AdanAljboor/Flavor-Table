window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    const alertBox = document.getElementById("alertBox");
    const protectedContent = document.getElementById("protectedContent");

    if (alertBox) {
      alertBox.className = "alert warning";
      alertBox.textContent = "You must be logged in to access this page.";
      alertBox.style.display = "block";
    }

    if (protectedContent) {
      protectedContent.style.display = "none";
    }
  }
});
