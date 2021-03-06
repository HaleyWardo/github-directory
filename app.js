const directory = new Vue({
  el: '#app',
  data: {
    heading: 'GitHub Directory',
    userQuery: '',
    users: [],
    repos: [],
    showDetail: false,
    // loading: false  -- use for loading indicator
  },
  methods: {
    handleSearch: function(query) {

      fetch(`https://api.github.com/search/users?q=${query}`)
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

        this.userQuery = '';
    },
    toggleDetails: function(repo) {
      repo.showDetail = !repo.showDetail;
    }
  }
});

document.addEventListener('DOMContentLoaded', directory.handleSearch(this.userQuery = 'haleywardo'))

// https://vuejs.org/2016/02/06/common-gotchas/
// TODO:
// * add contributors
// * avatar image styles are being displayed when image hasn't been rendered yet
// * only one user is being displayed - need to make it so more than one
// user can be searched and data is shown

// * make sure input value is either uppercase or lowercase
// * if no results are found - create error message
// * add pagination - limit 10 per page
// * toggle repo information on click





// Vue.component('header', {
//   template: `<div>{{message}}</div>`,
//   data: function() {

//   }
// });

// const app = new Vue({
//   el: '#app',
//   data: {
//     msg: 'this is a message'
//   }
// });

