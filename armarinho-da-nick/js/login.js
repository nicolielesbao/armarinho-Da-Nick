const email = document.querySelector('#email');
const senha = document.querySelector('#password');
const msg = document.querySelector('#msg');
const btn = document.querySelector('.login-btn');

// Recuperar os usuários do localStorage
const ls = localStorage.getItem('users');
const users = ls ? JSON.parse(ls) : [];

// Evento de clique no botão de login
btn.addEventListener('click', () => {
    const user = users.find(user => user.email === email.value && user.senha === senha.value);

    if (user) {
        // Apenas salva o email no sessionStorage
        sessionStorage.setItem('loggedUser', user.email);
        location.href = 'profile.html';  // Redireciona para a página de perfil
    } else {
        // Usuário não encontrado: exibe mensagem de erro
        displayMessage("Usuário não encontrado!", "error");
    }
});

function displayMessage(message, type) {
    msg.textContent = message;
    msg.className = type; // Adiciona a classe "success" ou "error" para estilos no CSS
    msg.style.display = 'block'; // Faz o elemento ser exibido
    setTimeout(() => {
        msg.textContent = "";
        msg.className = "";
        msg.style.display = 'none'; // Esconde novamente após 3 segundos
    }, 3000);
}
//localStorage.clear()