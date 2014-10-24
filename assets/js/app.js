(function() {
	
	$('#start').click(function() {
		initChat();
	});

	var initChat = function() {
		var browserSessionId = generateBrowserSessionId();
		io.socket.post('/init/chat', { bSId: browserSessionId }, function(resData, jwres) {
			if(jwres.statusCode === 200) {
				startChat(0, '');
			} else {
				console.log(jwres.toString());
			}
		});		
	};

	var startChat = function(botIndex, botMsg) {
		io.socket.post('/start/chat', { botIndex: botIndex, botMsg: botMsg }, function(resData, jwres) {
			if(jwres.statusCode === 200) {
				console.log(resData);
				setTimeout(function() {
					startChat(resData.toBotIndex, resData.botMsg);
				}, 3000);
			}
		});
	};

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