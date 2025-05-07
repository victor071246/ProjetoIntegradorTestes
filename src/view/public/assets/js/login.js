const isLocalhost = ['localhost', '127.0.0.1'].includes(
    window.location.hostname
);

console.log(isLocalhost);

const api_url = isLocalhost
    ? 'http://localhost:3333'
    : 'https://projetointegradortestes.onrender.com/products';
console.log(api_url);

const form = document.querySelector('#loginForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const statusDiv = document.getElementById('status');

    if (!email || !password) {
        statusDiv.textContent = '⚠️ Preencha todos os campos.';
        statusDiv.style.color = 'orange';
        return;
    }

    const response = await fetch(`${api_url}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        const data = await response.json();

        // Login bem-sucedido → redireciona manualmente

        statusDiv.textContent = '✅ Login bem-sucedido!';
        // statusDiv.textContent = `✅ ${data.ok}`;
        statusDiv.style.color = 'green';
        window.location.href = 'http://localhost:3333/dashboard';
    } else {
        const data = await response.json();
        statusDiv.textContent = `❌ ${data.error}`;
        statusDiv.style.color = 'red';
    }
});
