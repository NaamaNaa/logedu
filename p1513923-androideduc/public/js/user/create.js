/**
 * Created by Mahmoud on 04/05/2017.
 */



$(document).ready(function() {
    //select
    $('#typeuser').material_select();
    //scroll animation
    $('html,body').animate({ scrollTop: 100 }, 'slow');
    // Persist new user
    $("#createBtn").click(function (event) {
        event.preventDefault()

        var formData = {
            firstName: $('#firstName').val() ,
            lastName: $('#lastName').val(),
            email : $('#email').val(),
            password : $('#password').val()
        }

        persistUserType(formData)
    })



    function persistUserType(formData) {


        $.ajax({
            url: '/user/persist',
            method: 'POST',
            data: {
                formData: formData,
            },
            success: function (data) {
                console.log('user had been created !')
                Materialize.toast('user had been created', 2000 , 'green' , function(){
                    window.location.href="/"
                })

            },
            error: function () {
                console.log('error persist user !')
            }
        });
    }

});