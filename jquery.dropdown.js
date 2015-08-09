"use strict";

(function($) {

function eachItem(selected, item, id, name) {
  var $tpl = $('<div class="dropdown__item"></div>'),
    customTplInner = this.options.itmTpl;
  
  if (customTplInner.hasOwnProperty('tpl')) {
    $tpl.html(customTplInner.tpl);
    $tpl.find('.'+ customTplInner._class).text(item[name]);
  } 
  else {
    $tpl.text(item[name]);  
  } 

  if (typeof item[id] == 'undefined') {
    return $tpl;
  }

  if (typeof selected == 'undefined') {
    return  $tpl.data('id', item[id]);
  }

  if (selected[id] == item[id])
  return $tpl.data('id', item[id]).addClass('item-selected');

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
  var _class = this.options.selTpl._class;
  
  if (_class)  
  this.$selected.find('.'+ _class).text(name);
  else 
  this.$selected.text(name);
}

function selectedItem ($item) {
  var _class = this.options.itmTpl._class,
    txt;
  
  if (_class)  
  txt = $item.find('.'+ _class).text();
  else 
  txt = $item.text();

  updateSelItem.call(this, txt);

  this.$element.find('.dropdown__item').removeClass('item-selected');
  $item.addClass('item-selected');
  this.close();

  if (this.options.trigger)
  this.options.trigger($item, this.$element);
}

function create() {
   var $selTpl = $('<div class="dropdown__selected"></div>'),
    customSelInner = this.options.selTpl,
    $selWrapper  = $('<div class="dropdown__selected-wrapper"></div>'),
    arrow = '<div class="dropdown__arrow"></div>',
    list = '<div class="dropdown__list-wrapper"><ul class="dropdown__list"></ul></div>';

  if (customSelInner.hasOwnProperty('tpl')) {
    $selTpl.html(customSelInner.tpl);
    $selTpl.find('.'+ customSelInner._class).text(this.options.mainText);
  } 
  else {
    $selTpl.text(this.options.mainText);
  } 

  $selWrapper.html($selTpl);
  $selWrapper.append(arrow);

  this.$element.addClass('dropdown');  
  this.$element.append($selWrapper);
  this.$element.append(list);

  this.$selected = $selTpl;
  this.$list = this.$element.find('.dropdown__list');

  if (typeof this.options.list != 'undefined') 
  this.addItems(this.options); 
}

function ensureWithinView () {
  var listH = this.listH,
    itemH = this.itemH,
    scrollTop = this.$list.scrollTop(),
    scrollReq;

  if (this.currPosition == this.bottomScrewed) {
    scrollReq = scrollTop +  itemH*1;
    this.bottomScrewed++;
    this.topScrewed++;
  }
  else if (this.currPosition == this.topScrewed) {
    scrollReq = scrollTop - itemH*1;
    this.bottomScrewed--;
    this.topScrewed--;
  }

  console.log(this.bottomScrewed);
  this.$list.scrollTop(scrollReq);
}

function scrollUp() {
  if (!this.currPosition == -1 || this.currPosition < 1)
  return
  
  this.currPosition--;
  this.currEl.removeClass('scrolled');
  this.currEl = this.currEl.prev();
  this.currEl.addClass('scrolled');   
  ensureWithinView.call(this);
}

function scrollDown() {
  if (this.currPosition >= this.length - 1)
  return;
  
  if (!this.currEl) {
    this.currPosition++;
    this.currEl = this.$element.find('.dropdown__item:first-child');
    this.currEl.addClass('scrolled');
    return;
  }

  this.currPosition++;

  this.currEl.removeClass('scrolled');
  this.currEl = this.currEl.next();
  this.currEl.addClass('scrolled');

  ensureWithinView.call(this);
}

function searchThis() {
  var searchChar = this.searchChar,
    name = this.options.nameAttr,
    id = this.options.idAttr,
    searchFound = null,
    $node,
    $items = this.$element.find('.dropdown__item'),
    index,
    diff,
    list = this.list;

  for (var i=0 ; i< list.length; i++) {
    if (searchChar == list[i][name][0].toLowerCase()) {
      searchFound = list[i][id];
      index = i;
      break;
    }
  }

  if (!searchFound)
  return;
  
  console.log(searchFound);
  $items.each(function() {
    if (searchFound == $(this).data('id')) {
      $node = $(this);
      return false;
    }
  });

  $items.removeClass('scrolled');
  $node.addClass('scrolled');
  this.$list.scrollTop(this.itemH*index);
  this.currEl = $node;

  this.currPosition = index;

  diff = this.length - index;
  if (diff >= this.maxEl) {
    this.topScrewed = index - 1;
    this.bottomScrewed = index + this.maxEl;
  }
  else {
    this.topScrewed = this.length - this.maxEl -1;
    this.bottomScrewed = this.length ;
  }

  console.log(this.topScrewed);
  console.log(this.bottomScrewed);
}

function listenToKeyCodes() {
  var self = this,
    keyCode;  

  this.$element.off('keydown');

  this.$element.on('keydown', function(e) {
    keyCode = e.which;

    if (keyCode == 40) {
      if (self.$element.hasClass('is-active')) {
        scrollDown.call(self);
      } 
      else {
        self.closeAll();
        self.open();
      }
    }
    else if (keyCode == 38) {
      scrollUp.call(self);
    }
    else if (keyCode == 13) {
      if (isClose(self))
      return;

      selectedItem.call(self, self.currEl);
    }
    else {
      if (isClose(self))
      return;

      self.searchChar = String.fromCharCode(keyCode).toLowerCase();
      searchThis.call(self);
    }
  });
}

function addKeyEvents() {
  var self = this;
  this.$element.on('focus', function(e) {
    listenToKeyCodes.call(self);
  });
}

function calculateVars() {
  if (typeof this.listH == 'undefined') {
    this.listH = this.$list.outerHeight();
    this.maxEl = Math.floor(this.listH/this.itemH);
    this.bottomScrewed =  this.maxEl;

    console.log(this.bottomScrewed);
  }
}

function addListeners() {
  var self = this;

  this.$element.on('click', function(e) {
    e.stopPropagation();
  });  

  this.$element.find('.dropdown__selected-wrapper').on('click', function() {
    var close = isClose(self);
    self.closeAll();

    if (close) self.open();
    else self.close();
  });

  this.$element.find('.dropdown__item').on('click', function() {
    selectedItem.call(self, $(this));
  });

  $(document).click(function() {
    self.closeAll();
  });

  if (this.options.type == 'selectBox') {
    addKeyEvents.call(this);
  }
}

var Dropdown = function(element, options) {
  this.$element = element;
  this.options = options;
  create.call(this);
}


Dropdown.prototype.open = function() {
  var self = this;
  this.$element.addClass('is-active');

  if (this.options.type == 'selectBox') {
    setTimeout(function() {
      calculateVars.call(self);
    },600);
  }
}

Dropdown.prototype.close = function() {
  this.$element.removeClass('is-active')
}

Dropdown.prototype.closeAll = function() {
  $('.dropdown').removeClass('is-active');
}

Dropdown.prototype.removeItems = function() {
  this.$list.html();
}

Dropdown.prototype.disable = function  (argument) {
  this.$element.addClass('is-disabled');
  this.$selected.text(this.options.noDataText);
}

Dropdown.prototype.addItems = function(options) {
  var  id = this.options.idAttr,
    name = this.options.nameAttr;

  this.$items = this.$element.find('.dropdown__item');

  if (typeof options.selected != 'undefined') {
    updateSelItem.call(this, options.selected[name])
  }
  
  if (!options.list.length) {
    this.disable();  
    return;
  } 

  for (var i=0 ;i< options.list.length; i++) {
    this.$list.append(eachItem.call(this, options.selected, options.list[i], id, name));
  }
  
  addListeners.call(this);

  if (this.options.type == 'selectBox') {
    this.$element.attr('tabindex', '0');
    this.currPosition = -1;
    this.length = options.list.length;
    this.topScrewed = -1;
    this.itemH = this.$element.find('.dropdown__item').outerHeight();
    this.list = options.list;
    self.currEl = null;
  }
}

// plugin defaults
Dropdown.DEFAULTS = {
  mainText: 'Select',
  trigger: null,
  noDataText: 'No data',
  idAttr: 'id',
  nameAttr: 'name',
  selTpl: {},
  itmTpl: {},
  type: 'dropdown'
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



