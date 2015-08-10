# dropDown.js

#### create a dropdown

```javascript
dropdown({
  mainText: 'Select Item',
  field: $('.mydropdown1'),
  list: [
    {name: 'Naman'},
    {name: 'Kalkh'}
  ],
  onSelect: function($item, $dropdown) {
    console.log($item, $dropdown);
  }
});
```

#### For custom selected and item html
	selTpl: {tpl:  '&#9829 <span class="name"> selected item </span>', _class: 'name'},
	itmTpl: {tpl:  '&#9829 <span class="name"> item </span>', _class: 'name'},
	
The selTpl will be inserted inside "<div class="dropdown__selected"></div>

The itmTpl will be inserted inside "<div class="dropdown__item"></div>

#### Add items dynamically
    var dropdown =  dropdown({
        mainText: 'Select Item',
        field: $('.mydropdown1')
    });

    dropdown.addItems({
        list: [
         {name: 'Naman'},
         {name: 'Kalkh'}
        ]
    });

#### Append an element to the list
    dropdown.append('<div class="datepicker">My datepicker</div>');

#### Options: 
- type : 'selectBox', it works as select box.Supports key navigation and search.
- listHeight: '300', for selectBox to work properly provide the max-height.
- noDataText: 'Not available', applies `is-disabled` class if list is empty.
- selected: {name: 'Naman', 'id': 1}, replaces the mainText if id is found in the list.
- nameAttr: 'display_name', use this if you have other than name in your json.
- idAttr: '_id', use this if  you have other than id in your json.
    