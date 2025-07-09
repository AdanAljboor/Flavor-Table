document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const alertBox = document.getElementById("alertBox");

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    alertBox.textContent = data.message;
    alertBox.style.display = "block";

    if (res.ok) {
      localStorage.setItem("token", data.token);
      alertBox.textContent = "Welcome back! Redirecting to homepage...";
      alertBox.style.color = "green";

      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1500);
    } else {
      alertBox.style.color = "red";
    }
  } catch (err) {
    alertBox.textContent = "An error occurred. Please try again later.";
    alertBox.style.color = "red";
    alertBox.style.display = "block";
  }
});
