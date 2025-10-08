    //menu deslizante con cambio de color al llegar a cierto número de px en el scroll
    (function(){const nombreMenu= document.querySelector(".yfH1");
    const logo = document.getElementById("logo");
    const nav = document.querySelector("nav");
    const isRespons = window.matchMedia("(min-width: 769px)")
    function scrollMenu(){
    if(window.scrollY>480){
        nombreMenu.classList.add("yfColor");
        logo.classList.add("logoColor");
        nav.classList.add("sombra")

    }else{
        nombreMenu.classList.remove("yfColor");
        logo.classList.remove("logoColor");
        nav.classList.remove("sombra")

    }}
    function manejarResponsive(e){
        if(e.matches){
            window.addEventListener('scroll', scrollMenu)
        } else{
            window.removeEventListener('scroll', scrollMenu)
            nombreMenu.classList.remove("yfColor");
            logo.classList.remove("logoColor");
            nav.classList.remove("sombra")
        }
    }
    
// comprobar al cargar página y cuando cambia el tamaño
    manejarResponsive(isRespons);

    isRespons.addEventListener('change', manejarResponsive)

    })()

// PORTADA
    // noticias con acceso desde un json
const contenedorNoticias = document.getElementById("contenedorNoticias");
fetch("https://laurafrancoj.github.io/Yf/data/noticias.json")
.then(response=> response.json())
.then(data=>{
    let contenidoNews= ""
    data.noticias.forEach(noticia=>{
        contenidoNews += `
        <div>
        <h3>${noticia.titular}</h3>
        <h4>${noticia.subtitulo}</h4>
        <p>${noticia.contenido}</p>
        </div>`
    })
    contenedorNoticias.innerHTML= contenidoNews
}
)

    // lightbox: imagen y texto 
const galeriaInicio= document.getElementById("galeriaInicio");
const imagInicio= document.querySelectorAll(".gal1");
const lightboxInicio = document.getElementById("lightbox");
const reference = document.getElementById("lightboxComment");
const lightbInicImag =document.getElementById("lightboxImage");

imagInicio.forEach(image=>{
    image.addEventListener('click', function(){
        lightboxInicio.style.display= 'block';
        lightbInicImag.src= image.src;
        reference.style.display= 'block';
        reference.innerText= image.alt
    })
})
lightboxInicio.addEventListener('click', function(){
    lightboxInicio.style.display='none'
})
