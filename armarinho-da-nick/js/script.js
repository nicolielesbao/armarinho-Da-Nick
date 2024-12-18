//links do header para o risquinho trocar dinâmicamente
document.addEventListener('scroll', function() {
    let secoes = document.querySelectorAll('section'); 
    let links = document.querySelectorAll('.user-navigation a'); 
  
    // Loop para verificar cada seção e verificar se está visível na tela
    secoes.forEach((section, index) => {
      let rect = section.getBoundingClientRect();
      let link = links[index];
  
      if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  //para os cards em produtos destaque
  document.getElementById('passar').addEventListener('click', function() {
    const cardsContainer = document.getElementById('cards');
    const cardWidth = document.querySelector('.card-produt').getBoundingClientRect().width; // Largura precisa do card
    const maxScroll = cardsContainer.scrollWidth - cardsContainer.clientWidth; // Máximo de deslocamento

    // Verifica se o contêiner ainda pode mover os cards para a direita
    if (cardsContainer.scrollLeft < maxScroll) {
        cardsContainer.scrollLeft += cardWidth; // Move para a direita
    }
});

document.getElementById('voltar').addEventListener('click', function() {
    const cardsContainer = document.getElementById('cards');
    const cardWidth = document.querySelector('.card-produt').getBoundingClientRect().width; // Largura precisa do card

    // Verifica se o contêiner ainda pode mover os cards para a esquerda
    if (cardsContainer.scrollLeft > 0) {
        cardsContainer.scrollLeft -= cardWidth; // Move para a esquerda
    }
});

  