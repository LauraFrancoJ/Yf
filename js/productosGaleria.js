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


// vamos a intentar manejar todos los lightboxes de una vez para no repetir código
    function activarGaleria(fotos, lightbox, imgLightbox, reference) {
        let currentIndex = 0;

        // --- Crear flechas solo una vez  y cuando se activen los lightboxes---
        if (!lightbox.querySelector(".flechas.right")) {
            const flechaD = document.createElement('div');
            flechaD.classList.add("flechas", "right");
            flechaD.innerHTML = '<span class="fa-solid fa-caret-right righty"></span>';
            lightbox.appendChild(flechaD);

            const flechaI = document.createElement('div');
            flechaI.classList.add("flechas", "left");
            flechaI.innerHTML = '<span class="fa-solid fa-caret-left lefty"></span>';
            lightbox.appendChild(flechaI);
            // botón x para cerrar lightbox
            const boxClose = document.createElement('div');
            boxClose.classList.add("flechas", "cierre");
            boxClose.innerHTML= '<span class= "fa-solid fa-xmark close"></span>'
            lightbox.appendChild(boxClose);

            boxClose.addEventListener ('click', function(){
                lightbox.style.display= 'none'
            })

            // --- Flecha derecha ---
            flechaD.addEventListener('click', e => {
                e.stopPropagation();
                currentIndex = (currentIndex + 1) % fotos.length;
                imgLightbox.src = fotos[currentIndex].src;
                reference.textContent = fotos[currentIndex].alt;
            });

            // --- Flecha izquierda ---
            flechaI.addEventListener('click', e => {
                e.stopPropagation();
                currentIndex = (currentIndex - 1 + fotos.length) % fotos.length;
                imgLightbox.src = fotos[currentIndex].src;
                reference.textContent = fotos[currentIndex].alt;

            });
        }

        // --- Abrir lightbox con la foto clicada ---
        fotos.forEach((foto, i) => {
            foto.addEventListener('click', function(){
                lightbox.style.display = 'block';
                imgLightbox.src = foto.src;
                reference.textContent = foto.alt
                currentIndex = i; // guardamos la posición inicial
            });
        });

        // --- Cerrar al hacer clic en el fondo ---
        lightbox.addEventListener('click', function(){
            lightbox.style.display = 'none';
        });

        // --- Evitar cierre al clicar imagen ---
        imgLightbox.addEventListener('click', e => e.stopPropagation());
    }

    // --- Inicializamos las 3 galerías ---
    activarGaleria(
        document.querySelectorAll('.galeriaBotijos'),
        document.getElementById('lightbox1'),
        document.getElementById('lightbox1-image'),
        document.getElementById('comment1')
    );

    activarGaleria(
        document.querySelectorAll('.galeriaDeco'),
        document.getElementById('lightbox2'),
        document.getElementById('lightbox2-image'),
        document.getElementById('comment2')

    );

    activarGaleria(
        document.querySelectorAll('.galeriaVaji'),
        document.getElementById('lightbox3'),
        document.getElementById('lightbox3-image'),
        document.getElementById('comment3')


    );

