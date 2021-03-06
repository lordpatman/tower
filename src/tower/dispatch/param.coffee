class Tower.Dispatch.Param
  @perPage:       20
  @sortDirection: "ASC"
  @sortKey:       "sort"                 # or "order", etc.
  @limitKey:      "limit"                # or "perPage", etc.
  @pageKey:       "page"
  @separator:     "_"                    # or "-"
  
  @create: (key, options) ->
    options.type ||= "String"
    new Tower.Dispatch.Param[options.type](key, options)
    
  constructor: (key, options = {}) ->
    @controller = options.controller
    @key        = key
    @attribute  = options.as || @key
    @modelName  = options.modelName
    @namespace  = Tower.Support.String.pluralize(@modelName) if modelName?
    @exact      = options.exact || false
    @default    = options.default
  
  parse: (value) -> value
  
  render: (value) -> value
  
  toCriteria: (value) ->
    nodes     = @parse(value)
    criteria  = new Tower.Model.Criteria
    for set in nodes
      for node in set
        attribute = node.attribute
        operator  = node.operators[0]
        query = {}
        if operator == "$eq"
          query[attribute] = node.value
        else
          query[attribute] = {}
          query[attribute][operator] = node.value
          
        criteria.where(query)
    criteria
  
  parseValue: (value, operators) ->
    namespace: @namespace, key: @key, operators: operators, value: value, attribute: @attribute
  
  _clean: (string) ->
    string.replace(/^-/, "").replace(/^\+-/, "").replace(/^'|'$/, "").replace("+", " ").replace(/^\^/, "").replace(/\$$/, "").replace(/^\s+|\s+$/, "")

require './param/array'
require './param/date'
require './param/number'
require './param/string'

module.exports = Tower.Dispatch.Param
