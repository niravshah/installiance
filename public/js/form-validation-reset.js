// Wait for the DOM to be ready
$(function () {
    $("form[name='reset']").validate({
        // Specify validation rules
        rules: {
            password: {
                required: true
            },
            oldPassword: {
                required: true
            },
            repeatPassword: {
                required: true
            }
        },
        // Specify validation error messages
        messages: {
            password: "New Password can not be empty",
            oldPassword: "Old Password can not be empty",
            repeatPassword: "Repeat New Password can not be empty"

        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            var url = '/api/user/login';
            $.ajax({
                type: "POST",
                url: url,
                data: $(form).serialize(),
                success: function () {
                    console.log('Login Successful')
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