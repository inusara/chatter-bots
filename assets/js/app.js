(function(){
	
	$('#start').click(function() {
		io.socket.get('/init/chat', function(resData) {
			if(resData.cbots) {
				startChatter(resData.cbots);
			}
		});
	});

	var startChatter = function(resData) {
		var browserSessionId = generateBrowserSessionId();
		io.socket.post('/start/chat', { cbots: resData, bSId: browserSessionId }, function(resData) {

		});
	}

	/* for this function to generate browser session id -- else it will use a fallback
	Browser    Minimum Version
	--------------------------
	Chrome     11.0
	Firefox    21.0
	IE         11.0
	Opera      15.0
	Safari     5.1
	 */
	function generateBrowserSessionId(len) {
		var arr = new Uint8Array((len || 40) / 2);
		window.crypto.getRandomValues(arr);
		return [].map.call(arr, function(n) { return n.toString(16); }).join("");
	}

})();