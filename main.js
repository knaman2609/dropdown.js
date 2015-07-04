function func($item) {
	alert($item.text());
}

var dropdown = new $('.mydropdown').dropdown({defaultText: 'defaultText'});
dropdown.addItems({selected: {'name': 'as'}, list:[{'name': 'pq'}], trigger: func});

var dropdown1 = new $('.mydropdown1').dropdown({defaultText: 'defaultText'});
dropdown1.addItems({selected: {'name': 'as'}, list:[{'name': 'pq'}], trigger: func});
