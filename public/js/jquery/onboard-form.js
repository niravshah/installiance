// Wait for the DOM to be ready
$(function () {
    $("form[name='registration']").validate({
        // Specify validation rules
        rules: {
            email: {
                required: true,
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
            var shortid = $('#onboard-btn').data('shortid');
            var state = $('#onboard-btn').data('state');
            var url = '/api/user/' + shortid + '/email?state='+state;
            $.ajax({
                type: "POST",
                url: url,
                data: $(form).serialize(),
                success: function (data) {
                    $(form).html("<div id='message'></div>");
                    $('#message').html("<h3>Email Address Updated!</h3>")
                        .append("<p>An email has been sent to you with your login details</p>")
                        .hide()
                        .fadeIn(1500, function () {
                            $('#message').append("<img class='ajaxReturnImage' src='/images/ok.png' />");

                        })
                        .fadeIn(1000,function(){
                            $('#message').append("<br/>");
                            $('#message').append("<a href='/login' class='btn btn-raised btn-primary md-mt-20'>Login</a>")
                        });
                    if(state!='new'){
                        $.post('/api/alliances/' + state + '/allies/add/' + data.user.shortid).then(function(response){
                            $('#message').append("<br/>");
                            $('#message').append("<p>User Added to Alliance</p>")
                        },function(error){
                            $('#message').append("<br/>");
                            $('#message').append("<p>Error Adding User to Alliance</p>")
                        })
                    }
                },
                error: function (xhr, error, thrownError) {
                    $(form).html("<div id='message'></div>");
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