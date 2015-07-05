"use strict";

(function($) {

function eachItem(selected, item, id, name) {
  var temp = '';

  if (typeof item[id] == 'undefined') {
   return '<li class="dropdown_item">'+ item[name] +'</li>';  
  }

  if (selected[id] == item[id])
  temp = '<li class="dropdown_item dropdown_item-selected" data-id='+  item[id] +'>'+ item[name] +'</li>';
  else
  temp = '<li class="dropdown_item" data-id='+ item[id] +'>'+ item[name] +'</li>';  

  return temp;
} 

var Dropdown = function(element, options) {
  this.$element = element;
  this.options = options;
  this.create();
  this.addListeners();
}

Dropdown.prototype.create = function() {
  var dropdownSel = '<div class="dropdown_sel">'+ this.options.defaultText+'</div>',
    dropdownArrow = '<div class="dropdown_arrow"></div>';

  this.$element.addClass('dropdown');  
  this.$element.html(dropdownSel + dropdownArrow);
}

Dropdown.prototype.open = function() {
  this.$element.find('.dropdown_list').removeClass('is-hidden');
}

Dropdown.prototype.close = function() {
  this.$element.find('.dropdown_list').addClass('is-hidden');
}

Dropdown.prototype.selectedItem = function($item) {
  this.$element.find('.dropdown_sel').text($item.text());
  this.$element.find('.dropdown_item').removeClass('dropdown_item-selected');
  $item.addClass('dropdown_item-selected');
  this.$element.find('.dropdown_list').addClass('is-hidden');

  if (this.options.trigger)
  this.options.trigger($item, this.$element);
}

Dropdown.prototype.addListeners = function() {
  var self = this;

  this.$element.on('click', function(e) {
    e.stopPropagation();

    var $target = $(e.target),
      close;

    if ($target.hasClass('dropdown_sel')) {
      close = self.$element.find('.dropdown_list').hasClass('is-hidden');

       // hide all dropdowns
      $('.dropdown_list').addClass('is-hidden');

      if (close) self.open();
      else self.close();
    }

    if ($target.hasClass('dropdown_item')) 
    self.selectedItem($target);

    e.stopPropagation();
  });  

  $(document).click(function() {
    $('.dropdown_list').addClass('is-hidden');
  });
}



Dropdown.prototype.addItems = function(options) {
  var content = '', 
    id = options.idAttr || 'id',
    name = options.nameAttr || 'name',
    items = '',
    dropdownSel = '<div class="dropdown_sel">'+ options.selected[name]+'</div>';
    
  content += dropdownSel;
  for (var i=0 ;i< options.list.length; i++) {
    items += eachItem(options.selected, options.list[i], id, name);
  }
  
  content += '<ul class="dropdown_list is-hidden">'+ items +'</ul>';
  
  this.$element.find('.dropdown_sel').remove();
  this.$element.append(content);    
}

// plugin defaults
Dropdown.DEFAULTS = {
  defaultText: 'Test',
  trigger: null
}

// creates the Plugin
function Plugin(option) {
    var data  = this.data('plugin.dropdown'),
    options = $.extend({}, Dropdown.DEFAULTS, this.data(), option),
    dropdown;

    if (!data) {
      dropdown =  new Dropdown(this, options);
      this.data('plugin.dropdown', (data = dropdown));
    }

    return dropdown;
}

$.fn.dropdown = Plugin;
})(jQuery) 



