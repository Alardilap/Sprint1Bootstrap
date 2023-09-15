import { crearTarjeta, imprimirCheckbox, ejecucionDeEventos } from "./funciones.js";

let url = "https://mindhub-xj03.onrender.com/api/amazing"


let contenedorCards = "html-div-tarjetas";
let InputBusqueda = document.getElementById("input-busqueda");
let contenedorCheckbox = document.getElementById('contenedor-checkbox');

let eventos;


fetch(url)
  .then((res) => res.json())
  .then(({ events }) => {
    eventos = events
    let obtenerCategorias = events.map((evento) => evento.category);
    let categorias = [...new Set(obtenerCategorias)];
    imprimirCheckbox(categorias, contenedorCheckbox)
    crearTarjeta(events, contenedorCards)

  })

contenedorCheckbox.addEventListener("change", () => {
  ejecucionDeEventos(eventos, InputBusqueda, contenedorCards)
});
InputBusqueda.addEventListener("input", () => {
  ejecucionDeEventos(eventos, InputBusqueda, contenedorCards)
});
























