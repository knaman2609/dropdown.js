"use strict";

(function($) {
$.fn.dropdown = function(options) {
  var root = this,
    dropdownSel = '<div class="dropdown_sel">'+ options.defaultText+'</div>',
    dropdownArrow = '<div class="dropdown_arrow"></div>',
    obj = {};

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

  var addItems = function(options) {
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
    
    this.root.find('.dropdown_sel').remove();
    this.root.append(content);    

    if (!this.init) {

      this.root.click(function(e) {
        var $target = $(e.target),
          close,
          parent;

        if ($target.hasClass('dropdown_sel')) {
          close = $target.next().hasClass('is-hidden');
          $('.dropdown_list').addClass('is-hidden');
          if (close) {
            $target.next().removeClass('is-hidden');
          }
          else {
            $target.next().addClass('is-hidden');
          }
        }
      
        if ($target.hasClass('dropdown_item')) {
          parent = $target.closest('.dropdown');
        
          parent.find('.dropdown_sel').text($target.text());
          parent.find('.dropdown_list').addClass('is-hidden');
          parent.find('.dropdown_item').removeClass('dropdown_item-selected');
          $target.addClass('dropdown_item-selected');
          options.trigger($target, parent);
        }
        e.stopPropagation();
      });  

      $(document).click(function() {
        $('.dropdown_list').addClass('is-hidden');
      });
      this.init = true;
    }
  }
    
  root.addClass('dropdown');
  root.append(dropdownSel + dropdownArrow);
  obj.root = root;
  obj.addItems = addItems;

  return obj;
}
})(jQuery) 



