function converterGenero(genero) {
  switch(genero) {
    case "g1":
      return "Ação";
    case "g2":
      return "Aventura";
    case "g3":
      return "Comédia";
    case "g4":
      return "Ficção Científica";
    case "g5":
      return "Drama";
    case "g6":
      return "Ficção policial";
    case "g7":
      return "Crime";
    case "g8":
      return "Fantasia";
    case "g9":
      return "Histórico";
    case "g10":
      return "Faroeste";
    case "g11":
      return "Filme épico";
      case "g12":
        return "Biografia";
    default:
      return genero;
  }
}

function converterServicoStreaming(servico) {
  switch (servico) {
    case "s1":
      return '<img src="https://caiogbdesign.github.io/flick/netflix.svg" alt="Netflix">';
    case "s2":
      return '<img src="https://caiogbdesign.github.io/flick/prime-video.svg" alt="Prime Vídeo">';
    case "s3":
      return '<img src="https://caiogbdesign.github.io/flick/hbo-max.svg" alt="HBO MAX">';
    case "s4":
      return '<img src="https://caiogbdesign.github.io/flick/disney+.svg" alt="Disney+">';
    case "s5":
      return '<img src="https://caiogbdesign.github.io/flick/star+.svg" alt="Star+">';
    case "s6":
      return '<img src="https://caiogbdesign.github.io/flick/youtube.svg" alt="Youtube">';
    case "s7":
      return '<img src="https://caiogbdesign.github.io/flick/apple-tv.svg" alt="Apple TV">';
    case "s8":
      return '<img src="https://caiogbdesign.github.io/flick/paramount.svg" alt="Paramount">';
    case "s9":
      return "Somente nos cinemas";
    case "s10":
      return "Indisponível para streaming :'(";
    default:
      return servico;
  }
}

function converterClassificacao(idade) {
  switch (idade) {
    case "Livre":
      return '"livre"><span>Livre</span>';
    case "10-anos":
      return '"DezAnos"><span>10 anos</span>';
    case "12-anos":
      return '"DozeAnos"><span>12 anos</span>';
    case "14-anos":
      return '"QuatorzeAnos"><span>14 anos</span>';
    case "16-anos":
      return '"DezesseisAnos"><span>16 anos</span>';
    case "18-anos":
      return '"DezoitoAnos"><span>18 anos</span>';
    default:
      return idade;
  }
}

function exibirAvaliacao(avaliacao) {
  var estrelas = "";
  for (var i = 0; i < 5; i++) {
    if (i < avaliacao) {
      estrelas += "<img src='https://caiogbdesign.github.io/flick/estrela-preenchida.svg' alt='Estrela preenchida'>";
    } else {
      estrelas += "<img src='https://caiogbdesign.github.io/flick/estrela-vazia.svg' alt='Estrela vazia'>";
    }
  }
  return estrelas;
}

