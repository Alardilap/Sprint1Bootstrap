let CapturarLupa = document.getElementById("contenedor-inputbusqueda");

let InputBusqueda = document.getElementById("input-busqueda");

let contenedorCheckbox = document.getElementById('contenedor-checkbox');

let obtenerCategorias = data.events.map((evento) => evento.category);

let categorias = [...new Set(obtenerCategorias)];


crearTarjeta(data.events);
imprimirCheckbox(categorias, contenedorCheckbox);


contenedorCheckbox.addEventListener("change", ejecucionDeEventos);

CapturarLupa.addEventListener("click", ejecucionDeEventos)

function ejecucionDeEventos() { //Funciones de procedimientos cuando no tiene return directo, no devuelve ningun dato, se encargan de la ejecucion de otras funciones.
  let resultadoFiltroCruzado = filtroInputBusqueda(filtroCategoria(data.events), InputBusqueda.value)
  crearTarjeta(resultadoFiltroCruzado);
}



function filtroCheck(array, category) {
  return array.filter((evento) => (category.includes(evento.category) || category.length == 0))
}

function filtroCategoria(data) {
  let check = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map((item) => item.value);
  let filtrados = filtroCheck(data, check)
  return filtrados
}

function filtroInputBusqueda(events, valorInput) {
  let busqueda = events.filter((eventos) => eventos.name.toLowerCase().includes(valorInput.toLowerCase()))
  console.log(busqueda)
  return busqueda
}

function crearTarjeta(data) {

  let template = "";

  for (let tarjeta of data) {
    template += `
  <div class="card d-flex flex-column justify-content-between"  style="width: 16rem;">
    <img src="${tarjeta.image}" class="card-img-top" alt="...">
    <div class="card-body  "  >
      <h5 class="card-title">${tarjeta.name}</h5>
      <p class="card-text">${tarjeta.description}</p>
      </div>
      <div class="contain-details pb-3">
        <h3> $ ${tarjeta.price}</h3>
        <a href="./Assets/pages/details.html?id=${tarjeta._id}" class="btn btn-dark">Details</a>
      </div>
  </div>
  `;
  }
  document.getElementById("html-div-tarjetas").innerHTML = template;
}

function plantillaCheckbox(check) {
  return `
       <div class="form-check ">
             <input class="form-check-input" type="checkbox" value="${check}" id="${check}" />
             <label class="form-check-label" for="${check}">${check}</label>
          </div>
       `;
}
function imprimirCheckbox(lista, contenedor) {
  console.log(lista)
  let template = "";
  for (let check of lista) {
    template += plantillaCheckbox(check);
  }
  contenedor.innerHTML += template;
}








