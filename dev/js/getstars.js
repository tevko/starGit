
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
			});
		},
};