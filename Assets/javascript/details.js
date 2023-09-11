const url = window.location.search
console.log(url)

const parametros = new URLSearchParams(url);
console.log(parametros)

let idEvento = parametros.get("id")
console.log(idEvento)

const filtrarId = data.events.find((tarjetaDetalle) => tarjetaDetalle._id === idEvento)

console.log(filtrarId)


function crearTarjetaDetalles(data) {

  document.title = `${data.name}`

  let template = "";
  console.log(template)

  for (let tarjeta in data) {
    template = `
      <div class="card" id="targeta-detalle">
      <img id="imagen-detalle" src="${data.image}" class="card-img-top" alt="food_fair">

      <div class="card-body">
        <h4>${data.name}</h4>
        <p>${data.description}.</p>
        <p class="card-text"><strong>Date:</strong>${data.date}</p>
        <p class="card-text"><strong>Category:</strong>${data.category}</p> <strong></strong>
        <p class="card-text"><strong>Place:</strong>${data.capacity}</p>
        <p class="card-text"><strong>Capacity:</strong>${data.capacity}</p>
        <p class="card-text"><strong>Assistance:</strong>${data.assistance || data.estimate}</p>
        <h1>${data.price}</h1>
      </div>
      </div>
  `;
  }
  document.getElementById("tarjetasDetalle").innerHTML = template;
}

crearTarjetaDetalles(filtrarId)
