const form = document.querySelector('form');
const input = document.querySelector('#search');
const results = document.querySelector('#results');

form.addEventListener('submit', e => {
  e.preventDefault();

  fetch('https://caiogbdesign.github.io/finder/finder-api.json')
    .then(response => response.json())
    .then(data => {
      const filmes = data.filter(filme => {
        const termoBusca = input.value.toLowerCase().trim().split(" ");
        const tituloFilme = filme.titulo.toLowerCase().replaceAll("-", " ");
        return termoBusca.every(palavra => tituloFilme.includes(palavra));
      });

      if (filmes.length) {
        results.innerHTML = '';
        filmes.forEach(filme => {
          const itemFilme = document.createElement('div');

          const titulo = document.createElement('h2');
          titulo.textContent = filme.titulo;

          const ano = document.createElement('p');
          ano.textContent = `Ano: ${filme.ano}`;

          const sinopse = document.createElement('p');
          sinopse.textContent = filme.sinopse;

          itemFilme.appendChild(titulo);
          itemFilme.appendChild(ano);
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
