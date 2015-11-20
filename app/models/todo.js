var mongoose = require('mongoose');

// ================================== //
//              MODELS                //
// ================================== //

module.exports = mongoose.model('Todo', {
  text : String,
  done: Boolean
});