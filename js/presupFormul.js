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

let carrito = []
// elementos del Dom que necesitamos para el presupuesto
const selectorProducto= document.querySelectorAll('select')
const botonAnadir= document.querySelectorAll('.anadirProducto')
const resumenCarrito = document.getElementById('resumenProductos')
const totalFinal = document.getElementById('totalFinal')
const errorGapGeneral= document.querySelector('.errorGapGeneral')
// errorGapGeneral.innerHTML= ""

//añadir productos al carrito
botonAnadir.forEach((boton, i)=>{
    boton.addEventListener('click', function(e){  
        e.preventDefault()
        
    // Busca el select asociado a ese botón (dentro de la misma tarjeta)
    const select = e.currentTarget.closest('.prods').querySelector('select[name="pr"]');
    const valorProducto = (select?.value || '').trim();
  
    if(!valorProducto ){
    errorGapGeneral.textContent = 'Por favor, seleccione al menos un producto';
      errorGapGeneral.classList.add('errorMessageOn');
      select?.focus();
      valida.selectorProducto= false
      return;
    }  
// si el select existe y su valor no esta vacío, lo añadimos al carrito
        errorGapGeneral.textContent = '';
    errorGapGeneral.classList.remove('errorMessageOn');

    const [nombreProducto, precioProducto] = valorProducto.split(':');
    const precio = parseFloat((precioProducto || '').trim());
    // Nos aseguramos de que el precio es un valor numérico
    if (!isNaN(precio)) {
      carrito.push({
        nombre: (nombreProducto || '').trim(),
        precio
      });
      valida.selectorProducto= true
      actualizarCarrito();
    }
  });
});
   

//  actualizarCarrito
function actualizarCarrito(){
    resumenCarrito.innerHTML = " ";
    let totalCarrito = 0;
    // mostrar los productos seleccionados
    carrito.forEach((producto, index)=>{
        let lineaArticulo= document.createElement('div');
        lineaArticulo.classList.add('articuloCarrito')
        lineaArticulo.innerHTML=
        `- ${producto.nombre} - ${producto.precio} € <button class= "eliminar-producto" data-index="${index}">Eliminar producto</button>`

        totalCarrito += producto.precio; 
        resumenCarrito.appendChild(lineaArticulo)
    })
      totalFinal.textContent = `Total: ${totalCarrito} €`;


//funcionalidad de eliminar producto
const botonEliminar = document.querySelectorAll('.eliminar-producto');
botonEliminar.forEach((boton)=>{
    boton.addEventListener('click', (e)=>{
        let index = e.target.dataset.index; 
     eliminarArticulo(index)

        
    })
   
})
actualizarPrecioTotal()

}
//función eliminar
function eliminarArticulo(index){
       carrito.splice(index, 1)
       actualizarCarrito()
}

//actualizar precio final
function actualizarPrecioTotal(){
let total= carrito.reduce((suma, item)=>
suma+ item.precio, 0)
    // sumar los extras antes de añadirlos al total
    const extrasCheck = document.querySelectorAll('.checkb:checked')
    extrasCheck.forEach(extra=>{
        const[nombreExtra, precioExtra] = extra.value.split(":")
        console.log(precioExtra)
        total += parseFloat(precioExtra)
    })
    // restar los descuentos
    const plazoDes = document.querySelector('.plazo')
    const desc =parseInt( plazoDes.value)
    let descuento= 0
    console.log(desc)
    if (!isNaN(desc) && desc != 0){
    switch(desc){
        case 10:
            descuento= 0
            total = total - (total*descuento)
        break;
        case 20:
            descuento = 0.10
            total = total - (total*descuento)
            break;
        case 30:
            descuento= 0.20
            total = total - (total*descuento)
            break;

    }} 
  
totalFinal.textContent = `Total: ${total.toFixed(2)} €`
}