document.addEventListener("DOMContentLoaded", () => {
  const buttonSugerir = document.getElementById("sugerir-filme");
  const buttonFiltrar = document.getElementById("aplicar-filtros");
  const filmeSugerido = document.getElementById("filme-sugerido");
  let ultimoFilmeSugerido;

  const sugerirFilme = (filmes) => {
    const filmeAleatorio = filmes[Math.floor(Math.random() * filmes.length)];
    ultimoFilmeSugerido = filmeAleatorio;

    const generos = filmeAleatorio.generos ? filmeAleatorio.generos.map(genero => converterGenero(genero.nome)) : [];

    filmeSugerido.innerHTML = `
      
    <div class="sugestao">
        <div class="folder-filme">
            <img src="${filmeAleatorio.imagem}" alt="${filmeAleatorio.titulo}">
        </div>

        <div class="cont-conteudo">
        <div class="conteudo-completo">
        <div class="titulo-filme">
        <h2>${filmeAleatorio.titulo}</h2>
        </div>

        <div class="genero-duracao">
        <p>${generos.join(' /  ')}</p>
        <p>${filmeAleatorio.duracao}</p>
        </div>

        <div class="pontuacoes">
        <div class="imdb">
            <p>${filmeAleatorio.pontuacao.IMDB}</p>
            <span>IMDB</span>
        </div>

        <div class="rottenCriticos">
            <p>${filmeAleatorio.pontuacao.RottenCriticos}</p>
            <span>Rotten Tomato</span>
        </div>
        
        <div class="metacritic">
            <p>${filmeAleatorio.pontuacao.Metacritic}</p>
            <span>Metacritic</span>
        </div>
        
        <div class="letterboxd">
            <p>${filmeAleatorio.pontuacao.Letterboxd}</p>
            <span>Letterboxd</span>
        </div>
        </div>
        
        ${filmeAleatorio.Flick ?
        ` <div class="avaliacoes">
            <span>Notas Flick</span>
            ${filmeAleatorio.Flick.map(avaliador => `
                <div class="avaliador">
                <div class="avaliador-foto">
                    <img src="${avaliador.foto}" alt="${avaliador.especialista}">
                </div>
                <p>${avaliador.especialista}</p>
                <div class="estrelas">${exibirAvaliacao(avaliador.avaliacao)}</div>
                </div>
            `).join('')}
        </div>` : ''}            

        <div class="servicos">
        <span>Onde assistir</span>
        <p>${filmeAleatorio.servicos.map(servico => converterServicoStreaming(servico.streaming)).join("")}</p>
        </div>

        <div class="elenco">
        <span>Elenco</span>
        <div class="cont-artistas">
            ${filmeAleatorio.elenco.map(personagem => `
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
        <p>${filmeAleatorio.direcao}</p>
        </div>

        <div class="classificacao">
        <span>Classificacao</span>
        <div class=${converterClassificacao(filmeAleatorio.classificacao)}</div>
        </div>

        <div class="bilheteria">
        <span>Bilheteria</span>
        <p>${filmeAleatorio.bilheteria}</p>
        </div>

        <div class="sinopse">
        <span>Sinopse</span>
        <p>${filmeAleatorio.sinopse}</p>
        </div>
        
        ${filmeAleatorio.opiniao ? 
        ` <div class="opiniao">
            ${filmeAleatorio.opiniao.map(avaliador => `
                <div class="avaliador">
                    <div class="autor">
                    <p><span>Avaliação • </span>${avaliador.especialista}</p>
                    </div>
                    <p>${avaliador.texto}</p>
                </div>
            `).join('')}
        </div>` : ''}
        </div>
        </div>

    </div>
    `;
  };

  fetch("https://caiogbdesign.github.io/flick/flick-api.json")
    .then(response => response.json())
    .then(data => {
      const filmes = Object.values(data).filter(filme => filme.id.startsWith("FR"));
      sugerirFilme(filmes);
    })
    .catch(error => console.error(error));

  buttonSugerir.addEventListener("click", () => {
    fetch("https://caiogbdesign.github.io/flick/flick-api.json")
      .then(response => response.json())
      .then(data => {
        const filmes = Object.values(data).filter(filme => filme.id.startsWith("FR"));
        sugerirFilme(filmes);
      })
      .catch(error => console.error(error));
  });

  buttonFiltrar.addEventListener("click", () => {
    const genero = document.querySelector('input[name=generos]:checked').value;
    const classificacao = document.querySelector('input[name=classificacao]:checked').value;
    const streaming = document.querySelector('input[name=servicos]:checked').value;
    const notas = document.querySelector('input[name=notas]:checked').value;
    const opinioes = document.querySelector('input[name=opinioes]:checked').value;
    const disponivelCinema = document.querySelector('input[name=cinema]:checked').value;

    fetch("https://caiogbdesign.github.io/flick/flick-api.json")
      .then(response => response.json())
      .then(data => {
        const filmes = Object.values(data).filter(filme => filme.id.startsWith("FR"));
        const filmesFiltrados = filmes.filter(filme => {
          if (genero && genero !== "" && (!filme.generos || !filme.generos.find(g => g.nome === genero))) {
            return false;
          }
          if (classificacao && classificacao !== "" && filme.classificacao !== classificacao) {
            return false;
          }
          if (streaming && streaming !== "" && (!filme.servicos || !filme.servicos.find(s => s.streaming === streaming))) {
            return false;
          }
          if (notas === "notaSim" && (!filme.Flick || !filme.Flick.length)) {
            return false;
          }
          if (opinioes === "opiniaoSim" && (!filme.opiniao || !filme.opiniao.length)) {
            return false;
          }
          if (disponivelCinema && disponivelCinema !== "" && (!filme.cinema || !filme.cinema.find(c => c.disponibilidade === disponivelCinema))) {
            return false;
          }
          return true;
        });

        if (filmesFiltrados.length > 0) {
          const filmeAleatorio = filmesFiltrados[Math.floor(Math.random() * filmesFiltrados.length)];
          const generos = filmeAleatorio.generos ? filmeAleatorio.generos.map(genero => converterGenero(genero.nome)) : [];
          filmeSugerido.innerHTML = `
          
          <div class="sugestao">
            <div class="folder-filme">
                <img src="${filmeAleatorio.imagem}" alt="${filmeAleatorio.titulo}">
            </div>

            <div class="cont-conteudo">
            <div class="conteudo-completo">
            <div class="titulo-filme">
            <h2>${filmeAleatorio.titulo}</h2>
            </div>

            <div class="genero-duracao">
            <p>${generos.join(' /  ')}</p>
            <p>${filmeAleatorio.duracao}</p>
            </div>

            <div class="pontuacoes">
            <div class="imdb">
                <p>${filmeAleatorio.pontuacao.IMDB}</p>
                <span>IMDB</span>
            </div>

            <div class="rottenCriticos">
                <p>${filmeAleatorio.pontuacao.RottenCriticos}</p>
                <span>Rotten Tomato</span>
            </div>
            
            <div class="metacritic">
                <p>${filmeAleatorio.pontuacao.Metacritic}</p>
                <span>Metacritic</span>
            </div>
            
            <div class="letterboxd">
                <p>${filmeAleatorio.pontuacao.Letterboxd}</p>
                <span>Letterboxd</span>
            </div>
            </div>
            
            ${filmeAleatorio.Flick ?
            ` <div class="avaliacoes">
                <span>Notas Flick</span>
                ${filmeAleatorio.Flick.map(avaliador => `
                    <div class="avaliador">
                    <div class="avaliador-foto">
                        <img src="${avaliador.foto}" alt="${avaliador.especialista}">
                    </div>
                    <p>${avaliador.especialista}</p>
                    <div class="estrelas">${exibirAvaliacao(avaliador.avaliacao)}</div>
                    </div>
                `).join('')}
            </div>` : ''}            

            <div class="servicos">
            <span>Onde assistir</span>
            <p>${filmeAleatorio.servicos.map(servico => converterServicoStreaming(servico.streaming)).join("")}</p>
            </div>

            <div class="elenco">
            <span>Elenco</span>
            <div class="cont-artistas">
                ${filmeAleatorio.elenco.map(personagem => `
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
            <p>${filmeAleatorio.direcao}</p>
            </div>

            <div class="classificacao">
            <span>Classificacao</span>
            <div class=${converterClassificacao(filmeAleatorio.classificacao)}</div>
            </div>

            <div class="bilheteria">
            <span>Bilheteria</span>
            <p>${filmeAleatorio.bilheteria}</p>
            </div>

            <div class="sinopse">
            <span>Sinopse</span>
            <p>${filmeAleatorio.sinopse}</p>
            </div>
            
            ${filmeAleatorio.opiniao ? 
            ` <div class="opiniao">
                ${filmeAleatorio.opiniao.map(avaliador => `
                    <div class="avaliador">
                        <div class="autor">
                        <p><span>Avaliação • </span>${avaliador.especialista}</p>
                        </div>
                        <p>${avaliador.texto}</p>
                    </div>
                `).join('')}
            </div>` : ''}
            </div>
            </div>

        </div>
          `;
        } else {
          console.log("Nenhum filme encontrado com os filtros selecionados.");
          filmeSugerido.innerHTML = "Não foi possível encontrar um filme com os filtros selecionados.";
        }
      })
      .catch(error => console.error(error));
  });

  // sugere um filme ao carregar a página
  buttonSugerir.click();
});

