
var s,
	getStars = {

		settings: {
			userName : '',
			container : $('.results'),
			dataUrlStart : 'https://api.github.com/users/',
	      	dataUrlEnd : '/starred?per_page=100'
		},

		init: function() {
			s = this.settings;
			this.actions();
		},

		actions: function() {
			var i, toAppendString = '';
			s.container.empty();
			s.userName = $('input').val();
			//loading stuff
			$('.results').addClass('results_loading');
			$.getJSON(s.dataUrlStart + s.userName + s.dataUrlEnd).done(function(data) {
				repo = data;
			    stars = data.length;
			    for (i = 0; i < data.length; i++) {
			      toAppendString += items(data[i]);
			    }
			    $('.results')
			      .append(numStarred(stars))
			      .append('<ol>' + toAppendString + '</ol>');
			    setTimeout(function() {
			    	$('.results').removeClass('results_loading');
			    }, 2000);
			}).fail(function() {
				$('.results').removeClass('results_loading');
				alert('Please enter a valid username!');
			});
		},
};
var gitModals = function(elem) {
	this.elem = elem;
	this.init();
};

$.extend(gitModals.prototype, {

	settings : {
		modal : $('.global_modal'),
		gitrepostart : 'https://api.github.com/repos/',
		gitrepoend : '/commits'
	},

	init : function() {
		s = this.settings;
		this.actions();
	},

	actions : function() {
		s.details = this.elem.siblings('.results_details');
		s.details.toggle();
		s.modal.toggle();
		var repoName = this.elem.text(),
			repoOwner = this.elem.siblings('.results_details').children('.repoOwner').text();
		$.getJSON(s.gitrepostart + repoOwner + '/' + repoName + s.gitrepoend).done(function(data) {
			$('.commitView').empty();
			var getCommit = $('.commitView').append(data[0].commit.message);
		}).fail(function() {
			alert('Looks like we\'ve exceeded the API rate limit! Check back in a minute or so!');
		});
		//get Readme file
		$.getJSON(s.gitrepostart + repoOwner + '/' + repoName + '/readme').done(function(data) {
			$('.readmeFile').empty();
			var raw = data.content;
			var toHtml = atob(raw);
			var converter = new Markdown.Converter();
			var mdFile = converter.makeHtml(toHtml);
			var getFile = $('.readmeFile').append(mdFile);
		});
		//close the modals
		$(document.body).on('click', '.results_details--exit, .global_modal' ,function(){
			$('.results_details').hide();
			s.modal.hide();
		});
	} 
});
//Main Javascripts

//if you have to use jQuery, use the wrapper below. It wraps jQuery in its own object so that it's syntax won't be confused with any other scripts

(function($ , window , undefined) {
    $(function() {
        $('.show-content').click(function() {
        	getStars.init();
        });
        //modal functionality
        $(document.body).on('click', '.name' ,function() {
        	var showModal = new gitModals($(this));
        });
    });
})(jQuery , window );
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