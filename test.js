var http = require( "http" );
var fs = require( "fs" )

function request( request, responce ){
        responce.end( fs.readFileSync( "index.html" ) );
}

var server = http.createServer( request );

server.listen( 80, function(){
        console.log( "Server is listening on port 80." )
} );
