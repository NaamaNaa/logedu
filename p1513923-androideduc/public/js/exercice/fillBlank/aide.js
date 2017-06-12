/**
 * Created by HAMIZI16000 on 10/06/2017.
 */
function sameLetters(ch1,ch2) {

    if(ch1==ch2)
    {
        return "Bonne réponse !! ";
    }
    var tab1 = ch1.split('');
    var tab2 = ch2.split('');

    if(Math.abs(tab1.length-tab2.length)>3)
    {
        return "Nous t'encourageons à refaire cette question !! :)";

    }
    else
    {
        for(var i=0; i<tab1.length; i++)
        {

            var passe = 0;
            if(tab1[i]==tab2[i])
            {
                tab1[i]='';
                tab2[i]='';
            }
            else
            {
                var j = i;
                while(tab1[i]!=tab2[j] && j<tab2.length && passe == 0)
                {
                    j++;

                    if(tab1[i]==tab2[j])
                    {
                        tab1[i]='';
                        tab2[j]='';
                        passe = 1;
                    }
                }
            }


        }
        var taille = tab1.length;
        var sors = 0;
        while(taille !=1 && sors == 0 )
        {
            if(tab1[taille]==tab2[taille])
            {
                taille --;
            }
            else
            {
                sors = 1;
            }

        }
        if(taille == 1)
        {
            return "T'y es presque tu as juste inversé l'ordre des lettres !";
        }
        else if(sors == 1)
        {
            return "Nous t'encourageons à refaire cette question !! :)";
        }


    }

}
$( document ).ready(function()
{
    $("#btnAide").click(function(event)
    {
        event.preventDefault(); // desactiver l'evenement$("#quest2Help").append('<a id="aide" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">live_help</i></a>') ;
        if($("#input1").attr('data-response') == $("#input1").val()) {


            $("#input1").css("borderColor", "green");
            $("#quest1Help").css("display", "none");

        }
        else
        {


            $("#input1").css("borderColor" , "red");
            $("#quest1Help").css("display", "inline-block");
            $("#quest1Help").click(function ()
            {
                var waited1 = $("#input1").attr('data-response');
                var submitted1 = $("#input1").val();
                var aide1 = sameLetters(submitted1,waited1);
                Materialize.toast(aide1, 5000);



            })



        }
        if($("#input2").attr('data-response') == $("#input2").val()) {


            $("#input2").css("borderColor", "green");
            $("#quest2Help").css("display", "none");


        }
        else
        {


            $("#input2").css("borderColor", "red");
            $("#quest2Help").css("display", "inline-block");
            $("#quest2Help").click(function ()
            {
                var waited2 = $("#input2").attr('data-response');
                var submitted2 = $("#input2").val();
                var aide2 = sameLetters(submitted2,waited2);
                Materialize.toast(aide2, 5000);



            })

        }

    })

})