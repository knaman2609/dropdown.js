"use strict";

(function($) {

function eachItem(selected, item, id, name) {
  var $tpl = $(this.options.itmTpl.tpl),
    _class = this.options.itmTpl.txtClass

  if (_class)
  $tpl.find('.'+ _class).text(item[name]);
  else
  $tpl.text(item[name]);  

  if (typeof item[id] == 'undefined') {
    return $tpl;
  }

  if (typeof selected == 'undefined') {
    return  $tpl.data('id', item[id]);
  }

  if (selected[id] == item[id])
  return $tpl.data('id', item[id]).addClass('dropdown_item-selected');

  else
  return  $tpl.data('id', item[id]);
} 

function isClose(el) {
  var close = true;

  if (el.$element.hasClass('is-active'))
  close = false; 
  
  return close;
}

function updateSelItem (name) {
  var _class = this.options.selTpl.txtClass;
  
  if (_class)  
  this.$element.find('.dropdown_sel .'+ _class).text(name);
  else 
  this.$element.find('.dropdown_sel').text(name);
}

function selectedItem ($item) {
  var _class = this.options.itmTpl.txtClass,
    txt;
  
  if (_class)  
  txt = $item.find('.'+ _class).text();
  else 
  txt = $item.text();

  updateSelItem.call(this, txt);

  this.$element.find('.dropdown_item').removeClass('dropdown_item-selected');
  $item.addClass('dropdown_item-selected');
  this.close();

  if (this.options.trigger)
  this.options.trigger($item, this.$element);
}

function create() {
   var $selTpl = $(this.options.selTpl.tpl) ,
    _class = this.options.selTpl.txtClass,
    $selWrapper  = $('<div class="dropdown_selWrapper"></div>'),
    arrow = '<div class="dropdown_arrow"></div>',
    list = '<ul class="dropdown_list dropdown_list-'+ this.options.effect +'"></ul>';

  if (_class)  
  $selTpl.find('.'+ _class).text(this.options.mainText);
  else 
  $selTpl.text(this.options.mainText);
  
  $selWrapper.html($selTpl);
  $selWrapper.append(arrow);

  this.$element.addClass('dropdown');  
  this.$element.append($selWrapper);
  this.$element.append(list);

  if (typeof this.options.list != 'undefined') 
  this.addItems(this.options); 
}

function addListeners() {
  var self = this;

  this.$element.on('click', function(e) {
    e.stopPropagation();
  });  

  this.$element.find('.dropdown_selWrapper').on('click', function() {
    var close = isClose(self);
    self.closeAll();

    if (close) self.open();
    else self.close();
  });

  this.$element.find('.dropdown_item').on('click', function() {
    selectedItem.call(self, $(this));
  });

  $(document).click(function() {
    self.closeAll();
  });
}

var Dropdown = function(element, options) {
  this.$element = element;
  this.options = options;
  create.call(this);
}

Dropdown.prototype.append = function(el) {
  this.$element.find('.dropdown_list').append(el);
};

Dropdown.prototype.open = function() {
  this.$element.addClass('is-active '+ this.options.effect);
}

Dropdown.prototype.close = function() {
  this.$element.removeClass('is-active '+ this.options.effect);
}

Dropdown.prototype.closeAll = function() {
  $('.dropdown').removeClass('is-active '+ this.options.effect);
}

Dropdown.prototype.removeItems = function() {
  this.$element.find('.dropdown_list').html();
}

Dropdown.prototype.disable = function  (argument) {
  this.$element.addClass('is-disabled');
  this.$element.find('.dropdown_sel').text(this.options.noDataText);
}

Dropdown.prototype.addItems = function(options) {
  var  id = this.options.idAttr,
    name = this.options.nameAttr,
    items = '';

  if (typeof options.selected != 'undefined') {
    updateSelItem.call(this, options.selected[name])
  }
  
  if (!options.list.length) {
    this.disable();  
    return;
  } 

  for (var i=0 ;i< options.list.length; i++) {
    this.$element.find('.dropdown_list').append(eachItem.call(this, options.selected, options.list[i], id, name));
  }
  
  addListeners.call(this);
}

// plugin defaults
Dropdown.DEFAULTS = {
  mainText: 'Select',
  trigger: null,
  noDataText: 'No data',
  idAttr: 'id',
  nameAttr: 'name',
  selTpl: {tpl: '<div class="dropdown_sel"></div>', txtClass: null},
  itmTpl: {tpl: '<li class="dropdown_item"></li>', txtClass: null},
  effect: 'effect2'
}

// creates the Plugin
function Plugin(option) {
    var data  = this.data('plugin.dropdown'),
    options = $.extend({}, Dropdown.DEFAULTS, option),
    dropdown = false;

    if (!data) {
      dropdown =  new Dropdown(this, options);
      this.data('plugin.dropdown', (data = dropdown));
    }

    return dropdown;
}

$.fn.dropdown = Plugin;
})(jQuery) 



