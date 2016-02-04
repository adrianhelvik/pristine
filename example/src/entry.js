'use strict';

document.writeln( 'js loaded' );

try {
    require( 'lodash' );
} catch ( error ) {
    console.log( 'Could not load node modules' );
}

var ViewModel = require( 'pristine-viewmodel' );
