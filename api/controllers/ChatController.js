/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var uuid = require('node-uuid');
var Cleverbot = require('cleverbot-node');
var CBots = [];
var moment = require('moment');
var request = require('request');

module.exports = {
	

  /**
   * `ChatController.create()`
   */
  create: function (req, res) {
    return res.json({
      todo: 'create() is not implemented yet!'
    });
  },


  /**
   * `ChatController.destroy()`
   */
  destroy: function (req, res) {
    return res.json({
      todo: 'destroy() is not implemented yet!'
    });
  },

  init: function (req, res) {
    //checks if browser session id was generated, if not fallback to node-uuid generator
    var session_uuid = (typeof(req.body.bSId) == 'undefined' || req.body.bSId == 'null') ? uuid.v4() : req.body.bSId;
    
    //if session was created
    if(session_uuid) {
      getAvatarSessionToken();
    } else {
      res.forbidden("There's problem generating the session id. Please try again.");
    }

    function getAvatarSessionToken() {
      var domain = "https://staging.3d-avatar-store.com/dev/auth/json",
          apikey = "4mXKzbvUgDRiy3IjjFdv4sSYmCV3soDSkDQqXkBx/ME5YDkagznxLj236mzk9JYoPvAKHErQJ=+ynwEPET0aW0PMAkH/jdiSMa9TYrZ/ES2vD/8Ua/CP29byeg7wodcRkvzdQDmFVtY2wOEkJ4s2/YFc0WiT9/oCi0B4C4xio+i0E0N0O000";

      var options = {
          url: domain,
          headers: {
              '3DASAPIKEY': apikey
          }
      };

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            var avatar_token = (info.apiSessionToken) ? info.apiSessionToken : '';
        }
        CBots = [new Cleverbot, new Cleverbot];
        req.session.chat = { session_id: session_uuid };
        res.json({ statusCode: response.statusCode, avatar_token: avatar_token });
      }
      request.post(options, callback);       
    }

  },

  start: function (req, res) {
    var isFirst = req.body.isFirst;
    var botIndex = req.body.botIndex;
    var botName = req.body.botName;
    var botMsg = req.body.botMsg;
    var emotion = req.body.emotion;

    CBots[botIndex].params.cleanslate = isFirst;
    CBots[botIndex].params.emotionaloutput = emotion;
    CBots[botIndex].params.emotionalhistory = emotion;

    CBots[botIndex].write(botMsg, function(resp) {
      var toBotIndex = (botIndex == 0) ? 1 : 0;
      res.json({
        botIndex: botIndex,
        botMsg: resp.message,
        toBotIndex: toBotIndex,
        htmlFormat: '<div>' +
                    '<span class="date">[' + moment().format("hh:mm") + ']</span> ' + 
                    '<span class="name">&lt;' + botName + '&gt;</span> ' + 
                    '<span class="msg">' + resp.message + '</span>' + 
                    '</div>',
      });
    });
  }

};

