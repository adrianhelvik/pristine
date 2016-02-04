'use strict';

var Controller = require( '../index' );

describe( 'Controller', () => {

    it( 'returns the same value as the controller function', () => {

        function fn() { return '123'; }

        var controller = Controller( {
            fn: fn
        } );

        expect( fn() ).toBe( controller.execute() );
    } );

    it( 'executes the given function when called', () => {

        var executed = false;
        
        var controller = Controller( {
            fn: function () {
                executed = true;
            }
        } );

        controller.execute();

        expect( executed ).toBe( true );
    } );

    it( 'calls update event when model is updated', () => {
        var controller = Controller( {
            model: [ 'value' ],
            fn: function () {
                this.value = 10;
            }
        } );

        var executed = 'not executed';

        controller.on( 'update', () => {
            executed = 'executed';
        } );

        controller.execute();

        expect( executed ).toBe( 'executed' );
    } );

    it( 'injects given dependencies', () => {

        var value = 0;

        var controller = new Controller( {
            dependencies: [ 42 ],
            fn: function ( meaningOfLife ) {
                value = 42;
            }
        } );

        controller.execute();

        expect( value ).toBe( 42 );
    } )

    it( 'throws an exception when trying to access a value not in the model', () => {

        var controller = new Controller( {
            model: [ 'id' ],
            fn: function () {
                this.id = 10;
                this.x = 10;
            }
        } );

        expect( controller.execute ).toThrow(); // in strict mode only
    } );

    it( 'allows changing then model', () => {
        
        var controller = new Controller( {
            model: [ 'value' ],
            fn: function () {
                this.value = 42;

                expect( this.value ).toBe( 42 );
            }
        } );

        controller.execute();

    } );
} );
