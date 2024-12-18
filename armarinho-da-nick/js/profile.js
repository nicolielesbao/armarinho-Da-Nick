//logout
const logoutBtn = document.querySelector('#logout');

// Evento de clique no botão de logout
logoutBtn.addEventListener('click', (e) => {
    // Impede o comportamento padrão do link, caso precise de redirecionamento manual
    e.preventDefault();

    // Remove os dados do usuário logado do localStorage e sessionStorage
    localStorage.removeItem('logged-user');  // Limpa o usuário logado no localStorage
    sessionStorage.removeItem('loggedUser'); // Limpa a sessão

    // Redireciona para a página de login
    location.href = 'login.html';
});

//ASIDE: abrir menu de navegação do profile
document.querySelector('.btn-sidebar').addEventListener('click', ()=>{
    document.querySelector('.sidebar').style.display = 'block';
    document.querySelector('.btn-sidebar').style.display = 'none';
});

//fechar o aside
document.querySelector('.close-sidebar').addEventListener('click', ()=>{
    document.querySelector('.sidebar').style.display = 'none';
    document.querySelector('.btn-sidebar').style.display = 'block';
})

//ASIDE: foto de perfil e nome do user logado
const imgPerfil = document.querySelector('.perfil-img');

// Recupera o email do usuário logado do sessionStorage
const loggedUserEmail = sessionStorage.getItem('loggedUser');

// Recupera os dados de todos os usuários no localStorage
const users = JSON.parse(localStorage.getItem('users')) || [];

// Procura o usuário logado
const loggedUser = users.find((user) => user.email === loggedUserEmail);

if (loggedUser) {
  // Atualiza a imagem da `<aside>` dinamicamente
  imgPerfil.innerHTML = `<img src="${loggedUser.foto}" alt="Foto de Perfil">`;
  //atualiza o nome
  document.querySelector('#userName').innerHTML = `<h2>${loggedUser.nome}</h2>`;
  document.querySelector('#userDesc').innerHTML = `<p>${loggedUser.descricao}</p>`
} else {
  // Define uma imagem padrão caso nenhuma foto esteja disponível
  imgPerfil.innerHTML = `<img src="img/user.png" alt="Foto de Perfil Padrão">`;
}

// Captura de botões e seções
const editarPerfil = document.querySelector('#btn-edit-profile');
const btnCart = document.querySelector('#btn-cart');
const produtos = document.querySelector('#btn-newProdut');

// Mostrar formulário de edição de perfil
editarPerfil.addEventListener('click', () => {
  document.querySelector('#propaganda').style.display = 'none';  
  document.querySelector('#produtos').style.display = 'none';   
  document.querySelector('#carrinhoDeCompras').style.display = 'none';
  document.querySelector('#editarDados').style.display = 'block';  

  // Preenche os campos com os valores do usuário logado
  const loggedUserEmail = sessionStorage.getItem('loggedUser');  
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const loggedUser = users.find(user => user.email === loggedUserEmail);

  if (loggedUser) {
    document.querySelector('#editarDados').innerHTML = `
      <h2>Editar Perfil</h2>
      <form id="editProfileForm">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" value="${loggedUser.nome}" required>

        <label for="descricao">Descrição:</label>
        <textarea id="descricao">${loggedUser.descricao}</textarea>

        <label for="foto">Foto de Perfil (URL):</label>
        <input type="url" id="foto" value="${loggedUser.foto}" required>

        <button type="submit">Salvar Alterações</button>
      </form>
    `;

    // Salvar alterações do perfil
    document.querySelector('#editProfileForm').addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.querySelector('#nome').value;
      const descricao = document.querySelector('#descricao').value;
      const foto = document.querySelector('#foto').value;

      // Atualiza os dados
      loggedUser.nome = nome;
      loggedUser.descricao = descricao;
      loggedUser.foto = foto;

      // Atualiza no localStorage
      const updatedUsers = users.map(user => user.email === loggedUserEmail ? loggedUser : user);
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      alert('Perfil atualizado com sucesso!');
      location.href = 'profile.html';
    });
  }
});