// Popup filtros
const meuPopup = document.getElementById('meu-popup');
const btnFiltros = document.getElementById('btn-filtros');
const fecharPopup = document.getElementById('fechar-popup');
const backgroundPopup = document.getElementById('popup-aberto')

function mostrarPopup() {
  meuPopup.classList.add('mostrar');
  backgroundPopup.classList.add('popup-aberto');
}

function ocultarPopup() {
  meuPopup.classList.remove('mostrar');
  backgroundPopup.classList.remove('popup-aberto');
}

btnFiltros.addEventListener('click', mostrarPopup);
fecharPopup.addEventListener('click', ocultarPopup);
meuPopup.addEventListener('click', function(event) {
  event.stopPropagation();
});
window.addEventListener('click', function(event) {
  if (event.target !== meuPopup && event.target !== btnFiltros) {
    ocultarPopup();
  }
});

const botao = document.querySelector('#aplicar-filtros');
const popup = document.querySelector('#meu-popup');

botao.addEventListener('click', function() {
  popup.classList.remove('mostrar');
  backgroundPopup.classList.remove('popup-aberto');
});

// Voltar para o topo ao sugerir novo filme
const botaoSugerirFilme = document.getElementById("sugerir-filme");
const botaoFiltro = document.getElementById("aplicar-filtros");

botaoSugerirFilme.addEventListener("click", function() {
  // Role para o topo da página
  window.scrollTo(0, 0);
});

botaoFiltro.addEventListener("click", function() {
  // Role para o topo da página
  window.scrollTo(0, 0);
});
