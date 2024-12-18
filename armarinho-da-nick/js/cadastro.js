const nome = document.querySelector('#name');
const descricao = document.querySelector('#descricao')
const email = document.querySelector('#email');
const senha = document.querySelector('#password');
const confirmSenha = document.querySelector('#confirm-password');
const imgProfile = document.querySelector("#img-profile");
const btn = document.querySelector('.register-btn');
const msg = document.querySelector('#msg');

// Carregar usuários armazenados no localStorage
const ls = localStorage.getItem('users');
let users = ls ? JSON.parse(ls) : [];

// Carregar dados temporários do sessionStorage (auto-save)
let autoSave = sessionStorage.getItem('auto-save');
if (autoSave) {
    autoSave = JSON.parse(autoSave);
    nome.value = autoSave.nome || "";
    descricao.value = autoSave.descricao || "";
    email.value = autoSave.email || "";
    senha.value = autoSave.senha || "";
}

// Variável para armazenar a imagem carregada
let imagemCarregada = "";

// Função para salvar a imagem de perfil na memória
imgProfile.addEventListener('change', () => {
    const file = imgProfile.files[0]; // Captura o primeiro arquivo selecionado

    // Verifique se um arquivo foi carregado
    if (!file) {
        displayMessage("Nenhuma imagem selecionada!", "error");
        return;
    }

    // Apenas permite arquivos do tipo imagem
    if (!file.type.startsWith("image/")) {
        displayMessage("Por favor, selecione um arquivo de imagem válido!", "error");
        return;
    }

    const reader = new FileReader();

    // Converte o arquivo para Base64 e armazena
    reader.onload = () => {
        imagemCarregada = reader.result; // Salva a imagem carregada na variável
        displayMessage("Imagem carregada com sucesso!", "success");
    };

    reader.onerror = () => {
        displayMessage("Erro ao carregar a imagem! Tente novamente.", "error");
        imagemCarregada = ""; // Reseta a variável em caso de falha
    };

    reader.readAsDataURL(file); // Converte o arquivo em Base64
});


// Função para salvar os dados do formulário no localStorage
btn.addEventListener('click', (e) => {
    e.preventDefault();

    // Validação de campos
    if (!nome.value || !email.value || !senha.value || !confirmSenha.value) {
        displayMessage("Os campos: nome, emai e senha são obrigatórios!", "error");
        return;
    }

    if (senha.value !== confirmSenha.value) {
        displayMessage("As senhas não coincidem!", "error");
        return;
    }

    // Verificar se o e-mail já está cadastrado
    if (users.some((u) => u.email === email.value)) {
        displayMessage("E-mail já cadastrado!", "error");
        return;
    }

    // Verificar se a imagem foi carregada corretamente
    if (!imagemCarregada) {
        displayMessage("Por favor, carregue uma imagem de perfil!", "error");
        return;
    }

    // Criar objeto do usuário
    const user = {
        nome: nome.value,
        descricao: descricao.value,
        email: email.value,
        senha: senha.value,
        foto: imagemCarregada, // Salva a imagem carregada no objeto
        cart: [],
    };

    //console.log(user);
    // Salvar no localStorage
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    displayMessage("Cadastro realizado com sucesso!", "success");
    resetForm();
});

// Salva os dados do formulário no sessionStorage enquanto o usuário digita
[nome, descricao, email, senha].forEach((input) => {
    input.addEventListener('input', save);
});

function save() {
    const user = {
        nome: nome.value,
        descricao: descricao.value,
        email: email.value,
        senha: senha.value,
        cart: [],
    };
    sessionStorage.setItem('auto-save', JSON.stringify(user));
}

function resetForm() {
    nome.value = "";
    descricao.value = "";
    email.value = "";
    senha.value = "";
    confirmSenha.value = "";
    imgProfile.value = "";
    imagemCarregada = ""; // Limpa a variável da imagem
    sessionStorage.removeItem('auto-save');
}

function displayMessage(message, type) {
    msg.textContent = message;
    msg.className = type;
    setTimeout(() => {
        msg.textContent = "";
        msg.className = "";
    }, 3000);
}
//localStorage.clear()