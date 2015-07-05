# dropdown.js

### Create a Simple dropdown

```
var a = $('.mydropdown').dropdown({
			mainText: 'Select Item', 
			list:[
	    		{'name': 'Item1'},
	    		{'name': 'Item2'},
	    		{'name': 'Item3'},
			],
			trigger: function($Item) {
			    // item will be returned to this function on click
				alert($Item.text());
			}
		});

```

### Add options dynamically

```
var b = $('.mydropdown1').dropdown({
			mainText: 'Select Item', // will be replaced by selected name
			trigger: function($Item) {
				alert($Item.text() + ' id:'+ $Item.data('id'));
			}
		});

b.addItems({
	selected: {'name': 'Item2', 'id': '2'}, 
	list:[
	    {'name': 'Item1', 'id': '1'},
	    {'name': 'Item2', 'id': '2'},
	    {'name': 'Item3', 'id': '3'},
	],
	//idAttr: '_id',  use this if have _id(or somthing else) in place of id
	//nameAttr: 'display_name' use this if have display_name (or somthing else) in place of name
});
```

### Disabled dropdown

```
var c = $('.mydropdown2').dropdown({
			mainText: 'Select Item', 
			trigger: function($Item) {
				alert($Item.text() + ' id:'+ $Item.data('id'));
			}
		});

c.addItems({
	list:[],
	'noDataText': 'Disabled'
}); 
```

### Remove options

```
c.removeItems();
```



