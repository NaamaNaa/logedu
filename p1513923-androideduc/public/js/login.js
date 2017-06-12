/**
 * Created by Mahmoud on 10/06/2017.
 */

$(document).ready(function() {

    $("#signin").click(function (event) {

        event.preventDefault()


        $.ajax({
            url: '/login',
            type: 'POST',
            data: {email: $("#email").val() , password : $("#password").val()},
            success: function (data) {
                console.log("success")
                Materialize.toast( "Bienvenue", 4000, 'green' , function(){
                    window.location.href = "/";
                })

            },
            error : function () {
                Materialize.toast( "Erreur identifiants", 4000, 'Red' , function(){
                    console.log("error")
                    window.location.href = "/login";
                })
            }
        })

    })
})