
  
	$(document).ready(function(){
	
	// Setup form validation on the #survey-form element
    $("#survey-form").validate({
    
		// Surepress error message and highlight form element
		highlight: function(element) {
			$(element).closest('.form-group').addClass('has-error');
		},
		unhighlight: function(element) {
			$(element).closest('.form-group').removeClass('has-error');
		},
		errorPlacement: function(error, element) {},

        // Specify the validation rules
        rules: {
            question1OptionsRadios: "required",
            question2OptionsRadios: "required",
            question3OptionsRadios: "required",
            nameInput: "required",
        },
        
        // Specify the validation error messages
        messages: {
            question1OptionsRadios: "Bitte wählen Sie eine Option aus.",
            question2OptionsRadios: "Bitte wählen Sie eine Option aus.",
            question3OptionsRadios: "Bitte wählen Sie eine Option aus.",
            nameInput: "Bitte geben Sie Ihren Namen oder Ihr Pseudonym ein.",
        },
    });	
		
	});  
	
	$("#other").click(function() {
		$("#question3Option8").prop('checked',true);
	});
	
	$(".send2parse").click(function() {
	
		event.preventDefault();
		
		if ($('#survey-form').valid()) {

			Parse.initialize("9cI8aX0fHP6WmsXx28n0EvJzS4hCfMHNuHvKPUnG", "XPnX9Lx7SAAMGy8K2Fq0ZsEFwoJLm3IYku6IGD53");
			
			var answer = Parse.Object.extend("answer");
			var answer = new answer();

			var question1 = $("input:radio[name=question1OptionsRadios]:checked").val();
			var question2 = $("input:radio[name=question2OptionsRadios]:checked").val();
			var question3 = $("input:radio[name=question3OptionsRadios]:checked").val();
			var other = $("#other").val();
			var text = $("#textInput").val();
			var name = $("#nameInput").val();
			var email = $("#emailInput").val();
		
			answer.set("question1", question1);
			answer.set("question2", question2);
			answer.set("question3", question3);
			answer.set("other", other);
			answer.set("text", text);
			answer.set("name", name);
			answer.set("email", email);

			answer.save(null, {
			  success: function(answer) {
				$('button').prop('disabled', true);
				$(".send2parse").html('Ihre Daten wurden übermittelt.');
			  },
			  error: function(answer, error) {
				alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie später noch einmal.");
			  }
			});

		}
		
	});
	    
