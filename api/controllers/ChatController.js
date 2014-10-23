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

  init: function (req, res) {
    CBots = [new Cleverbot, new Cleverbot];
    //if(CBots) req.session.cbots = CBots;
    return res.json({
      cbots: CBots
    });
  },

  start: function (req, res) {
    //checks if browser session id was generated, if not fallback to node-uuid generator
    var session_uuid = (typeof(req.body.bSId) == 'undefined' || req.body.bSId == 'null') ? uuid.v4() : req.body.bSId;
    console.log(session_uuid);
  }

};

