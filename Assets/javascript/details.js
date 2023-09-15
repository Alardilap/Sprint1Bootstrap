

import { crearTarjetaDetalles } from "./funciones.js"
let url = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(url)
  .then((res => res.json()))
  .then(({ events }) => {
    console.log(events)
    let id = "tarjetasDetalle"
    let url = window.location.search
    let parametros = new URLSearchParams(url);
    let idEvento = parametros.get("id")

    let filtrarId = events.find((tarjetaDetalle) => tarjetaDetalle._id === Number(idEvento))
    console.log(filtrarId)
    crearTarjetaDetalles(filtrarId, id)

  })