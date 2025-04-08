let logged = false;

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username == 'admin' && password == 'admin') {
        logged = true;
        document.getElementById('status').textContent = 'Login bem-sucedido!';
        console.log('Usuário logado:', logged);

        setTimeout(() => {
            window.location.href = 'add_products.html';
        }, 1500); // redireciona após 1.5 segundos
    } else {
        document.getElementById('status').textContent =
            'Preencha todos os campos.';
        logged = false;
    }
}
