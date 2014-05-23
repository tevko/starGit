//template for results

var items = _.template(
    '<li>' 
    + '<span class="name"><%= name %></span>'
    + '<div class="results_details">'
    + '<p class="title"><%= description %></p>'
    + 'Owner : <span class="repoOwner"><%= owner.login %></span>'
    + '<a href="<%= html_url %>">View on Github</a>'
    + '<p class="latest">Latest Commit</p>'
    + '<div class="commitView">No Recent Commits</div>'
    + '<p>Readme File</p>'
    + '<article class="readmeFile"></article>'
    + '<span class="results_details--exit">X</span>'
    +'</div>'
    + '</li>'
    ),
    repo = [],
    stars = 0,
    numStarred = function(stars) {
      return '<h2> You\'ve starred ' + stars + ' Repositories!';
    },
    i, toAppendString = '';