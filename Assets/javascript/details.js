let url = "https://mindhub-xj03.onrender.com/api/amazing"
let { createApp } = Vue

let app = createApp({

  data() {
    return {
      events: [],
      idEvento: null,
    }
  },

  created() {
    fetch(url)
      .then((res => res.json()))
      .then(({ events }) => {
        this.events = events
        let parametros = new URLSearchParams(location.search);
        this.idEvento = parseInt(parametros.get("id"))

      }).catch(err => console.log(err))

  },
  computed: {
    filterId() {
      return this.events.filter(event => event._id === this.idEvento)
    }
  }


}).mount("#app")

