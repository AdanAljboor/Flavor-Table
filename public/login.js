const form = document.getElementById('loginForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    })
    .then(data => {
      setToken(data.token);
      alert('Login successful!');
      window.location.href = 'index.html';
    })
    .catch(error => {
      alert('Invalid username or password');
      console.error('Error:', error);
    });
});
