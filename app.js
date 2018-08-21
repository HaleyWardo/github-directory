const directory = new Vue({
  el: '#app',
  data: {
    heading: 'GitHub Directory',
    query: '',
    info: []
  },
  methods: {
    handleSearch: function() {
      this.query = event.target.previousElementSibling.value

      axios
      .get(`https://api.github.com/search/users?q=${this.query}`)
      // .get(`https://api.github.com/users/${this.query.login}/repos`)
      .then(response => {
        this.info = response.data.items;
      })
    }
  },
});


// TODO:
// * make sure input value is either uppercase or lowercase
// * if no results are found - create error message
