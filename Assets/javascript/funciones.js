export function plantillaCheckbox(check) {
    return `
         <div class="form-check ">
               <input class="form-check-input" type="checkbox" value="${check}" id="${check}" />
               <label class="form-check-label" for="${check}">${check}</label>
            </div>
         `;
}

export function imprimirCheckbox(lista, contenedor) {

    let template = "";
    for (let check of lista) {
        template += plantillaCheckbox(check);
    }
    contenedor.innerHTML += template;
}

export function crearTarjeta(data, id) {

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
    document.getElementById(id).innerHTML = template;
}


export function crearTarjetaPastUpc(data, id) {

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
          <a href="./details.html?id=${tarjeta._id}" class="btn btn-dark">Details</a>
        </div>
    </div>
    `;
    }
    document.getElementById(id).innerHTML = template;
}

export function filtroCheck(array, categoryCheck) {

    return array.filter((evento) => (categoryCheck.includes(evento.category) || categoryCheck.length == 0))
}

export function filtroCategoria(data) {
    let check = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map((item) => item.value);
    let filtrados = filtroCheck(data, check)
    return filtrados
}

export function filtroInputBusqueda(events, valorInput) {
    let busqueda = events.filter((eventos) => eventos.name.toLowerCase().includes(valorInput.toLowerCase()))
    return busqueda
}

export function ejecucionDeEventos(events, input, id) {
    let resultadoFiltroCruzado = filtroInputBusqueda(filtroCategoria(events), input.value)
    crearTarjeta(resultadoFiltroCruzado, id);
}


export function crearTarjetaDetalles(data, id) {
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
    document.getElementById(id).innerHTML = template;
}

export function MayorPorcentajeAsistencia(array) {
    let eventoMayorPor = -1;
    let mayorPorcentaje;

    for (let evento of array) {
        let calcular = (evento.assistance * 100) / evento.capacity; //34
        if (calcular > eventoMayorPor) {
            eventoMayorPor = calcular;
            mayorPorcentaje = evento;
        }
    }
    return `${mayorPorcentaje.name} ${eventoMayorPor.toFixed(1)}% `;
}

export function MenorPorcentajeAsistencia(array) {

    let comparacionDatos = 0
    let eventoFinal
    for (let evento of array) {
        let calcular = (evento.assistance * 100) / evento.capacity; // 2%
        if (comparacionDatos == 0 || calcular < comparacionDatos) {
            comparacionDatos = calcular
            eventoFinal = evento

        }

    }

    return `${eventoFinal.name}  ${comparacionDatos.toFixed(1)}% `
}


export function MayorCapacidad(array) {
    let capacidadCompa = 0
    let eventoMayorCapa

    for (let evento of array) {
        if (evento.capacity > capacidadCompa) {
            capacidadCompa = evento.capacity
            eventoMayorCapa = evento
        }
    }
    return `${eventoMayorCapa.name}  ${capacidadCompa.toLocaleString()}`
}

export function insertarPlantilla(mayorPorcentaje, menorPorcentaje, mayorCapacidad, id) {
    let template = ""

    template += `
    
    <td>${mayorPorcentaje}</td>
    <td>${menorPorcentaje}</td>
    <td>${mayorCapacidad}</td>
`
    document.getElementById(id).innerHTML = template

}

export function imprimirSegundaTabla(eventos, id) {
    let datosCompletos = []

    let upCategories = Array.from(new Set(eventos.map(evento => evento.category)))

    let upRevenue = []
    for (let category of upCategories) {
        let upContador = 0
        for (let evento of eventos) {
            if (evento.category == category) {
                upContador += evento.estimate * evento.price
            }
        }
        upRevenue.push(upContador)
    }

    let porcenDeAsis = []
    for (let category of upCategories) {
        let estimado = 0
        let capacidad = 0
        for (let evento of eventos) {
            if (evento.category === category) {
                estimado += evento.estimate
                capacidad += evento.capacity
            }
        }
        porcenDeAsis.push(estimado * 100 / capacidad)
    }

    datosCompletos.push(upCategories, upRevenue, porcenDeAsis)
    console.log(datosCompletos)

    let template = ``
    for (let i = 0; i < datosCompletos[0].length; i++) {
        template += `
        <tr>
            <td>${datosCompletos[0][i]}</td>
            <td>$ ${datosCompletos[1][i].toLocaleString()}</td>
            <td>${datosCompletos[2][i].toFixed(1)}%</td>
        </tr>
        `
    }
    document.getElementById(id).innerHTML = template
}


export function imprimirTerceraTabla(eventos, id) {
    let datosCompletos = []

    let upCategories = Array.from(new Set(eventos.map(evento => evento.category)))

    let upRevenue = []
    for (let category of upCategories) {
        let upContador = 0
        for (let evento of eventos) {
            if (evento.category == category) {
                upContador += evento.assistance * evento.price
            }
        }
        upRevenue.push(upContador)
    }

    let porcenDeAsis = []
    for (let category of upCategories) {
        let assistance = 0
        let capacidad = 0
        for (let evento of eventos) {
            if (evento.category === category) {
                assistance += evento.assistance
                capacidad += evento.capacity
            }
        }
        porcenDeAsis.push(assistance * 100 / capacidad)

    }

    datosCompletos.push(upCategories, upRevenue, porcenDeAsis)
    console.log(datosCompletos)

    let template = ``
    for (let i = 0; i < datosCompletos[0].length; i++) {
        template += `
        <tr>
            <td>${datosCompletos[0][i]}</td>
            <td>$${datosCompletos[1][i].toLocaleString()}</td>
            <td>${datosCompletos[2][i].toFixed(2)}%</td>
        </tr>
        `
    }
    document.getElementById(id).innerHTML = template
}


