// Wait for the DOM to be ready
$(function () {
    $("form[name='login']").validate({
        rules: {
            pass: {
                required: true
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            pass: "Password can not be empty",
            email: "Please enter a valid email address"
        },
        submitHandler: function (form) {
            /*var url = '/api/user/login';
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
            return false;*/
            form.submit();
        }
    });
});