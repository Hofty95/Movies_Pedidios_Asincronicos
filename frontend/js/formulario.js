window.onload = async() => {
    const $ = (id) => document.getElementById(id)

    let query = new URLSearchParams(location.search);

    let id = query.has('id') && query.get('id')

    try {
        let response = await fetch('http://localhost:3031/api/movies/' + id)
        let result = await response.json()
        let pelicula = result.data
        let date = moment(pelicula.release_date).format('YYYY-MM-DD')

        $('title').value = pelicula.title
        $('rating').value = pelicula.rating
        $('awards').value = pelicula.awards
        $('release_date').value = date
        $('length').value = pelicula.length


    } catch (error) {
        console.error
    }

    document.querySelector('.formulario').addEventListener('submit', async(e) => {
        e.preventDefault()

        try {
            let response = await fetch('http://localhost:3031/api/movies/update/' + id,{
                method:'PUT',
                body:JSON.stringify({
                    title : $('title').value,
                    rating : $('rating').value,
                    awards : $('awards').value,
                    release_date : $('release_date').value,
                    length : $('length').value
                }),
                headers:{
                    'Content-Type' : 'application/json'
                }
            })
            let result = await response.json()
            console.log(result);
        } catch (error) {
            console.error
        }
    })
}