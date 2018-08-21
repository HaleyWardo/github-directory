const directory = new Vue({
  el: '#app',
  data: {
    heading: 'GitHub Directory',
    query: '',
    repos: []
  },
  methods: {
    handleSearch: function() {
      this.query = event.target.previousElementSibling.value

      fetch(`https://api.github.com/search/users?q=${this.query}`)
        .then(response => response.json())
        .then(user => {
          let users = user.items;

          fetch(`https://api.github.com/users/${users[0].login}/repos`)
            .then(resp => resp.json())
            .then(repositories => {
              this.repos = repositories;
            })
        })
    }
  },
});


// TODO:
// * make sure input value is either uppercase or lowercase
// * if no results are found - create error message
// * add pagination - limit 10 per page
// * toggle repo information on click
