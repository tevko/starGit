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