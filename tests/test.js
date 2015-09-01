var chai;
var sinon;
var sinonChai;
var expect;

var $;
var Dropdown;
var jsdom;

// for running from terminal
if (typeof exports === 'object') {
  sinon = require('sinon');
  sinonChai = require('sinon-chai');
  chai = require('chai');
  expect = chai.expect;
  chai.use(sinonChai);

  jsdom = require('jsdom').jsdom;
  document = jsdom('<html><body></body></html>', {});
  window = document.defaultView;

  Dropdown = require('../dropdown.js');

  $ = require('jquery');
} else {
  expect = chai.expect;
  Dropdown = window.Dropdown;
  $ = window.jQuery;
}

describe('Dropdown', function() {
  context('Constructor and option errors', function() {
    it('should  be a function', function() {
      expect(Dropdown).to.be.a('function');
    });

    it('should throw error if options is not an object', function() {
      expect(function() {
        new Dropdown('');
      }).to.throw('options is not an object');
    });

    it('should throw error if field is not present or not a jQuery object', function() {
      expect(function() {
        new Dropdown({field: {}});
      }).to.throw('field is either not present or is not a jquery object');
    });

    it('should throw error if list is not array', function() {
      expect(function() {
        new Dropdown({field: $('<div></div>'), list: 'test'});
      }).to.throw('list should be an array');
    });
  });

  context('Check for dropdown attributes', function() {
    it('should have dropdown class', function() {
      var $container = $('<div class="container"></div>');

      new Dropdown({
        field: $container,
      });

      var hasClass = $container.hasClass('dropdown');
      expect(hasClass).to.be.true;
    });

    it('should have dropdown__selected-wrapper and dropdown__selected', function() {
      var $container = $('<div class="container"></div>');

      new Dropdown({
        field: $container,
      });

      var bool = $container.find('.dropdown__selected-wrapper').length &&
        $container.find('.dropdown__selected-wrapper .dropdown__selected').length;

      expect(bool).to.equal(1);
    });

    it('should replace mainText with options provided', function() {
      var $container = $('<div class="container"></div>');

      new Dropdown({
        field: $container,
        mainText: 'Sel',
      });

      var mainText = $container.find('.dropdown__selected').text();
      expect(mainText).to.equal('Sel');
    });

    it('should have items on list provided', function() {
      var $container = $('<div class="container"></div>');

      new Dropdown({
        field: $container,
        list: [{name: 'item1'}, {name: 'item2'}],
      });

      var itemCount = $container.find('.dropdown__item').length;

      expect(itemCount).to.be.equal(2);
    });
  });

  context('Click events', function() {
    it('should open on click on dropdown__selected-wrapper', function() {
      var $container = $('<div class="container"></div>');

      new Dropdown({
        field: $container,
        list: [{name: 'item1'}, {name: 'item2'}],
      });

      $container.find('.dropdown__selected-wrapper').trigger('click');

      expect($container.hasClass('is-active')).to.be.true;
    });

    it('should close on click on dropdown__selected-wrapper if open', function() {
      var $container = $('<div class="container"></div>');

      new Dropdown({
        field: $container,
        list: [{name: 'item1'}, {name: 'item2'}],
      });

      // open
      $container.find('.dropdown__selected-wrapper').trigger('click');

      // close
      $container.find('.dropdown__selected-wrapper').trigger('click');

      expect($container.hasClass('is-active')).to.be.false;
    });

    it('should close on click on document', function(done) {
      var $container = $('<div class="container"></div>');

      new Dropdown({
        field: $container,
        list: [{name: 'item1'}, {name: 'item2'}],
      });

      // open
      $container.find('.dropdown__selected-wrapper').trigger('click');

      //close
      setTimeout(function() {
        $(document).trigger('click');
        done();
        expect($container.hasClass('is-active')).to.be.false;
      }, 0);
    });

    it('should replace the main text on item click', function() {
      var $container = $('<div class="container"></div>');

      new Dropdown({
        field: $container,
        list: [{name: 'item1'}, {name: 'item2'}],
      });

      var $item = $container.find('.dropdown__item:first-child');

      $item.trigger('click');

      var bool = $item.hasClass('item-selected') &&
        ($container.find('.dropdown__selected').text() === $item.text());

      expect(bool).to.be.true;
    });

    it('should call the onSelect function on click', function() {
      var $container = $('<div class="container"></div>');
      var cb = sinon.spy();

      new Dropdown({
        field: $container,
        list: [{name: 'item1'}, {name: 'item2'}],
        onSelect: cb,
      });

      var $item = $container.find('.dropdown__item:first-child');
      $item.trigger('click');

      expect(cb).to.have.been.calledOnce;
    });
  });

  context('Api', function() {
    it('should append items to the dropdown list on addItems', function() {
      var $container = $('<div class="container"></div>');

      var d = new Dropdown({
        field: $container,
        list: [{name: 'item1'}, {name: 'item2'}],
      });

      d.addItems([
        {name: 'item3'},{name: 'item4'},
      ]);

      expect($container.find('.dropdown__item').length).to.equal(4);
    });

    it('should empty the list on removeItems', function() {
      var $container = $('<div class="container"></div>');

      var d = new Dropdown({
        field: $container,
        list: [{name: 'item1'}, {name: 'item2'}],
      });

      d.removeItems();

      expect($container.find('.dropdown__item').length).to.equal(0);
    });

    it('should add Custom el on addCustom', function() {
      var $container = $('<div class="container"></div>');

      var d = new Dropdown({
        field: $container,
        list: [{name: 'item1'}, {name: 'item2'}],
      });

      var customEl = '<div class="custom">I am Custom</div>';
      d.addCustom(customEl);

      expect($container.find('.dropdown__list-wrapper .custom').length).to.equal(1);
    });
  });

  context('Custom selected and item template', function() {
    it('should insert custom selected html', function() {
      var $container = $('<div class="container"></div>');

      new Dropdown({
        field: $container,
        list: [{name: 'item1'}, {name: 'item2'}],
        selTpl: {tpl: '<div class="custom"></div>', _class: 'custom'},
        mainText: 'Select this',
      });

      var txt = $container.find('.dropdown__selected .custom').text();
      expect(txt).to.equal('Select this');
    });

    it('should insert custom item html', function() {
      var $container = $('<div class="container"></div>');

      new Dropdown({
        field: $container,
        list: [{name: 'item1'}, {name: 'item2'}],
        itmTpl: {tpl: '<div class="custom"></div>', _class: 'custom'},
      });

      var txt = $container.find('.dropdown__item:first-child .custom').text();
      expect(txt).to.equal('item1');
    });
  });
});