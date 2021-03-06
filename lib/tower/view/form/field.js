var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; }, __slice = Array.prototype.slice;

Tower.View.Form.Field = (function() {

  __extends(Field, Tower.View.Component);

  function Field(args, options) {
    var classes, inputType;
    Field.__super__.constructor.apply(this, arguments);
    options.as || (options.as = attribute.inputType(options));
    this.inputType = inputType = options.as;
    this.inputs = [];
    classes = [Tower.View.fieldClass, inputType];
    if (!(["submit", "fieldset"].indexOf(inputType) > -1)) {
      classes.push(attribute.required ? Tower.View.requiredClass : Tower.View.optionalClass);
      classes.push(attribute.errors ? Tower.View.errorClass : Tower.View.validClass);
      if (options.validate !== false && (attribute.validations.present != null)) {
        classes.push(Tower.View.validateClass);
      }
    }
    attributes["class"] = this.addClass(attributes["class"], classes);
    if ((attributes.id != null) && Tower.View.idEnabledOn.indexOf("field") > -1) {
      attributes.id = attribute.toId({
        type: "field",
        index: index,
        parentIndex: parentIndex
      });
    }
    if (!(["hidden", "submit"].indexOf(inputType) > -1)) {
      this.errors = options.slice("richInput", "errorHtml", "error", "model", "index", "parentIndex", "attribute", "template");
      this.label = options.slice("richInput", "labelHtml", "label", "model", "index", "parentIndex", "attribute", "template");
      this.hints = options.slice("richInput", "hintHtml", "hint", "model", "index", "parentIndex", "attribute", "template");
    }
    if (inputType !== "fieldset") {
      this.inputAttributes = defaultOptions.merge(attributes.except("id", "class", "fieldHtml", "attributes", "errorHtml", "labelHtml", "hintHtml"));
    }
    mergeClass(options.fieldHtml["class"], attributes["class"]);
    this.attributes = options.fieldHtml.merge({
      id: attributes.id
    });
  }

  Field.prototype.input = function() {
    var args, key, options;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    options = args.extractOptions;
    key = args.shift || attribute.name;
    return this.inputs.push(inputFor(inputType, key, options));
  };

  Field.prototype.render = function(block) {
    var _this = this;
    return this.tag(Tower.View.fieldTag, this.attributes, function() {
      return _this.tag("input", {
        type: "email"
      });
    });
  };

  Field.prototype.inputFor = function(key, attribute, options) {
    if (options == null) options = {};
    return Tower.View.Form.Input.find(key)["new"](this.inputAttributes.merge(options));
  };

  Field.prototype.extractElements = function(options) {
    var elements, _base;
    if (options == null) options = {};
    elements = [];
    if (typeof (_base = ["hidden", "submit"]).include === "function" ? _base.include(inputType) : void 0) {
      elements.push("inputs");
    } else {
      if ((this.label.present != null) && (this.label.value != null)) {
        elements.push("label");
      }
      elements = elements.concat(["inputs", "hints", "errors"]);
    }
    return elements;
  };

  return Field;

})();
