
// Input Textbox Control Test
// ======================================================================================================
module('Input Textbox Control');
test('setValue, getValue, isValid', function(){
	var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var ctrlTextbox = new titan.controls.inputTextbox({
                'container'             : $('#dvControl'),
                'placeholder'           : 'Email Address',
                'width'                 : 300,
                'validationRegex'       : emailRegex
        });
        ctrlTextbox.setValue('mytestemail@test.com');
	equal(ctrlTextbox.getValue(), 'mytestemail@test.com', 'getValue should return the value of setValue');
	equal(ctrlTextbox.isValid(), true, 'email address should register as valid');
	
        ctrlTextbox.setValue('mytestemail@newtest.com');
	notEqual(ctrlTextbox.getValue(), 'mytestemail@test.com', 'getValue should not be equal to setValue');
	notEqual(ctrlTextbox.isValid(), false, 'email address should register as invalid');
	
	$('#dvControl').empty();
});

// Dropdown Control Test
// ======================================================================================================
module('Dropdown Control');
test('setValue, getValue', function(){
	var dropdownData = [
                {"name" : "NY Yankees", "value" : "yankees", "image" : "/images/mlb/yankees.png"},
                {"name" : "CHI Cubs", "value" : "cubs", "image" : "/images/mlb/cubs.png"},
                {"name" : "SF Giants", "value" : "giants", "image" : "/images/mlb/giants.png"},
                {"name" : "ATL Braves", "value" : "braves", "image" : "/images/mlb/braves.png"},
                {"name" : "DET Tigers", "value" : "tigers", "image" : "/images/mlb/tigers.png"},
                {"name" : "HOU Astros", "value" : "astros", "image" : "/images/mlb/astros.png"},
                {"name" : "TX Rangers", "value" : "rangers", "image" : "/images/mlb/rangers.png"},
                {"name" : "STL Cardinals", "value" : "cardinals", "image" : "/images/mlb/cardinals.png"},
                {"name" : "ANA Angels", "value" : "angels", "image" : "/images/mlb/angels.png"},
                {"name" : "SD Padres", "value" : "padres", "image" : "/images/mlb/padres.png"},
                {"name" : "SEA Mariners", "value" : "mariners", "image" : "/images/mlb/mariners.png"},
                {"name" : "MIN Twins", "value" : "twins", "image" : "/images/mlb/twins.png"},
                {"name" : "BAL Orioles", "value" : "orioles", "image" : "/images/mlb/orioles.png"},
                {"name" : "CLE Indians", "value" : "indians", "image" : "/images/mlb/indians.png"},
                {"name" : "AZ Diamondbacks", "value" : "diamondbacks", "image" : "/images/mlb/diamondbacks.png"},
                {"name" : "COL Rockies", "value" : "rockies", "image" : "/images/mlb/rockies.png"},
                {"name" : "PIT Pirates", "value" : "pirates", "image" : "/images/mlb/pirates.png"}
        ];
        var ctrlDropdown = new titan.controls.dropdown({
                'container'     : $('#dvControl'),
                'data'          : dropdownData,
                'width'         : 300
        });
        ctrlDropdown.setValue({"name" : "COL Rockies", "value" : "rockies", "image" : "/images/mlb/rockies.png"});
	equal(ctrlDropdown.getValue().name, 'COL Rockies', 'getValue should return the value set in setValue');
        ctrlDropdown.setValue({"name" : "MIN Twins", "value" : "twins", "image" : "/images/mlb/twins.png"});
	notEqual(ctrlDropdown.getValue().name, 'COL Rockies', 'getValue should match the value set in setValue');

	$('#dvControl').empty(); 
});

// Toggle Control Test
// ======================================================================================================
module('Toggle Control');
test('setValue, getValue', function(){
	ctrlToggle = new titan.controls.toggle({
                'container'     : $('#dvControl'),
                'textOn'        : 'Show',
                'textOff'       : 'Hide'
        });
	ctrlToggle.setValue(1);
	equal(ctrlToggle.getValue(), 1, 'toggle should be in the on position');
	ctrlToggle.setValue(0);
	notEqual(ctrlToggle.getValue(), 1, 'toggle should be in the off position');

	$('#dvControl').empty();
});

