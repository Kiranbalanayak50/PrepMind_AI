async function signup() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    alert(data.message || data.error);
}


async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert("Success! Redirecting...");
        window.location.href = "dashboard.html"; 
    } else {
        alert(data.error);
    }
}