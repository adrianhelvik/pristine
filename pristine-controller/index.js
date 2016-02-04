'use strict';

module.exports = Controller;
var EventHandler = require( 'pristine-eventhandler' );


function Controller( options ) {
    'use strict';
    
    if ( ! options ) {
        throw new Error( 'Controller invalid. No options given' );
    }

    if ( ! options.fn ) {
        throw new Error( 'Controller for invalid. No fn (controller function) parameter given' );
    }

    var controller = options.fn;
    var dependencies = options.dependencies || [];
    var model = options.model || [];
    var parameters = options.parameters || []; // html parameters (unimplemented)
    var eventHandler = new EventHandler();

    function controllerFunction() {
        var controllerInterface = {};
        var storage = {};

        model.forEach( function ( key ) {
            Object.defineProperty( controllerInterface, key, {
                set: function ( value ) {
                    storage[ key ] = value;
                    eventHandler.emit( 'update' );
                },
                get: function () {
                    return storage[ key ];
                }
            } );
        } );

        Object.freeze( controllerInterface );

        return controller.call( controllerInterface, dependencies );
    };

    return {
        execute: controllerFunction,
        on: eventHandler.on,
        emit: eventHandler.emit
    }
}
