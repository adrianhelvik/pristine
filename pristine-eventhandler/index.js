'use strict';

module.exports = EventHandler;

function EventHandler() {

    var self = {
        events: {}
    };

    return self;

    function emit( eventNames, options ) {
        if ( eventNames = eventNames.split( /\s+/ ).length > 1 ) {
            eventNames.forEach( function ( eventName ) {
                emit( eventName, options )
            } );
            return;
        }

        var eventName = eventNames;

        if ( ! self.events[ eventName ] ) {
            return;
        }

        self.events[ eventName ].forEach( function ( fn ) {
            fn( options );
        } );
    }

    function on( eventNames, fn ) {
        if ( eventNames = eventNames.split( /\s+/ ).length > 1 ) {
            eventNames.forEach( function ( eventName ) {
                emit( eventName, options )
            } );
            return;
        }

        var eventName = eventNames;

        self.events[ eventName ].push( fn );
    }
}
