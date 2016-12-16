// Wait for the DOM to be ready
$(function () {
    $("form[name='reset']").validate({
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
        messages: {
            password: "New Password can not be empty",
            oldPassword: "Old Password can not be empty",
            repeatPassword: "Repeat New Password can not be empty"

        },
        submitHandler: function (form) {

            var shortid = $('#reset-btn').data('shortid');

            var url = '/api/user/'+shortid +'/reset';
            $.ajax({
                type: "POST",
                url: url,
                data: $(form).serialize(),
                success: function (result) {
                    window.location.replace(result.next);
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