module.exports = ViewParser;
var DOMUtil = require( 'pristine-domutil' );

var forEach = Array.prototype.forEach.call;

function ViewParser( options ) {

    if ( ! options.viewModel ) {
        throw new Error( 'No view model specified when constructing view parser. Arguments { viewModel, selector } required' )
    }

    if ( ! options.selector ) {
        throw new Error( 'No selector specified when parsing view. Arguments { viewModel, selector } required' );
    }

    var self = {
        elements: fetchElements(),
        viewModel: options.viewModel
    };

    return self;

    function fetchElements() {
        return DOMutil.get( {

            // Find elements matching [model="name"]
            attributes: {
                'model': options.viewModel.name
            },
            
            // Ignore elements within for loops
            ignoredChildAttributes: [ 'p-for' ]
        } );
    }
}