// Radio Control Test
// ======================================================================================================
module('Radio Group Control');
test('setValue, getValue', function(){
	var radioItems = [
                {"name" : "CHI Cubs", "value" : "cubs"},
                {"name" : "NY Yankees", "value" : "yankees"},
                {"name" : "TX Rangers", "value" : "rangers"}
        ];
        var ctrlRadioGroup = new titan.controls.radioGroup({
                'container'             : $('#dvControl'),
                'items'                 : radioItems,
                'selected'              : {"name" : "TX Rangers", "value" : "rangers"}
        });
	ctrlRadioGroup.setValue({"name" : "TX Rangers", "value" : "rangers"});
	equal(ctrlRadioGroup.getValue().name, 'TX Rangers', 'getValue should return the value set in setValue');
	ctrlRadioGroup.setValue({"name" : "CHI Cubs", "value" : "cubs"});
	notEqual(ctrlRadioGroup.getValue().name, 'TX Rangers', 'getValue should return the value set in setValue');

	$('#dvControl').empty();
});

// Checkbox Control Test
// ======================================================================================================
module('Checkbox Control Test');
test('setValue, getValue', function(){
	var ctrlCheckbox = new titan.controls.checkbox({
                'container'             : $('#dvControl'),
                'label'                 : 'STL Cardinals'
        });
	ctrlCheckbox.setValue(true);
	equal(ctrlCheckbox.getValue(), true, 'getValue should return the value set in setValue');
	ctrlCheckbox.setValue(false);
	notEqual(ctrlCheckbox.getValue(), true, 'getValue should return the value set in setValue');

	$('#dvControl').empty();
});

// Textarea Control Test
// ======================================================================================================
module('Textarea Control Test');
test('setValue, getValue', function(){
	var ctrlTextarea = new titan.controls.textarea({
                'container'             : $('#dvControl'),
                'placeholder'           : 'Description',
                'width'                 : 400,
                'height'                : 150,
                'value'                 : 'This is the year Cubs fans!'
        });
	equal(ctrlTextarea.getValue(), 'This is the year Cubs fans!', 'getValue should return the value set initially');
	ctrlTextarea.setValue('Maybe not');
	equal(ctrlTextarea.getValue(), 'Maybe not', 'getValue should return the value set in setValue');
	notEqual(ctrlTextarea.getValue(), 'This is the year Cubs fans!', 'getValue should return the value set in setValue');

	$('#dvControl').empty();
});

// Double Multiselect Control Test
// ======================================================================================================
module('Double Multiselect Control Test');
test('setValues, getValues, removeValues', function(){
	var doubleMultiselectItems = [
                {"id" : "cubs", "name" : "CHI Cubs", "picture_url" : "/images/mlb/cubs.png"},
                {"id" : "yankees", "name" : "NY Yankees", "picture_url" : "/images/mlb/yankees.png"},
                {"id" : "rangers", "name" : "TX Rangers", "picture_url" : "/images/mlb/rangers.png"},
                {"id" : "cardinals", "name" : "STL Cardinals", "picture_url" : "/images/mlb/cardinals.png"},
                {"id" : "giants", "name" : "SF Giants", "picture_url" : "/images/mlb/giants.png"},
                {"id" : "mets", "name" : "NY Mets", "picture_url" : "/images/mlb/mets.png"},
                {"id" : "rockies", "name" : "COL Rockies", "picture_url" : "/images/mlb/rockies.png"},
                {"id" : "padres", "name" : "SD Padres", "picture_url" : "/images/mlb/padres.png"}
        ];
        var ctrlDoubleMultiselect = new titan.controls.doubleMultiselect({
                'container'             : $('#dvControl'),
                'items'                 : doubleMultiselectItems,
                'height'                : 200,
                'width'                 : 600
       	});
        ctrlDoubleMultiselect.setValues([{"id" : "cardinals", "name" : "STL Cardinals", "picture_url" : "/images/mlb/cardinals.png"}]);
	equal(ctrlDoubleMultiselect.getValues()[0].name, 'STL Cardinals', 'getValue should return the value set in setValue');
        ctrlDoubleMultiselect.setValues([{"id" : "yankees", "name" : "NY Yankees", "picture_url" : "/images/mlb/yankees.png"},{"id" : "rangers", "name" : "TX Rangers", "picture_url" : "/images/mlb/rangers.png"}]);
	equal(ctrlDoubleMultiselect.getValues().length, 3, 'length of getValue array should be 3');
	ctrlDoubleMultiselect.removeValues([{"id" : "rangers", "name" : "TX Rangers", "picture_url" : "/images/mlb/rangers.png"},{"id" : "cardinals", "name" : "STL Cardinals", "picture_url" : "/images/mlb/cardinals.png"}]);
	equal(ctrlDoubleMultiselect.getValues()[0].name, 'NY Yankees', 'after removing 2 items only one should remain');

	$('#dvControl').empty(); 
});
