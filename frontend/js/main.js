window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch

  try {
    let response = await fetch('http://localhost:3031/api/movies')
    let peliculas = await response.json()

    //Codigo que debemos usar para mostrar los datos en el frontend

    let data = peliculas.data;

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);

      const a = document.createElement("a")
      a.setAttribute("href","formulario.html?id=" + movie.id)
      a.setAttribute('class', 'botonAgregar')
      a.textContent = 'ver mas'
      card.appendChild(a)

      const heart = document.createElement('button')
      heart.setAttribute('class', 'botonAgregar')
      heart.setAttribute('id', 'movie' + movie.id)
      heart.innerHTML = '<i class="fa-solid fa-heart-circle-plus"></i>'
      card.appendChild(heart)

      const fullHeart = document.createElement('button')
      fullHeart.setAttribute('class', 'botonAgregar')
      fullHeart.setAttribute('id', 'movie' + movie.id)
      fullHeart.innerHTML = '<i class="fa-solid fa-heart-circle-check"></i>'
      fullHeart.style.display = 'none'
      card.appendChild(fullHeart)

      heart.addEventListener("click", () => {
        const movieId = movie.id;
        const favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
      
        if (favorites.includes(movieId)) {
    
          const movieIndex = favorites.indexOf(movieId);
          favorites.splice(movieIndex, 1);
          localStorage.setItem("favorites", JSON.stringify(favorites));
          fullHeart.style.display = "none";
          heart.style.display = "inline-block";
        } else {
          favorites.push(movieId);
          localStorage.setItem("favorites", JSON.stringify(favorites));
          card.classList.add("favorite");
          fullHeart.style.display = "inline-block";
          heart.style.display = "none";
        }
      })


      fullHeart.addEventListener("click", () => {
        const movieId = movie.id;
        const favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
      
        if (favorites.includes(movieId)) {
   
          const movieIndex = favorites.indexOf(movieId);
          favorites.splice(movieIndex, 1);
          localStorage.setItem("favorites", JSON.stringify(favorites));
          fullHeart.style.display = "none";
          heart.style.display = "inline-block";
        }
      })
    });

  } catch (error) {
    console.error
  }

};
