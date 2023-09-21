
let url = "https://mindhub-xj03.onrender.com/api/amazing"
let { createApp } = Vue

let app = createApp({

    data() {
        return {
            events: [],
            eventsFuture: [],
            eventsPast: [],
            mayorPorcentaje: "",
            menorPorcentaje: "",
            mayorCapacidadArr: "",
            segundaTabla: [],
            terceraTabla: [],
        }
    },

    created() {
        fetch(url)
            .then((res => res.json()))
            .then(({ events, currentDate }) => {
                this.events = events
                this.eventsPast = this.events.filter((event) => event.date < currentDate);
                this.eventsFuture = this.events.filter((event) => event.date >= currentDate);

                this.mayorPorcentaje = this.mayorPorcentajeAsistencia(this.eventsPast)
                this.menorPorcentaje = this.menorPorcentajeAsistencia(this.eventsPast)
                this.mayorCapacidadArr = this.mayorCapacidad(this.events)
                this.segundaTabla = this.imprimirSegundaTabla(this.eventsFuture)
                this.terceraTabla = this.imprimirTerceraTabla(this.eventsPast)

            }).catch(err => console.log(err))
    },
    methods: {
        mayorPorcentajeAsistencia(array) {
            let eventoMayorPor = -1;
            let mayorPorcentaje;

            for (let evento of array) {
                let calcular = (evento.assistance * 100) / evento.capacity;
                if (calcular > eventoMayorPor) {
                    eventoMayorPor = calcular;
                    mayorPorcentaje = evento;
                }
            }
            return `${mayorPorcentaje.name} ${eventoMayorPor.toFixed(1)}% `;
        },

        menorPorcentajeAsistencia(array) {

            let comparacionDatos = 0
            let eventoFinal
            for (let evento of array) {
                let calcular = (evento.assistance * 100) / evento.capacity;
                if (comparacionDatos == 0 || calcular < comparacionDatos) {
                    comparacionDatos = calcular
                    eventoFinal = evento

                }

            }

            return `${eventoFinal.name}  ${comparacionDatos.toFixed(1)}% `
        },
        mayorCapacidad(array) {
            let capacidadCompa = 0
            let eventoMayorCapa

            for (let evento of array) {
                if (evento.capacity > capacidadCompa) {
                    capacidadCompa = evento.capacity
                    eventoMayorCapa = evento
                }
            }
            return `${eventoMayorCapa.name}  ${capacidadCompa.toLocaleString()}`
        },
        imprimirSegundaTabla(array) {
            let datosCompletos = [];
            let upCategories = Array.from(new Set(array.map(evento => evento.category)))
            for (let category of upCategories) {
                let upRevenue = 0;
                let categoria;
                categoria = category
                for (let evento of array) {
                    if (evento.category == category) {
                        upRevenue += evento.estimate * evento.price
                    }
                }
                let porcenDeAsis = 0;
                let estimado = 0
                let capacidad = 0
                for (let evento of array) {
                    if (evento.category === category) {
                        estimado += evento.estimate
                        capacidad += evento.capacity
                    }
                }
                porcenDeAsis = estimado * 100 / capacidad
                datosCompletos.push(
                    {
                        categoria: categoria,
                        ingresos: upRevenue.toLocaleString(),
                        asistencia: porcenDeAsis.toFixed(2),
                    }
                )
            }
            return datosCompletos
        },
        imprimirTerceraTabla(array) {
            let datosCompletosTerceraTabla = [];
            let upCategories = Array.from(new Set(array.map(evento => evento.category)))
            for (let category of upCategories) {
                let upRevenue = 0;
                let categoria;
                categoria = category
                for (let evento of array) {
                    if (evento.category == category) {
                        upRevenue += evento.assistance * evento.price
                    }
                }
                let porcenDeAsis = 0;
                let asistencia = 0
                let capacidad = 0
                for (let evento of array) {
                    if (evento.category === category) {
                        asistencia += evento.assistance
                        capacidad += evento.capacity
                    }
                }
                porcenDeAsis = asistencia * 100 / capacidad
                datosCompletosTerceraTabla.push(
                    {
                        categoria: categoria,
                        ingresos: upRevenue.toLocaleString(),
                        asistencia: porcenDeAsis.toFixed(2),
                    }
                )
            }
            console.log(datosCompletosTerceraTabla)
            return datosCompletosTerceraTabla
        }
    },
    computed: {

    }


}).mount("#app")


