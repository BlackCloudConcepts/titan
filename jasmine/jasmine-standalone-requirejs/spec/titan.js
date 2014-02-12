define([
  	// all specs should 
  	// with jasmine setup and plugins
  	'spec/SpecHelper',

  	// spec dependencies
  	'titan.jquery'
],
function (jasmine, Titan) {

	describe("Titan Controls", function(){

		// TEXTBOX CONTROL
		describe("Textbox Control", function() {
			var ctrlTextbox;

			var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			ctrlTextbox = new titan.controls.inputTextbox({
				'container'             : $('#maintest'),
				'placeholder'           : 'Email Address',
				'width'                 : 300,
				'validationRegex'       : emailRegex
			});
			ctrlTextbox.setValue('mytestemail@test.com');

//	    		beforeEach(function() { // happens beforeEach it/expect
//	    		});

			describe("getValue and setValue", function(){
				it("should be able to retrieve a previously set value", function(){
					expect(ctrlTextbox.getValue()).toEqual('mytestemail@test.com');
				});

				it("should not equal a previously set email address", function(){
					ctrlTextbox.setValue('mytestemail@newtest.com');
					expect(ctrlTextbox.getValue()).toNotEqual('mytestemail@test.com');
				});
			});
		
			describe("isValid", function(){
				it("should register as a valid email address", function(){
					expect(ctrlTextbox.isValid()).toEqual(true);
				});

				it("should register as invalid for email addresses not matching the expected pattern", function(){
					ctrlTextbox.setValue('whatever');
					expect(ctrlTextbox.isValid()).toEqual(false);	
				});
			});
		});

		// DROPDOWN CONTROL
		describe("Dropdown Control", function(){
			var dropdownData;
			var ctrlDropdown;		

			dropdownData = [
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
			ctrlDropdown = new titan.controls.dropdown({
				'container'     : $('#maintest'),
				'data'          : dropdownData,
				'width'         : 300
			});

			describe("getValue and setValue", function(){
				it("should equal the value that was set", function(){
					ctrlDropdown.setValue({"name" : "COL Rockies", "value" : "rockies", "image" : "/images/mlb/rockies.png"});
					expect(ctrlDropdown.getValue().name).toEqual('COL Rockies');				
				});

				it("should not equal a previous value that was set", function(){
					ctrlDropdown.setValue({"name" : "MIN Twins", "value" : "twins", "image" : "/images/mlb/twins.png"});
					expect(ctrlDropdown.getValue().name).toNotEqual('COL Rockies');
				});
			});
		});
	
		// TOGGLE CONTROL
		describe("Toggle Control", function(){
			var ctrlToggle;

			ctrlToggle = new titan.controls.toggle({
				'container'     : $('#maintest'),
				'textOn'        : 'Show',
				'textOff'       : 'Hide'
			});

			describe("setValue and getValue", function(){
				it("should return the value that was just set", function(){
					ctrlToggle.setValue(1);
					expect(ctrlToggle.getValue()).toEqual(1);
				});
				it("should not return the opposite of what was set", function(){
					expect(ctrlToggle.getValue()).toNotEqual(0);
				});
			});
		});

		// RADIO GROUP CONTROL
		describe("Radio Group Control", function(){
			var radioItems = [
				{"name" : "CHI Cubs", "value" : "cubs"},
				{"name" : "NY Yankees", "value" : "yankees"},
				{"name" : "TX Rangers", "value" : "rangers"}
			];
			var ctrlRadioGroup = new titan.controls.radioGroup({
				'container'             : $('#maintest'),
				'items'                 : radioItems,
				'selected'              : {"name" : "TX Rangers", "value" : "rangers"}
			});

			describe("setValue and getValue", function(){
				it("should return the value that was just set", function(){
					ctrlRadioGroup.setValue({"name" : "TX Rangers", "value" : "rangers"});
					expect(ctrlRadioGroup.getValue().name).toEqual("TX Rangers");
				});
				it("should not return a different value that what was set", function(){
					expect(ctrlRadioGroup.getValue().name).toNotEqual("CHI Cubs");
				});
			});

		});

		// CHECKBOX CONTROL
		describe("Checkbox Control", function(){
			var ctrlCheckbox = new titan.controls.checkbox({
				'container'             : $('#maintest'),
				'label'                 : 'STL Cardinals'
			});
		
			describe("setValue and getValue", function(){
				it("should return the value that was set", function(){
					ctrlCheckbox.setValue(true);
					expect(ctrlCheckbox.getValue()).toEqual(true);
				});
				it("should not equal the opposite of what was set", function(){
					expect(ctrlCheckbox.getValue()).toNotEqual(false);
				});
			});
		});

		// TEXTAREA CONTROL
		describe("Textarea Control", function(){
			var ctrlTextarea = new titan.controls.textarea({
				'container'             : $('#maintest'),
				'placeholder'           : 'Description',
				'width'                 : 400,
				'height'                : 150,
				'value'                 : 'This is the year Cubs fans!'
			});

			describe("setValue and getValue", function(){
				it("should return the value passed in at the initiation of the control", function(){
					expect(ctrlTextarea.getValue()).toEqual('This is the year Cubs fans!');
				});
				it("should return the value that is manually set on the field", function(){
					ctrlTextarea.setValue('Or Maybe Not');
					expect(ctrlTextarea.getValue()).toEqual('Or Maybe Not');
				});
				it("should not return a different value", function(){
					expect(ctrlTextarea.getValue()).toNotEqual('This is the year Cubs fans!');
				});
			});
		});
		
		// DOUBLE MULTISELECT CONTROL
		describe("Double Multiselect Control", function(){
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
				'container'             : $('#maintest'),
				'items'                 : doubleMultiselectItems,
				'height'                : 200,
				'width'                 : 600
			});
		
			describe('getValues and setValues', function(){
				it("should return the value that is set", function(){
					ctrlDoubleMultiselect.setValues([{"id" : "cardinals", "name" : "STL Cardinals", "picture_url" : "/images/mlb/cardinals.png"}]);
					expect(ctrlDoubleMultiselect.getValues()[0].name).toEqual("STL Cardinals");
				});
				it("should return multiple values that have been set", function(){
					ctrlDoubleMultiselect.setValues([{"id" : "mets", "name" : "NY Mets", "picture_url" : "/images/mlb/mets.png"},{"id" : "padres", "name" : "SD Padres", "picture_url" : "/images/mlb/padres.png"}]);
					expect(ctrlDoubleMultiselect.getValues()[0].name).toEqual("STL Cardinals");
					expect(ctrlDoubleMultiselect.getValues()[1].name).toEqual("NY Mets");
					expect(ctrlDoubleMultiselect.getValues()[2].name).toEqual("SD Padres");
				});
			});
				
			describe("removeValues", function(){
				it("should properly remove values", function(){
					ctrlDoubleMultiselect.removeValues([{"id" : "cardinals", "name" : "STL Cardinals", "picture_url" : "/images/mlb/cardinals.png"},{"id" : "padres", "name" : "SD Padres", "picture_url" : "/images/mlb/padres.png"}]);
					expect(ctrlDoubleMultiselect.getValues()[0].name).toEqual("NY Mets");
				});
			});
		});
	
	});
});

