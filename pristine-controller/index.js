'use strict';

module.exports = Controller;

function Controller( options ) {
    if ( ! options ) {
        throw new Error( 'Controller invalid. No options given' );
    }

    if ( ! options.fn ) {
        throw new Error( 'Controller for invalid. No fn (controller function) parameter given' );
    }

    var controller = options.fn;
    var dependencies = options.dependencies || [];
    var interfaceValues = options.interface || [];
    var parameters = options.parameters || [];

    function controllerFunction() {
        var controllerInterface = {};
        var storage = {};

        interfaceValues.forEach( function ( key ) {
            Object.defineProperty( controllerInterface, key, {
                set: function ( value ) {
                    storage[ key ] = value;
                },
                get: function () {
                    return storage[ key ];
                }
            } );
        } );

        Object.freeze( controllerInterface );

        controller.call( controllerInterface, dependencies );
    };

    return controllerFunction;
}
