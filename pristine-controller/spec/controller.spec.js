var Controller = require( '../index' );

describe( 'Controller', () => {

    it( 'returns the same value as the controller function', () => {

        function fn() { return '123'; }

        var controller = Controller( {
            fn: fn
        } );

        expect( fn() ).toBe( controller.execute() );
    } );

    it( 'exposes events', () => {
        var controller = Controller( {
            fn: function () {}
        } );

        var executed = false;

        controller.on( 'update', () => {
            var executed = true;
        } );

        controller.execute();

        expect( executed ).toBe( true );
    } );

    xit( 'executes the given function when called', () => {

        var executed = false;
        
        var controller = Controller( {
            fn: function () {
                executed = true;
            }
        } );

        controller();

        expect( executed ).toBe( true );
    } );

    xit( 'injects given dependencies', () => {

        var value = 0;

        var controller = new Controller( {
            dependencies: [ 42 ],
            fn: function ( meaningOfLife ) {
                value = 42;
            }
        } );

        controller();

        expect( value ).toBe( 42 );
    } )

    xit( 'throws an exception when trying to access a value not in the model', () => {

        var controller = new Controller( {
            fn: function () {
                this.x = 10;
            }
        } );

        expect( controller ).toThrow();
    } );

    xit( 'allows changing then model', () => {
        
        var controller = new Controller( {
            model: [ 'value' ],
            fn: function () {
                this.value = 42;

                // expect( this.value ).toBe( 42 );
            }
        } );

        controller();
    } );

    xit( 'calls event "updated", after updating the model' );

} );
