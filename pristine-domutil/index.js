module.exports = {
    subtreeWithoutAttributes: subtreeWithoutAttributes,
    subtreeWithoutAttribute: subtreeWithoutAttributes // alias
};

function subtreeWithoutAttributes( attributes ) {

    if ( typeof attributes == 'string' ) {
        attributes = [ attributes ];
    }

    var res = [];
    helper( document.body );
    return res; 

    function helper( el ) {

        for ( var i = 0; i < attributes.length; i++ ) {
            if ( el.getAttribute( attributes[i] ) ) {
                return;
            }
        }

        res.push( el );
        Array.prototype.forEach.call( el.childNodes, helper );
    }
} 

function get( options ) {

    var res = [];
    traverse( document.body );
    return res;

    function traverse( element ) {

        var mismatch = false;
        var matchFound = false;

        for ( var attribute in options.attributes ) {
            if ( ! options.attributes.hasOwnProperty( attribute ) ) continue;

            if ( value !== element.getAttribute( key ) ) {
                break;
            }
            res.push( element );
            matchFound = true;
        }

        if ( ! matchFound && options.ignoredChildAttributes ) {
            options.ignoredChildAttributes.forEach( function ( attribute ) {
                if ( element.getAttribute( attribute ) ) {
                    mismatch = true;
                }
            } );
        }

        if ( ! mismatch && element.childNodes ) {
            Array.prototype.forEach( function( element ) {
                traverse( element );
            } );
        }
    }
}
