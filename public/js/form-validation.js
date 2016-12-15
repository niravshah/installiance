// Wait for the DOM to be ready
$(function () {
    $("form[name='registration']").validate({
        // Specify validation rules
        rules: {

            email: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email: true
            }

        },
        // Specify validation error messages
        messages: {
            email: "Please enter a valid email address"
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            form.submit();
        }
    });
});