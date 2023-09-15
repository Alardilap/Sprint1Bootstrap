
import { crearTarjetaPastUpc, imprimirCheckbox, ejecucionDeEventos } from "./funciones.js";
let url = "https://mindhub-xj03.onrender.com/api/amazing"

let contenedorCards = "contenedorPast"
let contenedorCheckbox = document.getElementById("contenedor-past");
let InputBusqueda = document.getElementById("input-busqueda");

fetch(url)
  .then((res) => res.json())
  .then(({ events, currentDate }) => {


    let obtenerCategorias = events.map((evento) => evento.category);
    let categorias = [...new Set(obtenerCategorias)];

    let eventosPasados = events.filter((evento) => evento.date < currentDate);

    crearTarjetaPastUpc(eventosPasados, contenedorCards)
    imprimirCheckbox(categorias, contenedorCheckbox)


    contenedorCheckbox.addEventListener("change", () => {
      ejecucionDeEventos(eventosPasados, InputBusqueda, contenedorCards)
    });
    InputBusqueda.addEventListener("input", () => {
      ejecucionDeEventos(eventosPasados, InputBusqueda, contenedorCards)
    });
  }).catch(err => err)