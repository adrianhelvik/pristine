var ViewModel = require( 'pristine-viewmodel' );

var login = new ViewModel( 'login' );

/**
 * Generated json for documentation
 *
 * {
 *     "view-name": "login",
 *     "dependencies": "ajax", "config",
 *     "interface": [ "email", "password", "submit" ],
 *     "controller-function": "..."
 * }
 *
 */
login.controller( {
    dependencies: [
        require( 'ajax' ),
        require( './config' )
    ],
    interface: [ 'email', 'password', 'submit' ],
    fn: function ( ajax, config ) {
        var vm = this;

        vm.submit = function () {
            ajax.post( config.baseUrl + '/sessions', {
                email: vm.email,
                password: vm.email
            } );
        }
    }
} );

module.exports = login;
