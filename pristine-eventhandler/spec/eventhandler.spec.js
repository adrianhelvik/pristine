var EventHandler = require( '..' );

describe( 'pristine event handler', () => {

    var eventHandler;

    beforeEach( () => eventHandler = new EventHandler() );

    // Happy path

    it( 'should fire an event', () => {
        var fired = false;

        eventHandler.on( 'fire', () => {
            fired = true;
        } );

        eventHandler.emit( 'fire' );

        expect( fired ).toBe( true );
    } );

    it( 'should fire multiple events', () => {
        var firedCount = 0;

        eventHandler.on( 'fireA fireB', () => firedCount++ );

        eventHandler.emit( 'fireA' );
        eventHandler.emit( 'fireB' );

        expect( firedCount ).toBe( 2 );
    } );

    // Happy path

    it( 'should execute function with passed options as argument', () => {
        var pass = false;

        eventHandler.on( 'fire', function( value ) {
            pass = value;
        } );

        eventHandler.emit( 'fire', true );

        expect( pass ).toBe( true );
    } )


    describe( 'on', () => {

        // Sad path

        it ( 'should only accept a string and a function', () => {
            expect( () => eventHandler.on() ).toThrow();
            expect( () => eventHandler.on( 1, function () {} ) ).toThrow();
            expect( () => eventHandler.on( 'hello', 'world' ) ).toThrow();
        } );
    } );

    describe( 'emit', () => {

        // Sad path

        it( 'should only accept a string as its first argument', () => {
            expect( () => eventHandler.emit( function () {} ) ).toThrow();
            expect( () => eventHandler.emit( null ) ).toThrow();
        } )
    } );

} );
