
function validatePassword ()
{

    var password = document.getElementById( "password" ),
        confirm_password = document.getElementById( "confirm_password" );

    if ( password.value != confirm_password.value ) {
        confirm_password.setCustomValidity( "Senhas diferentes!" ); console.log("entrei no validator")
    } else {
        confirm_password.setCustomValidity( '' );
    }
}

export default validatePassword;