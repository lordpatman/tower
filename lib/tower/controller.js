var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Tower.Controller = (function() {

  __extends(Controller, Tower.Class);

  Controller.extend(Tower.Support.EventEmitter);

  Controller.include(Tower.Support.EventEmitter);

  function Controller() {
    this.constructor.instance = this;
    this.headers = {};
    this.status = 200;
    this.request = null;
    this.response = null;
    this.contentType = null;
    this.params = {};
    this.query = {};
    this.resourceName = this.constructor.resourceName();
    this.resourceType = this.constructor.resourceType();
    this.collectionName = this.constructor.collectionName();
    this.formats = _.keys(this.constructor.mimes());
    if (this.constructor._belongsTo) {
      this.hasParent = true;
    } else {
      this.hasParent = false;
    }
  }

  return Controller;

})();

require('./controller/caching');

require('./controller/callbacks');

require('./controller/helpers');

require('./controller/http');

require('./controller/instrumentation');

require('./controller/params');

require('./controller/redirecting');

require('./controller/rendering');

require('./controller/resourceful');

require('./controller/responder');

require('./controller/responding');

require('./controller/sockets');

Tower.Controller.include(Tower.Support.Callbacks);

Tower.Controller.include(Tower.Controller.Caching);

Tower.Controller.include(Tower.Controller.Callbacks);

Tower.Controller.include(Tower.Controller.Helpers);

Tower.Controller.include(Tower.Controller.HTTP);

Tower.Controller.include(Tower.Controller.Instrumentation);

Tower.Controller.include(Tower.Controller.Params);

Tower.Controller.include(Tower.Controller.Redirecting);

Tower.Controller.include(Tower.Controller.Rendering);

Tower.Controller.include(Tower.Controller.Resourceful);

Tower.Controller.include(Tower.Controller.Responding);

Tower.Controller.include(Tower.Controller.Sockets);

require('./controller/renderers');

module.exports = Tower.Controller;