// Mostrar carrinho de compras
btnCart.addEventListener('click', () => {
  document.querySelector('#propaganda').style.display = 'none';  
  document.querySelector('#produtos').style.display = 'none';   
  document.querySelector('#editarDados').style.display = 'none';
  document.querySelector('#carrinhoDeCompras').style.display = 'block';

  // Atualizar itens do carrinho
  atualizarCarrinho();
});

// Atualizar carrinho de compras
function atualizarCarrinho() {
  const loggedUserEmail = sessionStorage.getItem('loggedUser');
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const loggedUser = users.find(user => user.email === loggedUserEmail);

  const listaCarrinho = document.querySelector('#lista-carrinho');
  listaCarrinho.innerHTML = ''; // Limpa o carrinho antes de adicionar itens

  if (loggedUser && loggedUser.cart) {
    loggedUser.cart.forEach(produto => {
      document.querySelector('#lista-carrinho').innerHTML += `
      <li>
        <h3>${produto.nome}</h3>
        <p>Preço: R$ <span>${produto.preco}</span></p>
        <p>Quantidade: <span>${produto.qtd}</span></p>
        <div class="aline-btn">
          <button class="excluir" onclick="excluirItem('${produto.id}')">Remover</button>
        </div>
      </li>
       `;
      listaCarrinho.appendChild(li);
    });
  } else {
    listaCarrinho.innerHTML = '<li>Carrinho vazio!</li>';
  }
}

// Excluir ou reduzir item do carrinho
function excluirItem(idProduto) {
  const loggedUserEmail = sessionStorage.getItem('loggedUser');
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const loggedUser = users.find(user => user.email === loggedUserEmail);

  if (loggedUser) {
    // Busca o produto no carrinho pelo ID
    const produto = loggedUser.cart.find(produto => produto.nome === idProduto);
    
    document.querySelector('.excluir').addEventListener('click', ()=>{
      if (produto) {
        if (produto.qtd > 1) {
          // Reduz apenas a quantidade do produto
          produto.qtd -= 1;
        } else {
          // Remove o produto completamente se a quantidade for 1
          loggedUser.cart = loggedUser.cart.filter(produto => produto.nome !== idProduto);
        }
      }
    })
      // Atualiza o localStorage com os novos dados do carrinho
      const updatedUsers = users.map(user => user.email === loggedUserEmail ? loggedUser : user);
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Atualiza o carrinho na interface
      atualizarCarrinho();
  }
}

function atualizarCarrinho() {
  const loggedUserEmail = sessionStorage.getItem('loggedUser');
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const loggedUser = users.find(user => user.email === loggedUserEmail);

  const listaCarrinho = document.querySelector('#lista-carrinho');
  listaCarrinho.innerHTML = ''; // Limpa a lista antes de renderizar

  if (loggedUser && loggedUser.cart) {
    loggedUser.cart.forEach(produto => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h3>${produto.nome}</h3>
        <p>Preço: R$ <span>${produto.preco}</span></p>
        <p>Quantidade: <span>${produto.qtd}</span></p>
        <div class="aline-btn">
          <button class="excluir" onclick="excluirItem('${produto.id}')">Remover</button>
        </div>
      `;
      listaCarrinho.appendChild(li);
    });
  } else {
    listaCarrinho.innerHTML = '<li>Carrinho vazio!</li>';
  }
}


// Mostrar produtos disponíveis
produtos.addEventListener('click', () => {
  document.querySelector('#carrinhoDeCompras').style.display = 'none';
  document.querySelector('#editarDados').style.display = 'none';
  document.querySelector('#propaganda').style.display = 'block'; 
  document.querySelector('#produtos').style.display = 'block';
});
