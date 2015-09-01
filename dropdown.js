/**
 * @namespace dropdown
 */
;(function(root, factory) {
  'use strict';

  if (typeof exports === 'object') {

    // CommonJS module
    // Load jQuery as a dependency
    var jQuery;
    try {jQuery = require('jquery'); } catch (e) {}

    module.exports = factory(jQuery, root);
  } else {
    root.Dropdown = factory(root.jQuery, root);
  }
}

(this, function($) {
  'use strict';

  /**
   * create each dropdown item
   * @param  {Object} selected - selected item from the list
   * @param  {Object} item     - dropdown item
   * @param  {number} id       - id to be attached to each item
   * @param  {string} name     - key to use for text
   * @return {Object}          - jquery dropdown item
   */
  var eachItem = function(selected, item, id, name) {
    var $tpl = $('<div class="dropdown__item"></div>');
    var customTplInner = this.options.itmTpl;

    if (customTplInner.hasOwnProperty('tpl')) {
      $tpl.html(customTplInner.tpl);
      $tpl.find('.' + customTplInner._class).text(item[name]);
    } else {
      $tpl.text(item[name]);
    }

    if (typeof item[id] === 'undefined') {
      return $tpl;
    }

    if (!selected) {
      return $tpl.data('id', item[id]);
    }

    if (selected[id] === item[id])
    return $tpl.data('id', item[id]).addClass('item-selected');

    else
    return $tpl.data('id', item[id]);
  };

  /**
   * tells if the dropdown is close or not
   * @param  {Object}  el - jquery object
   * @return {Boolean}    returns true on close
   */
  var isClose = function(el) {
    var close = true;

    if (el.$element.hasClass('is-active'))
    close = false;

    return close;
  };

  /**
   * update the selected item on the main div
   * @param  {string} name - main text
   */
  var updateSelItem = function(name) {
    var _class = this.options.selTpl._class;

    if (_class)
    this.$selected.find('.' + _class).text(name);
    else
    this.$selected.text(name);
  };

  /**
   * handle the clicked item
   * @param  {Object} $item - jquery dropdown__item
   */
  var selectedItem = function($item) {
    var _class = this.options.itmTpl._class;
    var txt;

    if (_class)
    txt = $item.find('.' + _class).text();
    else
    txt = $item.text();

    updateSelItem.call(this, txt);

    this.$element.find('.dropdown__item').removeClass('item-selected');
    $item.addClass('item-selected');
    this.close();

    if (this.options.onSelect)
    this.options.onSelect($item, this.$element);
  };

  /**
   * create  the divs for dropdown
   */
  var create = function() {
    var $selWrapper  = $('<div class="dropdown__selected-wrapper"></div>');
    var $selTpl = $('<div class="dropdown__selected"></div>');
    var arrow = '<div class="dropdown__arrow"></div>';
    var list = '<div class="dropdown__list-wrapper"><ul class="dropdown__list"></ul></div>';
    var customSelInner = this.options.selTpl;

    // if custom inner  is present
    // insert it into $selTpl and the text in _class
    if (customSelInner.hasOwnProperty('tpl')) {
      $selTpl.html(customSelInner.tpl);
      $selTpl.find('.' + customSelInner._class).text(this.options.mainText);
    } else {
      $selTpl.text(this.options.mainText);
    }

    $selWrapper.html($selTpl);
    $selWrapper.append(arrow);
    this.$element.addClass('dropdown');
    this.$element.append($selWrapper);
    this.$element.append(list);
  };

  /**
   * make sure the item biend navigated or
   * searched in in the dropdown view
   */
  var ensureWithinView = function() {
    var itemH = this.itemH;
    var scrollTop = this.$list.scrollTop();
    var scrollReq;

    if (this.currPosition === this.bottomScrewed) {
      scrollReq = scrollTop +  itemH * 1;
      this.bottomScrewed++;
      this.topScrewed++;
    } else if (this.currPosition === this.topScrewed) {
      scrollReq = scrollTop - itemH * 1;
      this.bottomScrewed--;
      this.topScrewed--;
    }

    this.$list.scrollTop(scrollReq);
  };

  /**
   * scroll up
   */
  var scrollUp = function() {
    if (this.currPosition === -1)
    return;

    if (this.currPosition < 1)
    return;

    this.currPosition--;
    this.currEl.removeClass('scrolled');
    this.currEl = this.currEl.prev();
    this.currEl.addClass('scrolled');
    ensureWithinView.call(this);
  };

  /**
   * scroll down
   */
  var scrollDown = function() {
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
  };

  /**
   * search a char
   */
  var searchThis = function() {
    var searchChar = this.searchChar;
    var name = this.options.nameAttr;
    var id = this.options.idAttr;
    var searchFound = null;
    var list = this.list;
    var $items = this.$element.find('.dropdown__item');
    var index;
    var $node;
    var diff;

    for (var i = 0 ; i < list.length; i++) {
      if (searchChar === list[i][name][0].toLowerCase()) {
        searchFound = list[i][id];
        index = i;
        break;
      }
    }

    if (!searchFound)
    return;

    $items.each(function() {
      if (searchFound === $(this).data('id')) {
        $node = $(this);
        return false;
      }
    });

    $items.removeClass('scrolled');
    $node.addClass('scrolled');
    this.$list.scrollTop(this.itemH * index);
    this.currEl = $node;
    this.currPosition = index;
    diff = this.length - index;

    if (diff >= this.maxEl) {
      this.topScrewed = index - 1;
      this.bottomScrewed = index + this.maxEl;
    } else {
      this.topScrewed = this.length - this.maxEl - 1;
      this.bottomScrewed = this.length ;
    }
  };

  /**
   * down arrow key
   */
  var keyCode40 = function() {
    if (this.$element.hasClass('is-active')) {
      scrollDown.call(this);
    } else {
      this.closeAll();
      this.open();
    }
  };

  /**
   * up arrow key
   */
  var keyCode38 = function() {
    scrollUp.call(this);
  };

  /**
   * enter key
   */
  var keyCode13 = function() {
    if (isClose(this))
    return;

    selectedItem.call(this, this.currEl);
  };

  /**
   * any other key for search
   * @param  {number} keyCode - char keycode
   */
  var anyOtherKey = function(keyCode) {
    if (isClose(this))
    return;

    this.searchChar = String.fromCharCode(keyCode).toLowerCase();
    searchThis.call(this);
  };

  /**
   * handle various key codes
   */
  var listenToKeyCodes = function() {
    var _this = this;
    var keyCode;

    this.$element.off('keydown');

    this.$element.on('keydown', function(e) {
      keyCode = e.which;

      switch (keyCode) {
        case 40:
          keyCode40.call(_this);
          break;
        case 38:
          keyCode38.call(_this);
          break;
        case 13:
          keyCode13.call(_this);
          break;
        default:
          anyOtherKey.call(_this, keyCode);
      }
    });
  };

  /**
   * attach events to dropdown on focus
   */
  var addKeyEvents = function() {
    var _this = this;

    this.$element.on('focus', listenToKeyCodes.bind(_this));
  };

  /**
   * attach events for click
   * and keyevents for selectbox
   */
  var addListeners = function() {
    var _this = this;

    this.$element.on('click', function(e) {
      e.stopPropagation();
    });

    // if clicked on dropdown selected-wrapper
    this.$element.find('.dropdown__selected-wrapper').on('click', function() {
      var close = isClose(_this);
      _this.closeAll();

      if (close) _this.open();
      else _this.close();
    });

    // if clicked on dropdown item
    this.$element.find('.dropdown__list').on('click', '.dropdown__item',  function() {
      selectedItem.call(_this, $(this));
    });

    // attach click to document for closeall
    // if `window.dropdown.documentClick` is false
    if (!window.dropdown.documentClick) {
      $(document).click(function() {
        _this.closeAll();
      });

      window.dropdown.documentClick = true;
    }

    // add keyboard events for selectbox
    if (this.options.type === 'selectBox') {
      addKeyEvents.call(this);
    }
  };

  /**
   * throw error for invalid options
   * @param  {Object} options
   */
  var validateOptions = function(options) {
    if (typeof options !== 'object')
    throw('options is not an object');

    if (!options.field || typeof options.field !== 'object' || !(options.field instanceof $))
    throw('field is either not present or is not a jquery object');

    if (typeof options.list !=='undefined' && options.list.constructor !== Array)
    throw('list should be an array');
  };

  /**
   * fetch data for list from the url
   * if parse is defined as a function use the returned value
   * @param {string} - url for get req
   */
  var fetchData = function(url) {
    var parse = this.options.parse;
    var _this = this;
    var res;

    $.get(url, function(data) {
      if (typeof parse === 'function') {
        res = parse(data);
        _this.options.list = res.list;
        _this.options.selected = res.selected;
      } else {
        _this.options.list = data;
      }

      _this.initItems();
    });
  };

  /**
   * Dropdown constructor
   * @constructor
   * @param {Object} options - options provided for dropdown
   * @memberOf dropdown
   */
  var Dropdown = function(options) {
    validateOptions(options);

    this.options = $.extend({}, this.DEFAULTS, options);
    this.$element = this.options.field;

    // attch  the dropdown obj to window if does not exist
    if (typeof window.dropdown === 'undefined')
    window.dropdown = dropdown;

    // creates the dropdown divs
    create.call(this);

    this.$selected = this.$element.find('.dropdown__selected');
    this.$list = this.$element.find('.dropdown__list');

    // attach the click/key events
    addListeners.call(this);
    this.list = [];

    // create list if list provided
    if (this.options.list)
    this.initItems();
    else if (this.options.url)
    fetchData.call(this, this.options.url);

    // if option type is selectbox
    if (this.options.type === 'selectBox') {
      this.$element.attr('tabindex', '0');
      this.currPosition = -1;
      this.length = this.options.list.length;
      this.topScrewed = -1;
      this.itemH = this.$element.find('.dropdown__item').outerHeight();
      this.currEl = null;
      this.maxEl = Math.floor(this.options.scrollOn / this.itemH);
      this.bottomScrewed =  this.maxEl;
    }

    // push the current dropdown in the dropdown.arr
    window.dropdown.arr.push(this);
  };

  /**
   * addCustom el like datepicker
   * @param {Object} el - jquery obj
   * @memberOf dropdown
   */
  Dropdown.prototype.addCustom = function(el) {
    this.$element.find('.dropdown__list').append(el);
  };

  /**
   * open the dropdown
   * @memberOf dropdown
   */
  Dropdown.prototype.open = function() {
    if (this.$element.hasClass('is-disabled') || !isClose(this))
    return;

    this.$element.addClass('is-active');
    $(this).trigger('open');
  };

  /**
   * close the dropdown
   * @memberOf dropdown
   */
  Dropdown.prototype.close = function() {
    if (isClose(this))
    return;

    this.$element.removeClass('is-active');
    $(this).trigger('close');
  };

  /**
   * closeAll the dropdowns
   * iterate through the window.dropdown.arr and call the method close
   * @memberOf dropdown
   */
  Dropdown.prototype.closeAll = function() {
    var dropdowns = window.dropdown.arr;

    for (var i = 0; i< dropdowns.length; i++) {
      if (!isClose(dropdowns[i])) {
        dropdowns[i].close();
      }
    }
  };

  /**
   * remove all the list items
   * @memberOf dropdown
   */
  Dropdown.prototype.removeItems = function() {
    this.list = [];
    this.$list.html('');
  };

  /**
   * disable the dropdown
   * add/remove is-disabled class
   * @param {boolean} bool - if true disable else enable
   * @memberOf dropdown
   */
  Dropdown.prototype.disable = function(bool) {
    if (bool) {
      this.$element.addClass('is-disabled');
      updateSelItem.call(this, this.options.noDataText);
    } else {
      this.$element.removeClass('is-disabled');
      updateSelItem.call(this, this.options.mainText);
    }
  };

  /**
   * update text on the selected
   * if list is empty will replace with noDatatext
   * @param  {Object} option - {name : '', id: ''}
   * @param  {boolean} bool  - if the element is present in list
   */
  Dropdown.prototype.updateSelected = function(option,  bool) {
    var name = this.options.nameAttr;
    var id = this.options.idAttr;
    var list = this.list;
    var text;

    if (!this.list.length)
    text = this.options.noDatatext;
    else
    text = option[name];

    updateSelItem.call(this, text);
    this.$element.find('.dropdown__item').removeClass('item-selected');
    this.close();

    // if bool is true find the element in the dropdown and
    // highlight it
    if (bool) {
      this.$element.find('.dropdown__item').each(function() {
        if ($(this).data('id') === option[id]) {
          $(this).addClass('item-selected');
          return false;
        }
      });
    }
  };

  /**
   * addItem to dropdown
   * @param {Array} options - list: [{name: '', id: ''}]
   * @memberOf dropdown
   */
  Dropdown.prototype.addItems = function(list) {
    var id = this.options.idAttr;
    var name = this.options.nameAttr;
    var selected = this.options.selected;

    for (var i = 0 ; i < list.length; i++) {
      this.$list.append(eachItem.call(this, selected, list[i], id, name));
    }

    // populate the list
    this.list =  this.list.concat(list);
  };

  /**
   * initialse the dropdown with items provided
   */
  Dropdown.prototype.initItems = function() {
    var name = this.options.nameAttr;

    if (this.options.selected) {
      updateSelItem.call(this, this.options.selected[name]);
    }

    if (!this.options.list.length) {
      this.disable(true);
      return;
    }

    this.addItems(this.options.list);
  };

  /**
   * add dropdown items at the top
   * @param  {Object} options - {list: []}
   */
  Dropdown.prototype.prependItems = function(options) {
    var id = this.options.idAttr;
    var name = this.options.nameAttr;

    for (var i = 0 ; i < options.list.length; i++) {
      this.$list.prepend(eachItem.call(this, options.selected, options.list[i], id, name));
    }
  };

  /**
   * dropdown object will be attached to the window object only once
   * `arr`  will store all the dropdown object instances
   * useful for close all method
   * @type {Object}
   */
  var dropdown = {
    documentClick: false,
    arr: [],
  };

  // Defaults
  Dropdown.prototype.DEFAULTS = {
    field: null,
    mainText: 'Select',
    list: null,
    selected: null,
    onSelect: null,
    idAttr: 'id',
    nameAttr: 'name',
    noDataText: 'No data',
    selTpl: {},
    itmTpl: {},
    type: 'dropdown',
    scrollOn: 200,
    url: null,
    parse: null,
  };

  return Dropdown;
}));
