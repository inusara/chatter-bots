/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var uuid = require('node-uuid');
var Cleverbot = require('cleverbot-node');
var CBots = [];
var CBotsName = ['Zed', 'John'];
var moment = require('moment');

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
      CBots = [new Cleverbot, new Cleverbot];
      req.session.chat = { session_id: session_uuid };
      res.ok();
    } else {
      res.forbidden("There's problem generating the session id. Please try again.");
    }
  },

  start: function (req, res) {
    var isFirst = req.body.isFirst;
    var botIndex = req.body.botIndex;
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
                    '<span class="name">&lt;' + CBotsName[botIndex] + '&gt;</span> ' + 
                    '<span class="msg">' + resp.message + '</span>' + 
                    '</div>',
      });
    });
  }

};

