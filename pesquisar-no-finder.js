function getServiceImage(serviceName) {
  const serviceImages = {
    '{"nome":"HBO Max"}': 'https://caiogbdesign.github.io/finder/hbo-max.svg',
    '{"nome":"Prime Video"}': 'https://caiogbdesign.github.io/finder/prime-video.svg',
    '{"nome":"Apple TV"}': 'https://caiogbdesign.github.io/finder/apple-tv.svg',
    '{"nome":"YouTube"}': 'https://caiogbdesign.github.io/finder/youtube.svg',
    '{"nome":"Netflix"}': 'https://caiogbdesign.github.io/finder/netflix.svg',
    '{"nome":"Star+"}': 'https://caiogbdesign.github.io/finder/star+.svg',
    '{"nome":"Disney+"}': 'https://caiogbdesign.github.io/finder/disney+.svg',
    '{"nome":"Paramount+"}': 'https://caiogbdesign.github.io/finder/paramount.svg',
  };

  if (serviceImages.hasOwnProperty(serviceName)) {
    return `<img src="${serviceImages[serviceName]}" alt="${serviceName}">`;
  }

  return serviceName;
}

const form = document.querySelector('form');
const input = document.querySelector('#search');
const results = document.querySelector('#results');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  fetch('https://caiogbdesign.github.io/finder/finder-api.json')
    .then((response) => response.json())
    .then((data) => {
      const filmes = data.filter((filme) => {
        const termoBusca = input.value.toLowerCase().trim().split(' ');
        const tituloFilme = filme.titulo.toLowerCase().replaceAll('-', ' ');
        return termoBusca.every((palavra) => tituloFilme.includes(palavra));
      });

      if (filmes.length) {
        results.innerHTML = '';
        filmes.forEach((filme) => {
          const itemFilme = document.createElement('div');

          const titulo = document.createElement('h2');
          titulo.textContent = filme.titulo;

          const ano = document.createElement('p');
          ano.textContent = `Ano: ${filme.ano}`;

          const duracao = document.createElement('p');
          duracao.textContent = `Duração: ${filme.duracao}`;

          const generos = document.createElement('p');
          generos.textContent = `Gênero: ${filme.generos}`;

          const servicos = document.createElement('div');
          filme.servicos.forEach((servico) => {
            const spanServico = document.createElement('span');
            spanServico.innerHTML = `${getServiceImage(
              JSON.stringify(servico)
            )}&nbsp;`;
            servicos.appendChild(spanServico);
          });          

          const classificacao = document.createElement('p');
          classificacao.textContent = `Classificação: ${filme.classificação}`;

          const direcao = document.createElement('p');
          direcao.textContent = `Direção: ${filme.direção}`;

          const elenco = document.createElement('p');
          elenco.innerHTML = `<p>Elenco</p> ${filme.elenco.map(membroElenco => `
              <div class="foto-elenco">
                  <div class="img-elenco">
                    <img src="${membroElenco.foto}" alt="${membroElenco.nome}">
                  </div>
                  <div class="nome-elenco">
                      <p>${membroElenco.nome}</p>
                      <p>${membroElenco.personagem}</p>
                  </div>
              </div>
          `).join('')}`;


          const sinopse = document.createElement('p');
          sinopse.textContent = filme.sinopse;

          itemFilme.appendChild(titulo);
          itemFilme.appendChild(ano);
          itemFilme.appendChild(duracao);
          itemFilme.appendChild(generos);
          itemFilme.appendChild(servicos);
          itemFilme.appendChild(classificacao);
          itemFilme.appendChild(direcao);
          itemFilme.appendChild(elenco);
          itemFilme.appendChild(sinopse);

          results.appendChild(itemFilme);
        });
      } else {
        results.innerHTML = '<p>Esse filme ainda não foi adicionado</p>';
      }
    });
});

input.addEventListener('input', () => {
  form.querySelector('button').disabled = input.value.length === 0;
});
