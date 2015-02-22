$(document).ready(function(){
	
	// Setup form validation on the #survey-form element
    $("#survey-form").validate({
    
		// Surpress error messages and highlight form element
		highlight: function(element) {
			$(element).closest('.form-group').addClass('has-error');
		},
		unhighlight: function(element) {
			$(element).closest('.form-group').removeClass('has-error');
		},
		errorPlacement: function(error, element) {},

        // Specify validation rules – advanced rules here http://jqueryvalidation.org/documentation/
        rules: {
            question1OptionsRadios: "required",
            question2OptionsRadios: "required",
            question3OptionsRadios: "required",
            nameInput: "required",
        },
    });	 
	
	// Select radio button in case of clicking inside 'other' input field - change if you're adding more options
	$("#other").click(function() {
		$("#question3Option4").prop('checked',true);
	});
	
	// parse.com stuff
	$(".send2parse").click(function( event ) {
		event.preventDefault();

		if ($('#survey-form').valid()) {
			// Changing button status
			$(".send2parse").html('Submitting...');
			// initalize
			Parse.initialize("[yourApplicationId]", "[yourJavaScriptKey]");
			// new object
			var answer = Parse.Object.extend("answer");
			var answer = new answer();
			// mapping form data
			var question1 = $("input:radio[name=question1OptionsRadios]:checked").val();
			var other = $("#other").val();
			var text = $("#textInput").val();
			var name = $("#nameInput").val();
			var email = $("#emailInput").val();
			
			answer.set("question1", question1);
			answer.set("other", other);
			answer.set("text", text);
			answer.set("name", name);
			answer.set("email", email);
			// saving
			answer.save(null, {
			  success: function(answer) {
				$('button').prop('disabled', true);
				$(".send2parse").html('Form data sent.');
			  },
			  error: function(answer, error) {
				alert("An error occurred, please try again.");
				$(".send2parse").html('Submit');
			  }
			});
		}
	});
});     