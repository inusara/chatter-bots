/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var uuid = require('node-uuid');
var Cleverbot = require('cleverbot-node');
var CBots = [];

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

  start: function (req, res) {

    if(req.body.init) { //if first use generate new objs
      CBots = [new Cleverbot, new Cleverbot];
    }

    //checks if browser session id was generated, if not fallback to node-uuid generator
    var session_uuid = (typeof(req.body.bSId) == 'undefined' || req.body.bSId == 'null') ? uuid.v4() : req.body.bSId;
    if(session_uuid) {
      req.session.chat = { session_id: session_uuid };

      CBots[0].write('hello', function(resp){
        console.log(resp);
      });
    } else {
      console.log("There's problem generating a session id.");
    }
  }

};

