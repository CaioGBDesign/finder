// chave da API
const chaveAPI = 'c95de8d6070dbf1b821185d759532f05';

// função para buscar detalhes de um filme aleatório
async function buscarFilme() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${chaveAPI}`;

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
async function sugerirFilme() {
  // buscar um novo filme
  const filme = await buscarFilme();

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
              <span>Caegoria</span>
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
