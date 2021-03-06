var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Tower.View.Form = (function() {

  __extends(Form, Tower.View.Component);

  function Form(args, options) {
    var klass;
    Form.__super__.constructor.apply(this, arguments);
    this.model = args.shift();
    if (typeof this.model === "string") {
      klass = Tower.constant(Tower.Support.String.camelize(this.model));
      this.model = klass ? new klass : null;
    }
    this.attributes = this._extractAttributes(args.pop());
  }

  Form.prototype.render = function(callback) {
    var _this = this;
    return this.tag("form", this.attributes, function() {
      var builder;
      _this.tag("input", {
        type: "hidden",
        name: "_method",
        value: _this.attributes["data-method"]
      });
      if (callback) {
        builder = new Tower.View.Form.Builder([], {
          template: _this.template,
          tabindex: 1,
          accessKeys: {},
          model: _this.model
        });
        return builder.render(callback);
      }
    });
  };

  Form.prototype._extractAttributes = function(options) {
    var attributes, method;
    if (options == null) options = {};
    attributes = options.html || {};
    attributes.action = options.url;
    if (options.hasOwnProperty("class")) attributes["class"] = options["class"];
    if (options.hasOwnProperty("id")) attributes.id = options.id;
    if (options.multipart || attributes.multipart === true) {
      attributes.enctype = "multipart/form-data";
    }
    attributes.role = "form";
    attributes.novalidate = "true";
    if (options.hasOwnProperty("validate")) {
      attributes["data-validate"] = options.validate.toString();
    }
    method = attributes.method || options.method;
    if (!method || method === "") {
      if (this.model && this.model.isNew()) {
        method = "post";
      } else {
        method = "post";
      }
    }
    attributes["data-method"] = method;
    attributes.method = method === "get" ? "get" : "post";
    return attributes;
  };

  return Form;

})();

require('./form/builder');

require('./form/fieldset');

require('./form/field');

module.exports = Tower.View.Form;
