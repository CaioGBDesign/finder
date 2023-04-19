// chave da API
const chaveAPI = 'c95de8d6070dbf1b821185d759532f05';

// função para buscar detalhes de um filme aleatório
async function buscarFilme() {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${chaveAPI}&with_genres=35&include_adult=false&with_original_language=pt&sort_by=vote_average.desc&vote_count.gte=10`


  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    const indice = Math.floor(Math.random() * dados.results.length);
    const filme = dados.results[indice];

    // Busca a sinopse do filme
    const urlDetalhes = `https://api.themoviedb.org/3/movie/${filme.id}?api_key=${chaveAPI}&language=pt-BR`;
    const respostaDetalhes = await fetch(urlDetalhes);
    const detalhes = await respostaDetalhes.json();

    // Busca a lista de gêneros
    const urlGeneros = `https://api.themoviedb.org/3/genre/movie/list?api_key=${chaveAPI}&language=pt-BR`;
    const respostaGeneros = await fetch(urlGeneros);
    const generos = await respostaGeneros.json();

    // Mapeia o ID da categoria para o nome correspondente
    const categoria = generos.genres.find(genero => genero.id === filme.genre_ids[0]).name;

    // Formata a duração do filme
    const duracaoFormatada = detalhes.runtime !== null && detalhes.runtime !== undefined ? formatarDuracao(detalhes.runtime) : 'não disponível';

    return {
      nome: filme.title,
      categoria: categoria,
      duracao: duracaoFormatada,
      pontuacaoIMDB: filme.vote_average,
      pontuacaoRottenTomatoes: '',
      pontuacaoMetacritic: '',
      sinopse: detalhes.overview,
      poster: filme.poster_path
    };
  } catch (erro) {
    console.error(erro);
  }
}


// função para formatar a duração em minutos para "HH:mm"
function formatarDuracao(duracaoMinutos) {
  const horas = Math.floor(duracaoMinutos / 60);
  const minutos = duracaoMinutos % 60;
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
}

// função para sugerir um novo filme
async function sugerirFilme(categoria = null) {
  // definir a url da API de acordo com a categoria
  let url = '';
  if (categoria !== null) {
    if (categoria === 'Netflix' || categoria === 'HBO-MAX' || categoria === 'Prime-Video' || categoria === 'Disney-Plys' || categoria === 'Star-Plus' || categoria === 'Apple-TV') {
      switch (categoria) {
        case 'Netflix':
          url = `https://api.themoviedb.org/3/discover/tv?api_key=${chaveAPI}&sort_by=popularity.desc&with_networks=213`;
          break;
        case 'HBO-MAX':
          url = `https://api.themoviedb.org/3/discover/tv?api_key=${chaveAPI}&sort_by=popularity.desc&with_networks=3185`;
          break;
        case 'Prime-Video':
          url = `https://api.themoviedb.org/3/discover/tv?api_key=${chaveAPI}&sort_by=popularity.desc&with_networks=1024`;
          break;
        case 'Disney-Plys':
          url = `https://api.themoviedb.org/3/discover/tv?api_key=${chaveAPI}&sort_by=popularity.desc&with_networks=2739`;
          break;
        case 'Star-Plus':
          url = `https://api.themoviedb.org/3/discover/tv?api_key=${chaveAPI}&sort_by=popularity.desc&with_networks=3924`;
          break;
        case 'Apple-TV':
          url = `https://api.themoviedb.org/3/discover/tv?api_key=${chaveAPI}&sort_by=popularity.desc&with_networks=2551`;
          break;
      }
    } else {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${chaveAPI}&with_genres=${categoria}&sort_by=popularity.desc`;
    }
  } else {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${chaveAPI}&sort_by=popularity.desc`;
  }

  // buscar um novo filme
  const filme = await buscarFilme(url);

  // atualizar a lista de filmes
  const filmesDiv = document.getElementById('filmes');
  filmesDiv.innerHTML = `
      <div class="sugestao">
          <div class="folder-filme">
            <img src="https://image.tmdb.org/t/p/w500${filme.poster}" alt="${filme.nome}">
          </div>
          
          <div class="titulo-filme">
            <h2>${filme.nome}</h2>
          </div>

          <div class="informacoes-filme">
            <div class="categoria">
              <span>Categoria</span>
              <p>${filme.categoria}</p>
            </div>
          
            <div class="duracao">
              <span>Duração</span>
              <p>${filme.duracao}</p>
            </div>

            <div class="pontuacao-imdb">
              <span>IMDB</span>
              <p>${filme.pontuacaoIMDB}</p>
            </div>
          </div>
          
          <div class="sinopse">
            <span>Sinopse</span>
            <p>${filme.sinopse}</p>
          </div>
      </div>
  `;
}

// sugerir um filme inicial
sugerirFilme();

const filtrosDiv = document.querySelector('.filtros');
const contSugestaoDiv = document.querySelector('.cont-sugestao');

filtrosDiv.addEventListener('click', () => {
  contSugestaoDiv.classList.toggle('aberto');
});
