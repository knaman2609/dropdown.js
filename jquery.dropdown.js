"use strict";

(function($) {

function eachItem(selected, item, id, name) {
  var temp = '';

  if (typeof item[id] == 'undefined') {
   return '<li class="dropdown_item">'+ item[name] +'</li>';  
  }

  if (typeof selected == 'undefined') {
    return  temp = '<li class="dropdown_item" data-id='+ item[id] +'>'+ item[name] +'</li>';  
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
  var dropdownSel = '<div class="dropdown_sel">'+ this.options.mainText+'</div>',
    dropdownArrow = '<div class="dropdown_arrow"></div>';

  this.$element.addClass('dropdown');  
  this.$element.html(dropdownSel + dropdownArrow);

  if (typeof this.options.list != 'undefined') 
  this.addItems(this.options); 
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

Dropdown.prototype.removeItems = function() {
  this.$element.find('.dropdown_list').remove();
}

Dropdown.prototype.addItems = function(options) {
  var content = '', 
    id = this.options.idAttr || 'id',
    name = this.options.nameAttr || 'name',
    items = '';

  if (typeof options.selected != 'undefined') {
    content = '<div class="dropdown_sel">'+ options.selected[name]+'</div>';
    this.$element.find('.dropdown_sel').remove();
  }
  
  if (!options.list.length) {
    this.$element.addClass('dropdown-disabled');
    this.$element.find('.dropdown_sel').text(options.noDataText);
    return;
  } 

  for (var i=0 ;i< options.list.length; i++) {
    items += eachItem(options.selected, options.list[i], id, name);
  }
  
  content += '<ul class="dropdown_list is-hidden">'+ items +'</ul>';
  
  this.$element.append(content);    
}

// plugin defaults
Dropdown.DEFAULTS = {
  mainText: 'Select',
  trigger: null,
  noDataText: 'No data',
  idAttr: 'id',
  nameAttr: 'name'
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



