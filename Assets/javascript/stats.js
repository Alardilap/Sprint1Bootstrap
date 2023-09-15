import { insertarPlantilla, MayorPorcentajeAsistencia, MenorPorcentajeAsistencia, MayorCapacidad, imprimirSegundaTabla, imprimirTerceraTabla } from "./funciones.js"

let url = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(url)
    .then((res) => res.json())
    .then(({ events, currentDate }) => {

        let eventosPasados = events.filter((evento) => evento.date < currentDate);
        console.log(eventosPasados)
        let eventosProximos = events.filter((evento) => evento.date >= currentDate);

        let mayorPorcentajeAsis = MayorPorcentajeAsistencia(eventosPasados);
        let menorPorcentajeAsis = MenorPorcentajeAsistencia(eventosPasados);
        let mayorCapacidadEvento = MayorCapacidad(events);
        imprimirSegundaTabla(eventosProximos, "insertarEventsFuturos")
        imprimirTerceraTabla(eventosPasados, "insertarPast")
        insertarPlantilla(mayorPorcentajeAsis, menorPorcentajeAsis, mayorCapacidadEvento, "insertarMayorPorcentaje");

    }
    )
    .catch((err) => err)


