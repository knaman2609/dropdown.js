var a = $('.mydropdown').dropdown({
			defaultText: 'Select Item', 
			trigger: function($Item) {
				alert($Item.text() + ' id:'+ $Item.data('id'));
			}
		});

var b = $('.mydropdown1').dropdown({
			defaultText: 'Select Item', 
			trigger: function($Item) {
				alert($Item.text() + ' id:'+ $Item.data('id'));
			}
		});

a.addItems({
	selected: {'name': 'Item3', 'id': '3'}, 
	list:[
	    {'name': 'Item1', 'id': '1'},
	    {'name': 'Item2', 'id': '2'},
	    {'name': 'Item3', 'id': '3'},
	]
}); 

b.addItems({
	selected: {'name': 'Item1', 'id': '1'}, 
	list:[
	    {'name': 'Item1', 'id': '1'},
	    {'name': 'Item2', 'id': '2'},
	    {'name': 'Item3', 'id': '3'},
	]
}); 