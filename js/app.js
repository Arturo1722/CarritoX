// VARIABLES
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

caragarEventListeners();
function caragarEventListeners() {
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el arreglo

        limpiarHMTL(); // Eliminamos todo el HTML
    })
}

//FUNCIONES
function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
// Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        console.log(articulosCarrito);
    }

    carritoHTML(); // itera sobre el carrito y muestra su HTML
}




//Leyendo y extrayendo la informacion del curso
function leerDatosCurso(curso) {
    // console.log(curso);

    //Creando un objeto con el contenido del curso extraido
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // revisa si un elemento ya esxiste en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
   if( existe) {
    // Actualizamos la cantidad 
    const cursos = articulosCarrito.map( curso => {
        if(curso.id === infoCurso.id) {
            curso.cantidad++;
            return curso; // retorna el objeto actualizado
        } else {
            return curso; //retorna los objetos no repetidos
        }
    });
    articulosCarrito = [...cursos];
   } else {
    //Agregar elementos al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
   }
    console.log(articulosCarrito);

    carritoHTML();
}

// Mostrando el carrito de compras en HTML
function carritoHTML() {

    // LImpiar el HTML
    limpiarHMTL();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id}= curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href= "#" class="borrar-curso" data-id="${
                    id}"> X </a>
            </td>
            
        `;
        // Agrega el HTML el carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

// Eliminar los cursos del tbody
function limpiarHMTL() {
    // forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
