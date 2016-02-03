'use strict';

module.exports = View;

var Controller = require( 'pristine-controller' );
var EventHandler = require( 'pristine-eventhandler' );
var ViewParser = require( 'pristine-viewparser' );

function ViewModel( name, options ) {
    if ( ! typeof name == 'string' ) {
        throw new Error( 'String expected for view name' );
    }

    if ( ! options ) {
        options = {};
    }

    var controller = null;
    var eventHandler = new EventHandler();

    var self = {
        name: name,
        controller: getOrSetController,
        emit: eventHandler.emit,
        on: eventHandler.on,
    };

    if ( ! options.mocked ) {
        self.viewParser = ViewParser( {
            view: self,
            selector: '[model="' + self.name + '"]'
        } );
    }

    return self;

    function getOrSetController( options ) {
        if ( ! options ) {
            return controller;
        } else if ( controller ) {
            throw new Error( 'Redefinition of controller for view ' + name + ' not legal.' );
        } else {
            controller = new Controller( options );
        }
    }
}
