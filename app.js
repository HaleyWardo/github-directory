const directory = new Vue({
  el: '#app',
  data: {
    heading: 'GitHub Directory',
    query: 'ynotdraw',
    users: [],
    repos: [],
    showDetail: false
  },
  methods: {
    handleSearch: function() {

      this.query = event.target.previousElementSibling.value

      fetch(`https://api.github.com/search/users?q=${this.query}`)
        .then(response => response.json())
        .then(user => {
          this.users = user.items[0];

          fetch(`https://api.github.com/users/${this.users.login}/repos`)
            .then(resp => resp.json())
            .then(repositories => {
              this.repos = repositories;

              this.repos.forEach(repo => {
                Vue.set(repo, 'showDetail', false);
              });
            })
        })

        //need to find a different way to access input field.
        //could use `document.querySelector('input')`
        event.target.previousElementSibling.value = '';
    },
    toggleDetails: function(repo) {
      repo.showDetail = !repo.showDetail;
    }
  }
});

// document.addEventListener('DOMContentLoaded', directory.handleSearch())

// https://vuejs.org/2016/02/06/common-gotchas/
// TODO:
// * avatar image styles are being displayed when image hasn't been rendered yet
// * only one user is being displayed - need to make it so more than one
// user can be searched and data is shown

// * make sure input value is either uppercase or lowercase
// * if no results are found - create error message
// * add pagination - limit 10 per page
// * toggle repo information on click
