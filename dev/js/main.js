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