//aplicar extras al total
const extras= document.querySelectorAll('.checkb')
extras.forEach(extr=>{
    extr.addEventListener('change', actualizarPrecioTotal)
})
// aplicar descuentos plazos de entrega al total
const desc = document.querySelector('.plazo')
desc.addEventListener('change', actualizarPrecioTotal)


//formulario y validación. 
    //elementos generales 

const formulario = document.getElementById('formulario');
const botonEnviar = document.getElementById('botonEnviar');
const botonBorrar = document.getElementById('botonBorrar')
const nombre = document.getElementById('nombreF');
const apellidos = document.getElementById('apellidosF');
const email = document.getElementById('emailF');
const telefono = document.getElementById('telefonoF');
const condiciones = document.getElementById('condiciones')
    /* YA ESTA DECLARADO ANTES: 
    const selectorProducto= document.querySelectorAll('select')
    const extras= document.querySelectorAll('.checkb')
    const desc = document.querySelector('.plazo') */

let valida={
    nombre:false,
    apellidos:false,
    email:false,
    telefono:false,
    selectorProducto:false,
    extras:false,
    desc:false, 
    condiciones: false
}
const nameRule = /^[A-Za-záÁéÉíÍóÓúÚñÑ\s]{3,15}$/
const surnameRule =/^[A-Za-záÁéÉíÍóÓúÚñÑ\s]{3,40}$/
const emailRule = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/
const phoneRule = /^[0-9]{9}$/

function errorValidacion(input, mensaje){
    let casillaDiv = input.parentElement;
    let errorGap = casillaDiv.querySelector('.errorMessage')
    errorGap.innerText= mensaje;
    errorGap.classList.add('errorMessageOn')
}
const selects= document.querySelectorAll('select[name="pr"]');

//los selects se validan aparte al tiempo que llenamos el carrito y al final al enviar


function correctoValidacion(input){
     let casillaDiv = input.parentElement;
    let errorGap = casillaDiv.querySelector('.errorMessage');
    input.classList.add('completado');
    errorGap.classList.remove('errorMessageOn');
    errorGap.innerText= "";
}

//validación inputs texto
nombre.addEventListener('blur', function(){
    if(nombre.value == "" || nombre.value== null){
        errorValidacion(nombre, "Por favor rellene este campo");
        valida.nombre= false
    }else if(!nameRule.exec(nombre.value)){
        errorValidacion(nombre, "EScriba un nombre valido, por favor");
        valida.nombre= false
    }else{
        correctoValidacion(nombre)
        valida.nombre= true
    }
})

apellidos.addEventListener('blur', function(){
    if(apellidos.value == "" || apellidos.value== null){
        errorValidacion(apellidos, "Por favor rellene este campo");
        valida.apellidos= false
    }else if(!surnameRule.exec(apellidos.value)){
        errorValidacion(apellidos, "Escriba unos apellidos válidos, por favor");
        valida.apellidos= false
    }else{
        correctoValidacion(apellidos)
        valida.apellidos= true
    }
})
email.addEventListener('blur', function(){
    if(email.value == "" || email.value== null){
        errorValidacion(email, "Por favor rellene este campo");
        valida.email= false
    }else if(!emailRule.exec(email.value)){
        errorValidacion(email, "Escriba un email válido, por favor");
        valida.email= false
    }else{
        correctoValidacion(email)
        valida.email= true
    }
})
telefono.addEventListener('blur', function(){
    if(telefono.value == "" || telefono.value== null){
        errorValidacion(telefono, "Por favor rellene este campo");
        valida.telefono= false
    }else if(!phoneRule.exec(telefono.value)){
        errorValidacion(telefono, "Escriba un telefono válido, por favor");
        valida.telefono= false
    }else{
        correctoValidacion(telefono)
        valida.telefono= true
    }
})
// validación de los input checkboxes
const extrasContainer = document.getElementById('extras');
const extraStandard= document.getElementById('ext0')


