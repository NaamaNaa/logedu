/**
 * Created by Mahmoud on 03/05/2017.
 */


$(document).ready(function () {
    $("a[name$='deleteBtn']").click(function (event) {
        event.preventDefault()
        deleteUserTypeById($(this).attr('id'))
    })


    function deleteUserTypeById(id) {
        $.ajax({
            url: '/usertype/delete',
            method: 'DELETE',
            data: {
                id: id
            },
            success: function () {
                console.log('userType had been deleted !')
            },
            error: function () {
                console.log('error delete user userType !')
            }
        });
    }
})