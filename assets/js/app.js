(function(){
	
	$('#start').click(function() {
		io.socket.get('/init/chat', function(resData) {
			if(resData.cbots) {
				startChatter(resData.cbots);
			}
		});
	});

	var startChatter = function(resData) {
		io.socket.post('/start/chat', { cbots: resData }, function(resData) {
			
		});
	}

})();