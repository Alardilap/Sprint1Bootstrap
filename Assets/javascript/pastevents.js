
// import { crearTarjetaPastUpc, imprimirCheckbox, ejecucionDeEventos } from "./funciones.js";
// let url = "https://mindhub-xj03.onrender.com/api/amazing"

// let contenedorCards = "contenedorPast"
// let contenedorCheckbox = document.getElementById("contenedor-past");
// let InputBusqueda = document.getElementById("input-busqueda");

// fetch(url)
//   .then((res) => res.json())
//   .then(({ events, currentDate }) => {


//     let obtenerCategorias = events.map((evento) => evento.category);
//     let categorias = [...new Set(obtenerCategorias)];

//     let eventosPasados = events.filter((evento) => evento.date < currentDate);

//     crearTarjetaPastUpc(eventosPasados, contenedorCards)
//     imprimirCheckbox(categorias, contenedorCheckbox)


//     contenedorCheckbox.addEventListener("change", () => {
//       ejecucionDeEventos(eventosPasados, InputBusqueda, contenedorCards)
//     });
//     InputBusqueda.addEventListener("input", () => {
//       ejecucionDeEventos(eventosPasados, InputBusqueda, contenedorCards)
//     });
//   }).catch(err => err)
const { createApp } = Vue
let url = "https://mindhub-xj03.onrender.com/api/amazing"



createApp({
  data() {
    return {
      events: [],
      checkboxs: [],
      valueCheckbox: [],
      valueInputSearch: "",
      filtered: [],
      eventosPasados: []
    }

  },

  created() {
    fetch(url)
      .then(response => response.json())
      .then(({ events, currentDate }) => {
        this.events = events
        let obtenerCategorias = this.events.map((evento) => evento.category);
        this.checkboxs = [...new Set(obtenerCategorias)];
        this.eventosPasados = events.filter((evento) => evento.date < currentDate);
      }).catch(err => err)
  },

  methods: {


  },
  computed: {
    filter() {
      this.filtered = this.eventosPasados.filter(event => event.name.toLowerCase().includes(this.valueInputSearch.toLowerCase())
        && (this.valueCheckbox.includes(event.category) || this.valueCheckbox.length == 0))
    }
  }

},

).mount('#app')