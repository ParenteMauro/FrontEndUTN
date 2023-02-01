const API_KEY = "lINyYSZhsXT1fMqGZJD27e7bEzSaArBt";

const form = document.getElementById('form');

let adelanteAtras = document.getElementById("AdelanteAtras");

let busquedas = 0;

let pagina = 0;

let cantSiguiente = 0;

let buscaEspecifica = ""

let atras = document.getElementById("atras")
let siguiente = document.getElementById("siguiente")

function TraerGifs(buscaEspecifica){
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${buscaEspecifica}&limit=24&offset=${pagina}&rating=g&lang=en`)
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
    buscaEspecifica = document.getElementById("buscaEspecifica").value
    busquedas++
    if(busquedas === 1){
        TraerGifs(buscaEspecifica)
        siguiente.style.visibility = "visible"
        

    }else{
        borrarGifs()
        TraerGifs(buscaEspecifica)
        busquedas=0
        atras.style.visibility = "hidden"
    }
})


siguiente.addEventListener("click", (e)=>{
    pagina+=24
    borrarGifs()
    TraerGifs(buscaEspecifica)
    cantSiguiente++
    document.getElementById("atras").style.visibility = "visible"
})


atras.addEventListener("click", (e)=>{
     if(cantSiguiente>=1){
          pagina-=24
        borrarGifs()
           TraerGifs(buscaEspecifica)
           cantSiguiente--
           if(cantSiguiente<1){
               atras.style.visibility = "hidden"
           }
     }
})

        

