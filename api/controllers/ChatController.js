/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

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
    console.log(req.body.cbots);
  }

};

