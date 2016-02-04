var gulp = require( 'gulp' );
var plugins = require( 'gulp-load-plugins' )();
var webpack = require( 'webpack' );

var src = 'src';
var dest = 'dest';

// Watchers
// --------

gulp.task( 'dev-server', [ 'watch', 'serve' ] );

gulp.task( 'watch', [ 'watch-jade', 'watch-webpack', 'serve' ] );

gulp.task( 'watch-webpack', [ 'webpack' ], () => {
    gulp.watch( [ './src/**/*.js', './node_modules/**/*.js' ], [ 'webpack' ] );
} );

gulp.task( 'watch-jade', [ 'jade' ], () => {
    gulp.watch( `./src/**/*.jade`, [ 'jade' ] );
} );

// Base tasks
// ----------

gulp.task( 'webpack', ( callback ) => {

    // Run webpack
    webpack( {

        //
        // Configuration
        //

        context: __dirname,
        entry: './src/entry',
        output: {
            path: __dirname + '/' + dest,
            filename: 'bundle.js'
        }

    }, ( error, stats ) => {
        if ( error ) {
            throw new plugins.util.PluginError( 'webpack', error );
        }
        plugins.util.log( '[webpack]', stats.toString( {
            //
            // output options
            // 
        } ) );
        callback();
    } );
} );

gulp.task( 'jade', () => {
    return gulp.src( `./src/**/*.jade` )
        .pipe( plugins.jade() )
        .pipe( gulp.dest( `./dest` ) );
} );

gulp.task( 'serve', plugins.serve( './dest' ) );
