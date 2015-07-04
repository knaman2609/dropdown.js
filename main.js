function func($item) {
	alert($item.text() +' id:'+ $item.data('id'));
}

function func1($item) {
	alert($item.text() +' id:'+ $item.data('id'));
}

var dropdown = new $('.mydropdown').dropdown({defaultText: 'Select Item'});

// emulating for response coming from server
setTimeout(function() {
	dropdown.addItems({
		selected: {'name': 'Item1', 'id': '1'}, 
		list:[
			{'name': 'Item1', 'id': '1'},
			{'name': 'Item2', 'id': '2'},
			{'name': 'Item3', 'id': '3'},
		],
		trigger: func
	});	
}, 1000);

var dropdown1 = new $('.mydropdown1').dropdown({defaultText: 'Select Item'});
dropdown1.addItems({
	selected: {'display_name': 'Item1', '_id': '1'}, 
	list:[
		{'display_name': 'Item1', '_id': '1'},
		{'display_name': 'Item2', '_id': '2'},
		{'display_name': 'Item3', '_id': '3'},
	],
	idAttr: '_id', // define if using other than id
	nameAttr: 'display_name', // define if using other than name
	trigger: func1
});	
