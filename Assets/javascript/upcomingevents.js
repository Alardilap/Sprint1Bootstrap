import { crearTarjetaPastUpc, imprimirCheckbox, ejecucionDeEventos } from "./funciones.js"
let url = "https://mindhub-xj03.onrender.com/api/amazing"

let contenedorCheckbox = document.getElementById("contenedor-upcoming-checkbox");
let contenedorCards = "contenedor-upcoming"
let InputBusqueda = document.getElementById("input-busqueda");

fetch(url)
  .then((res) => res.json())
  .then(({ events, currentDate }) => {

    let eventosFuturos = events.filter((evento) => evento.date > currentDate); //7 eventos

    let obtenerCategorias = events.map((evento) => evento.category);

    let categorias = [...new Set(obtenerCategorias)];

    crearTarjetaPastUpc(eventosFuturos, contenedorCards)

    imprimirCheckbox(categorias, contenedorCheckbox)

    contenedorCheckbox.addEventListener("change", () => {
      ejecucionDeEventos(eventosFuturos, InputBusqueda, contenedorCards)
    });
    InputBusqueda.addEventListener("input", () => {
      ejecucionDeEventos(eventosFuturos, InputBusqueda, contenedorCards)
    });


  }).catch(err => err)