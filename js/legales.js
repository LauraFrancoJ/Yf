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
