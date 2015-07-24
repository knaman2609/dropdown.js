# dropdown.js

#### create a dropdown

```javascript
$('.mydropdown1').dropdown({
	mainText: 'Select Item', 
	list:[
		{'name': 'Item1'},
		{'name': 'Item2'},
		{'name': 'Item3'}
	]
});
```

#### dropdown with custom selected html and item html

```javascript
$('.mydropdown2').dropdown({
	mainText: 'Select Item', 
	list:[
		{'name': 'Item1'},
		{'name': 'Item2'},
		{'name': 'Item3'},
	],
  	selTpl: {tpl: '<div class="dropdown_sel"><span class="icon" style="margin-right: 3px;">&#9829</span><span class="text"></span></div>', txtClass: 'text'},
	itmTpl: {tpl: '<li class="dropdown_item"><span class="icon" style="margin-right: 3px;">&#9829</span><span class="name"></span></li>', txtClass: 'name'}
});
```


#### trigger callback function which returns the selected item and the dropdown

```javascript
$('.mydropdown3').dropdown({
	mainText: 'Select Item', 
	list:[
		{'name': 'Item1'},
		{'name': 'Item2'},
		{'name': 'Item3'},
	],
	trigger: function($item, $dropdown) {
		alert($item.text());
	}
});
```

#### add items dynamically to dropdown

```
var dynamicDropdown = $('.mydropdown4').dropdown({
			mainText: 'Select Item',
			trigger: function($Item) {
				alert($Item.text() + ' id:'+ $Item.data('id'));
			}
			//idAttr: '_id',  use this if have _id(or somthing else) in place of id
			//nameAttr: 'display_name' use this if have display_name (or somthing else) in place of name
		});
```
##### dynamically adding list ,id if provided will be added as the data-id to each list-item	

```
dynamicDropdown.addItems({
	selected: {'name': 'Item2', 'id': '2'}, 
	list:[
	    {'name': 'Item1', 'id': '1'},
	    {'name': 'Item2', 'id': '2'},
	    {'name': 'Item3', 'id': '3'},
	]
});
```