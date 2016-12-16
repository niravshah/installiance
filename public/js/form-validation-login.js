// Wait for the DOM to be ready
$(function () {
    $("form[name='login']").validate({
        // Specify validation rules
        rules: {
            pass: {
                required: true
            },
            email: {
                required: true,
                email: true
            }
        },
        // Specify validation error messages
        messages: {
            pass: "Password can not be empty",
            email: "Please enter a valid email address"
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            var url = '/api/user/login';
            $.ajax({
                type: "POST",
                url: url,
                data: $(form).serialize(),
                success: function (data) {
                    window.location.replace(data.next);
                },
                error: function (xhr, error, thrownError) {
                    $(form).append("<div id='message'></div>");
                    $('#message').html("<h3 class='error'>" + thrownError + "</h3>")
                        .append("<p>" + xhr.responseJSON.errorMessage + "</p>")
                        .hide()
                        .fadeIn(1500, function () {
                            $('#message').append("<img class='ajaxReturnImage' src='/images/cross.png' />");
                        });
                }
            });
            return false;
        },
        invalidHandler: function (event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                console.log('Errors:', errors);
            }
        }
    });
});