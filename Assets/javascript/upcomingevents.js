

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
      eventsFuture: []
    }

  },

  created() {
    fetch(url)
      .then(response => response.json())
      .then(({ events, currentDate }) => {
        this.events = events
        let obtenerCategorias = this.events.map((evento) => evento.category);
        this.checkboxs = [...new Set(obtenerCategorias)];
        this.eventsFuture = this.events.filter((event) => event.date >= currentDate);
      }).catch(err => err)
  },

  methods: {


  },
  computed: {
    filter() {
      this.filtered = this.eventsFuture.filter(event => event.name.toLowerCase().includes(this.valueInputSearch.toLowerCase())
        && (this.valueCheckbox.includes(event.category) || this.valueCheckbox.length == 0))
    }
  }

},

).mount('#app')
