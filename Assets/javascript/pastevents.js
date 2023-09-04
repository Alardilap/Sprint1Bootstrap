function crearTarjetaEstructuraHtml(datos) {
  return ` <div class="card" style="width: 16rem;">
      <img src="${datos.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${datos.name}</h5>
        <p class="card-text">${datos.description}.</p>
  
        <div class="contain-detailes">
          <h3>${datos.price}</h3>
          <a href="../pages/details.html" class="btn btn-dark">details</a>
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
const filter = data.events.filter((evento) => evento.date < "2023-01-01");

console.log(filter);

let tarjeteroTotal = tarjetaIndividalIteracion(filter);

function ingresarDivsAHtml(totaldedivs, id) {
  document.getElementById(id).innerHTML = totaldedivs;
}
ingresarDivsAHtml(tarjeteroTotal, "contenedorPast");
