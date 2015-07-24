// create a dropdown
$('.mydropdown1').dropdown({
	mainText: 'Select Item', 
	list:[
		{'name': 'Item1'},
		{'name': 'Item2'},
		{'name': 'Item3'}
	]
});

// dropdown with custom selected html and item html
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

// trigger callback function which returing the selected item and the dropdown
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

// add items dynamically to dropdown
var b = $('.mydropdown4').dropdown({
			mainText: 'Select Country',
			trigger: function($Item) {
				alert($Item.text());
			}
			//idAttr: '_id',  use this if have _id(or somthing else) in place of id
			//nameAttr: 'display_name' use this if have display_name (or somthing else) in place of name
		});



var list = [ 
  {name: 'Afghanistan', code: 'AF'}, 
  {name: 'Åland Islands', code: 'AX'}, 
  {name: 'Albania', code: 'AL'}, 
  {name: 'Algeria', code: 'DZ'}, 
  {name: 'American Samoa', code: 'AS'}, 
  {name: 'AndorrA', code: 'AD'}, 
  {name: 'Angola', code: 'AO'}, 
  {name: 'Anguilla', code: 'AI'}, 
  {name: 'Antarctica', code: 'AQ'}, 
  {name: 'Antigua and Barbuda', code: 'AG'}, 
  {name: 'Argentina', code: 'AR'}, 
  {name: 'Armenia', code: 'AM'}, 
  {name: 'Aruba', code: 'AW'}, 
  {name: 'Australia', code: 'AU'}, 
  {name: 'Austria', code: 'AT'}, 
  {name: 'Azerbaijan', code: 'AZ'}, 
  {name: 'Bahamas', code: 'BS'}, 
  {name: 'Bahrain', code: 'BH'}, 
  {name: 'Bangladesh', code: 'BD'}, 
  {name: 'Barbados', code: 'BB'}, 
  {name: 'Belarus', code: 'BY'}, 
  {name: 'Belgium', code: 'BE'}, 
  {name: 'Belize', code: 'BZ'}, 
  {name: 'Benin', code: 'BJ'}, 
  {name: 'Bermuda', code: 'BM'}, 
  {name: 'Bhutan', code: 'BT'}, 
  {name: 'Bolivia', code: 'BO'}, 
  {name: 'Bosnia and Herzegovina', code: 'BA'}, 
  {name: 'Botswana', code: 'BW'}, 
  {name: 'Bouvet Island', code: 'BV'}, 
  {name: 'Brazil', code: 'BR'}, 
  {name: 'British Indian Ocean Territory', code: 'IO'}, 
  {name: 'Brunei Darussalam', code: 'BN'}, 
  {name: 'Bulgaria', code: 'BG'}, 
  {name: 'Burkina Faso', code: 'BF'}, 
  {name: 'Burundi', code: 'BI'}, 
  {name: 'Cambodia', code: 'KH'}, 
  {name: 'Cameroon', code: 'CM'}, 
  {name: 'Canada', code: 'CA'}, 
  {name: 'Cape Verde', code: 'CV'}, 
  {name: 'Cayman Islands', code: 'KY'}, 
  {name: 'Central African Republic', code: 'CF'}, 
  {name: 'Chad', code: 'TD'}, 
  {name: 'Chile', code: 'CL'}, 
  {name: 'China', code: 'CN'}, 
  {name: 'Christmas Island', code: 'CX'}, 
  {name: 'Cocos (Keeling) Islands', code: 'CC'}, 
  {name: 'Colombia', code: 'CO'}, 
  {name: 'Comoros', code: 'KM'}
] 

// dynamically adding list  
// id if provided will be added as the data-id to each list-item	
b.addItems({
	list: list
});



