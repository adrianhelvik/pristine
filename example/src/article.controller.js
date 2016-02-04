var ViewModel = require( 'pristine-viewmodel' );

var article = new ViewModel( 'article' );

article.controller( {
    dependencies: [
        require( './config' ),
        require( 'ajax' ),
        require( 'slugifier' ),
        require( 'excerptGenerator' )
    ],
    interface: [ 'title', 'content', 'slug' ],
    parameters: [ 'id' ],
    fn: function ( config, ajax, slugifier, excerptGenerator ) {
        var vm = this;

        ajax.get( config.basUrl + '/articles/' + vm.id ).then(
            function () {
                vm.slug = slugifier.slug( vm.title );
                vm.excerpt = excerptGenerator.createExcerpt( vm.content );
            }
        );
    }
} );

module.exports = article;
