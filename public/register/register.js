document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const alertBox = document.getElementById("alertBox");
  alertBox.className = "alert info";
  alertBox.textContent = "Creating account...";
  alertBox.style.display = "block";

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alertBox.className = "alert success";
      alertBox.textContent = "Account created! You can now log in.";
      setTimeout(() => {
        window.location.href = "../login/login.html";
      }, 1500);
    } else {
      alertBox.className = "alert error";
      alertBox.textContent = data.message || "Registration failed.";
    }
  } catch (err) {
    alertBox.className = "alert error";
    alertBox.textContent = "Error creating account.";
  }
});
