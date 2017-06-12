/**
 * Created by Mahmoud on 03/05/2017.
 */


$(document).ready(function () {
    $("#createBtn").click(function (event) {
        event.preventDefault()

        var formData = {
            name: $("#name").val()
        }

        persistUserType(formData)
    })


    function persistUserType(formData) {


        $.ajax({
            url: '/usertype/persist',
            method: 'POST',
            data: {
                formData: formData,
            },
            success: function (data) {
                console.log('userType had been created !')
            },
            error: function () {
                console.log('error persist user userType !')
            }
        });
    }
});