extras.forEach(extra=>{
    extra.addEventListener('blur', function(){ 
        let espacioError = extrasContainer.querySelector('.errorMessage');
        const extraChecked= document.querySelectorAll('.checkb:checked');

        if (extraChecked.length=== 0){
            espacioError.style.display= 'block'
            espacioError.innerText= "Marca al menos la opción standard";
            valida.extras= false;
            return
        }
        if (extraChecked.length >1  && extraStandard.checked){
            espacioError.style.display= 'block'
            espacioError.innerText= "La opción standard sólo se puede seleccionar sola";
            valida.extras= false;
            return
    }else{
        espacioError.style.display='none';
        espacioError.innerText="";
        valida.extras= true
    }
})
})  

//validación input númerico plazo desc

const plazoDesc = document.querySelector('.plazo')
plazoDesc.addEventListener('blur', function(){
    if (plazoDesc.value == 0 || plazoDesc.value == null){
        errorValidacion(desc, "Por favor, elige un plazo de días para la entrega");
        valida.desc= false
    }else{
        correctoValidacion(desc);
        valida.desc= true
    }
})

//validación condiciones

condiciones.addEventListener('blur', function(){
    if (!condiciones.checked ){
        // condicionesMensaje.innerText= "Debe aceptar la política de privacidad"
        errorValidacion(condiciones, "Debe aceptar las condiciones")
        valida.condiciones= false
        
    } else{
        correctoValidacion(condiciones)
        valida.condiciones= true
    }
})

const campos = {
    nombre:{
        input: nombre,
        mensaje: 'Debes rellenar este campo'
    },
    apellidos:{
        input: apellidos,
        mensaje: 'Debes rellenar este campo'
    },
    telefono:{
        input: telefono,
        mensaje: 'Debes rellenar este campo'
    },
    email:{ 
        input: email,
        mensaje: 'Debe rellenar este campo'
    },
    selectorProducto:{
        input:selectorProducto[0],
        mensaje: 'Debe elegir al menos un producto'
    },
    desc:{
        input: desc,
        mensaje: ' debe elegir un plazo de días'
    },
    extras:{
        input: extrasContainer,
        mensaje: 'Debe elegir al menos el envío standard'
    },
    condiciones:{
        input: condiciones,
        mensaje: 'Es obligatorio aceptar las condiciones'
    }
}
  
formulario.addEventListener('submit', function(e){
    e.preventDefault();
    let validacionFinalNo = false;

    // reset mensaje general
    const errorEnvio = document.querySelector('.errorEnvio');
    errorEnvio.classList.remove('errorMessageOn');
    errorEnvio.innerText = "";

        for ( const campo in valida) {
            if(valida[campo]=== false){
                validacionFinalNo= true;
                // No se envía porque alguno de los campos está mal, ahora quiero que se remarque el mensaje del campo que está mal si hubiesemos pasado sin hacer el blur
                    if (campos[campo]){
                            if (campo=== "selectorProducto"){
                                errorGapGeneral.textContent = 'Por favor, seleccione al menos un producto';
                                errorGapGeneral.classList.add('errorMessageOn');
                            }
                           else if(campo=== "extras"){
                                const espacioError = extrasContainer.querySelector('.errorMessage');
                                espacioError.style.display= 'block'
                                espacioError.innerText= "Marca al menos la opción standard";
                            }
                            else {
                               errorValidacion(campos[campo].input, campos[campo].mensaje) 
                            }

                        
                    }
            }    
            }
        
    if(!validacionFinalNo){
            formulario.submit()}
    })    
    

botonBorrar.addEventListener('click', function(e){
    e.preventDefault();
    formulario.reset();
    carrito = [];
    actualizarCarrito();
    totalFinal.textContent = "Total: 0 €";
    document.querySelectorAll('.errorMessage').forEach(err => {
        err.innerText = "";
        err.classList.remove('errorMessageOn');
    });
});
   