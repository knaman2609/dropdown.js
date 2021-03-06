# dropDown.js
#### install
    npm install  dropdown-selectbox

#### use
    var Dropdown = require('dropdown-selectbox');

if not using browerify/webpack simply copy `dropdown.js` and `dropdown.css`.

See the examples in `example` folder.

#### create a dropdown

```javascript
new Dropdown({
  mainText: 'Select Item',
  field: $('.mydropdown1'),
  list: [
    {name: 'Item1', id: 1},
    {name: 'Item2', id: 2}
  ],
  onSelect: function($item, $dropdown) {
    var id =  $item.data('id');
    console.log(id, $dropdown);
  }
});
```
`id` are optional. If passed will be added as  `data-id` to each list-item.


#### html generated
```html
<div class="dropdown">
  <div class="dropdown__selected-wrapper">
    <div class="dropdown__selected">Item1</div>
    <div class="dropdown__arrow"></div>
  </div>
  
  <div class="dropdown__list-wrapper">
    <div class="dropdown__list">
      <div class="dropdown__item">Item1</div>
      <div class="dropdown__item">Item2</div>
    </div>
  </div>  
</div>  

```


#### Css
Copy the css from dropdown.css file .

##### Classes

- is-active - applied to  `dropdown`, if dropdown is open.
- is-disabled - applied to `dropdown`, if the list provided is an empty array.
- item-selected - applied to `dropdown__item`,  if item is selected.
- scrolled -  applied to   `dropdown__item`, if item s currently being navigated using keys.

#### load from a url
```javascript
 new Dropdown({
    mainText: 'Select Item',
    field: $('.mydropdown1'),
    url: '/list',
    parse: function(data) {
      // use this function to specify data to be used
      // good for updating main text with selected item
      return   {list: data.items, selected: data.items[0]};
    },
    onSelect: function($item, $dropdown) {
      console.log($item, $dropdown);
    }
  });
```

#### Use it as SelectBox [Options]
- type : 'selectBox', it works as select box.Supports key navigation and search.
- scrollOn: 200, no of pixels to start scrolling for key down nav.

#### For custom selected and item html
	selTpl: {tpl:  '<span class="name"> selected item </span>', _class: 'name'},
	itmTpl: {tpl:  '<span class="name"> item </span>', _class: 'name'},
	

The selTpl will be inserted inside `<div class="dropdown__selected"></div>`

The itmTpl will be inserted inside ` <div class="dropdown__item"></div>`

#### Add items dynamically
```javascript
var dropdown = new Dropdown({
  mainText: 'Select Item',
  field: $('.mydropdown1')
});

dropdown.addItems(
    list: [
     {name: 'Item1', id: 1},
     {name: 'Item2': id: 2}
    ]
);
```

#### Update selected item text
```javascript
dropdown.updateSelected({name: 'Item1', id: 1}, true);
```

pass `true` if the item is present in the list


### Add items at the top
```javascript
dropdown.prependItems(
  list[
    {name: 'Item1', id: 1}
  ]
});
```

  
#### Add custom elements
    dropdown.addCustom('<div class="datepicker">My datepicker</div>');

#### Options: 
- noDataText: 'Not available', applies `is-disabled` class if list is empty.
- selected: {name: 'Item1', 'id': 1}, replaces the mainText if id is found in   the list.
- nameAttr: 'display_name', use this if you have other than name in your json.
- idAttr: '_id', use this if  you have other than id in your json.

#### Api
- dropdown.open() --  opens the dropdown/selectBox 
- dropdown.close() -- closes the dropdown/selectBox
- dropdown.closeAll() -- closes all the dropdowns/ selectBox
- dropdown.disabled() -- adds disabled class to the dropdowns
- dropdown.removeItems() -- emptys the list