let filmes;

document.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://caiogbdesign.github.io/finder/finder-api.json"
  )
    .then((response) => response.json())
    .then((data) => {
      filmes = data;
      exibirFilme(filmes[Math.floor(Math.random() * filmes.length)]);

      document
        .getElementById("btn-random-movie")
        .addEventListener("click", function () {
          atualizarFilme();
        });

      document
        .getElementById("btn-suggest-movie")
        .addEventListener("click", function () {
          sugerirFilme();
        });
    })
    .catch((error) => {
      console.error(error);
    });
});

function exibirFilme(randomMovie) {
  // Remove o filme anterior da página
  const movieInfo = document.getElementById("movie-info");
  while (movieInfo.firstChild) {
    movieInfo.removeChild(movieInfo.firstChild);
  }

  const movieDiv = document.createElement("div");
  movieDiv.classList.add("sugestao");
  movieDiv.innerHTML = ` 

    <div class="folder-filme">
      <img src="${randomMovie.imagem}" alt="${randomMovie.titulo}">
    </div>

    <div class="titulo-filme">
      <h2>${randomMovie.titulo}</h2>
    </div>
    
    <div class="informacoes-filme">
      <div class="categoria">
        <p>${randomMovie.generos}</p>
      </div>
      <div class="duracao">
        <p>${randomMovie.duracao}</p>
      </div>
    </div>
    
    <div class="pontuacao">
      <div class="imdb">
      <p>${randomMovie.pontuacao.IMDB}</p>
        <span>IMDB</span>
      </div>

      <div class="rottenCriticos">
        <div class="percentual">
          <p>${randomMovie.pontuacao["Rotten Tomatoes críticos"]}</p>
          <span>%</span>
        </div>
        <span>Rotten Tomato</span>
      </div>

      <div class="metacritic">
        <div class="percentual">
          <p>${randomMovie.pontuacao.Metacritic}</p>
          <span>%</span>
        </div>
        <span>Metacritic</span>
      </div>

      <div class="letterboxd">
        <p>${randomMovie.pontuacao.Letterboxd}</p>
        <span>Letterboxd</span>
      </div>
    </div>

    <div class="servicos">
      <span>Serviços</span>
      ${
        randomMovie.servicos.map(servico => {
          return `
            <div class="servico">
              ${getServiceImage(servico.nome)}
            </div>
          `;
        }).join("")
      }
    </div>

    <div class="elenco">
      <span>Elenco</span>
      <div class="cont-artistas">
        ${randomMovie.elenco.map(personagem => `
        <div class="artista">
          <div class="img-elenco">
            <img src="${personagem.foto}" alt="${personagem.nome}">
          </div>
          <p>${personagem.nome}</p>
          <p>${personagem.personagem}</p>
        </div>
      `).join('')}
      </div>
    </div>

    <div class="direcao">
      <span>Direção</span>
      <p>${randomMovie.direcao}</p>
    </div>

    <div class="classificacao">
      <span>Classificação</span>
      <div class="botao-clssificacao">
        <p>${randomMovie.classificacao}</p>
      </div>
    </div>

    <div class="bilheteria">
      <span>Bilheteria</span>
      <p>${randomMovie.bilheteria}</p>
    </div>

    <div class="sinopse">
      <span>Sinopse</span>
      <p>${randomMovie.sinopse}</p>
    </div>
  `;

  document.getElementById("movie-info").appendChild(movieDiv);
}


function sugerirFilme() {
  fetch("https://caiogbdesign.github.io/finder/finder-api.json")
    .then(response => response.json())
    .then(data => {
      const randomMovie = data[Math.floor(Math.random() * data.length)];
      exibirFilme(randomMovie);
    })
    .catch(error => {
      console.error(error);
    });
}

document
  .getElementById("btn-suggest-movie")
  .addEventListener("click", function () {
    sugerirFilme();
  });

  function atualizarFilme() {
    sugerirFilme();
  }
  
  function getServiceImage(serviceName) {
    const serviceImages = {
      "HBO Max": "https://caiogbdesign.github.io/finder/hbo-max.svg",
      "Prime Video": "https://caiogbdesign.github.io/finder/prime-video.svg",
      "Apple TV": "https://caiogbdesign.github.io/finder/apple-tv.svg",
      "YouTube": "https://caiogbdesign.github.io/finder/youtube.svg",
      "Netflix": "https://caiogbdesign.github.io/finder/netflix.svg",
      "Star+": "https://caiogbdesign.github.io/finder/star+.svg",
      "Disney+": "https://caiogbdesign.github.io/finder/disney+.svg",
      "Paramount+": "https://caiogbdesign.github.io/finder/paramount.svg"
    };
  
    if (serviceImages.hasOwnProperty(serviceName)) {
      return `<img src="${serviceImages[serviceName]}" alt="${serviceName}">`;
    }
  
    return serviceName;
  }

  function abrirPopup() {
    var botao = document.querySelector('.botao-sugestao');

    if (botao.style.height === '1270px') {
      botao.style.height = '200px';
    } else {
      botao.style.height = '1270px';
    }
  }
