const API_KEY = "lINyYSZhsXT1fMqGZJD27e7bEzSaArBt";

const form = document.getElementById('form');

let adelanteAtras = document.getElementById("AdelanteAtras");

let busquedas = 0;

let pagina = 0;

function TraerGifs(buscaEspecifica){
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${buscaEspecifica}&limit=25&offset=${pagina}&rating=g&lang=en`)
    .then((respuesta)=>{
        return respuesta.json();
    })
    .then((gifs)=>{
        console.log(gifs)
        dataGif = gifs.data
        console.log(dataGif)
        contenedorGif = document.querySelector("#listaGif")

        for(let gif of dataGif){
            contenedorGif.innerHTML += `<div><img src="${gif.images.original.url}" class="gif" alt="${gif.title}"></div>`
        }
    

    })
    .catch(()=>{
        alert("error")
    })
}

function borrarGifs(){
    while(contenedorGif.firstChild){
        contenedorGif.removeChild(contenedorGif.firstChild)
    }
}


form.addEventListener("submit", (e)=>{
    e.preventDefault()
    let buscaEspecifica = document.getElementById("buscaEspecifica").value
    busquedas++
    if(busquedas === 1){
        TraerGifs(buscaEspecifica)
        adelanteAtras.innerHTML += '<button id="siguiente">Siguiente</button>'
        let siguiente = document.getElementById("siguiente")
        let cantSiguiente = 0;
        siguiente.addEventListener("click", (e)=>{
            cantSiguiente++
            pagina+=25
            borrarGifs()
            TraerGifs(buscaEspecifica)
        })
    }else{
        borrarGifs()
        TraerGifs(buscaEspecifica)
        busquedas=0
    }
})
