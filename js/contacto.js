 //menu deslizante con cambio de color al llegar a cierto número de px en el scroll
    (function(){const nombreMenu= document.querySelector(".yfH1");
    const logo = document.getElementById("logo");
    const nav = document.querySelector("nav");
    const isRespons = window.matchMedia("(min-width: 769px)")
    function scrollMenu(){
    if(window.scrollY>10){
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
      manejarResponsive(isRespons);

    isRespons.addEventListener('change', manejarResponsive)
})()



function initMap(){
    const cajaMapa = document.getElementById("mapa");
    const map= new google.maps.Map( cajaMapa, {
        center:{lat:39.5865072, lng:2.6728466},
        zoom:10,
        zoomControl: true
    })
     const directionsService =  new google.maps.DirectionsService() // calcula la ruta
     const directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
        map,
        panel : document.getElementById('panel'),
        suppressMarkers: true,
     }
    )// renderiza y muestra la ruta
    // panel es el espacio de la info al lado del mapa
    let yfLoc = {lat:39.5295337, lng:2.5085241}
    let origenRutaUs 
    const markerYf= new google.maps.Marker({
            position: yfLoc,
            map: map,
            icon:"../assets/images/yf-logo2.png",
        })
        // el evento cuando cliquemos en el mapa  para terminar de crear la ruta y mostrarla
    map.addListener('click', (e)=>{
        origenRutaUs = e.latLng; //ubicación de donde se pincha
            

        displayRoute(origenRutaUs, yfLoc, directionsService, directionsRenderer);// llamada a la función y los parametros que se le van a pasar una vez que se ha hecho click en el mapa

      }
      )
      //añadir marca YF
      markerYf.setPosition(yfLoc);
      markerYf.setMap(map);

      directionsRenderer.addListener('directions_changed', ()=>{
        const directionsRyf = directionsRenderer.getDirections();
        let final= directionsRyf.routes[0].legs.length-1
        const localizacionFinal = directionsRyf.routes[0].legs[final].end_location;

      
    })
    const bounds = new google.maps.LatLngBounds();
    }


    
     

function displayRoute(origin, destination, service, display){
    
    service.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        avoidTolls: true, // para que se desplieguen las direcciones
        // se pueden poner más parametros de configuración de la ruta como por ejemplo:
        // waypoints: --- que es los diferentes puntos de paso de la ruta
        // se construiría como un Array
        // waypoints: [{location:}, {location:}]
    })
    .then((result)=>{
        display.setDirections(result)
    })
    .catch((error)=>
    alert("error" + error)
    )
}

        
window.initMap= initMap


   