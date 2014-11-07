(function() {

	var voices = [];
	var msg;
	var botSpeech = $('#speech');

	window.speechSynthesis.onvoiceschanged = function() {
		voices = window.speechSynthesis.getVoices();
	}
	
	$('#start').click(function() {
		initChat($('input:text').val());
	});

	var initChat = function(topic) {
		var browserSessionId = generateBrowserSessionId();
		io.socket.post('/init/chat', { bSId: browserSessionId }, function(resData, jwres) {
			if(jwres.statusCode === 200) {
				startChat(true, 0, topic);
			} else {
				console.log(jwres.toString());
			}
		});		
	};

	var startChat = function(isFirst, botIndex, botMsg) {

		if(!isFirst && botMsg && botSpeech.prop('checked')) {
			var msg = new SpeechSynthesisUtterance();
			msg.voice = (voices) ? voices[botIndex] : null;
			msg.voiceURI = 'native';
			msg.volume = 1; // 0 to 1
			msg.rate = 10; // 0.1 to 10
			msg.pitch = 2; //0 to 2
			msg.text = botMsg
			msg.lang = 'en-US';

			msg.onend = function(e) {
				sendMsg();
			};

			speechSynthesis.speak(msg);
		} else {
			sendMsg();
		}
		
		function sendMsg() {
			io.socket.post('/start/chat', { botIndex: botIndex, botMsg: botMsg }, function(resData, jwres) {
				if(jwres.statusCode === 200) {
					console.log(resData);
					setTimeout(function() {
						$('#chatlog').append(resData.htmlFormat);
						startChat(false, resData.toBotIndex, resData.botMsg);
					}, 1200);
				}
			});			
		}

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