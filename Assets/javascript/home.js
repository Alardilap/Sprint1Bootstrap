// function nombreTarjetas() {
//   const name = [];

//   for (let iterador of data.events) {
//     name.push(iterador.name);
//   }

//   console.log(name);
// }

// nombreTarjetas();

// function nombreTarjetasMap() {
//   const map = data.events.map((tarjeta) => tarjeta.name);
//   console.log(map);
// }

// nombreTarjetasMap();

function crearTarjetaEstructuraHtml(datos) {
  return ` <div class="card" style="width: 16rem;">
    <img src="${datos.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${datos.name}</h5>
      <p class="card-text">${datos.description}.</p>

      <div class="contain-detailes">
        <h3>${datos.price}</h3>
        <a href="./Assets/pages/details.html" class="btn btn-dark">details</a>
      </div>
    </div>
  </div> `;
}

function tarjetaIndividalIteracion(tarjetaIndividual) {
  let tarjetero = "";

  for (let tarjeta of tarjetaIndividual) {
    tarjetero = tarjetero + crearTarjetaEstructuraHtml(tarjeta);
  }
  return tarjetero;
}

let tarjeteroTotal = tarjetaIndividalIteracion(data.events);

function ingresarDivsAHtml(totaldedivs, id) {
  document.getElementById(id).innerHTML = totaldedivs;
}
ingresarDivsAHtml(tarjeteroTotal, "html-div-tarjetas");

// export function prueba() {
//   console.log("prueba");
// }
