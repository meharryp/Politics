var express = require( "express" );
var app = express();
var http = require( "http" ).Server( app );
var fs = require( "fs" )
var cheerio = require( "cheerio" )

var govData = fs.readFileSync( "gov.json" )
var imgs = fs.readFileSync( "mpimg.json" )

// You didn't say the magic word!
app.get( "/app.js", function( req, res ){
	res.end( "IT'S A UNIX SYSTEM, I KNOW THIS" )
} );

app.get( "/template.html", function( req, res ){
	res.end( "IT'S A UNIX SYSTEM, I KNOW THIS" )
} );

app.use( express.static( "./" ) );

app.get( "/", function( req, res ) {
  res.sendFile( "./index.html" );
} );

app.get( "/undefined", function( req, res ){
	res.sendFile( "/var/node/Politics/missing.png" )
} );

app.get( "/info/undefined", function( req, res ){
	res.sendFile( "/var/node/Politics/missing.png" )
} );

var data = JSON.parse( govData )
var imgs = JSON.parse( imgs )

String.prototype.replaceAll = function(str1, str2, ignore){
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}

for ( var constit in data ){
	//console.log( data[ constit ] )
  	app.get( "/" + constit, function( req, res ) {
  		var url = req.originalUrl.replace( "/", "" )
  		var urlAsTitle = url
  		url = url.toLowerCase();

  	 	console.log( url );
		var html = fs.readFileSync( "./template.html", encoding = "utf8" );

		html.replace( "[[CONST_TITLE]]", urlAsTitle );
		html.replace( "[[CONST_PARTY]]", data[ url ][ 0 ] );
		html.replace( "[[CONST_MP]]", data[ url ][ 1 ] );
		
		var $ = cheerio.load( html );
		$( "#repTitle" ).html( url );
		$( "#repParty" ).html( data[ url[ 0 ] ] );
		$( "#reMP" ).html( data[ url[ 1 ] ] );
		$( "#repInfo" ).attr( "href", "/info" + req.originalUrl );
		console.log( $( "#repTitle" ).text() );
		console.log( html );
		//console.log( html );
		res.end( $.html() );
  	} );
  	app.get( "/info/" + constit, function( req, res ){
  		var url = req.originalUrl.replace( "/info/", "" );
  		url = url.toLowerCase();
  		console.log( url );
  		var img = ""
  		if ( imgs[ data[ url ][ 1 ] ] != "undefined" ){
  			img = imgs[ data[ url ][ 1 ] ];
  		} else {
  			img = "missing.png";
  		}
  		res.end( "<html><head><title>" + url + "</title><body>Name: " + data[ url ][ 1 ] + "<br>Party: " + data[ url ][ 0 ] + "<br>Image: <img src=" + imgs[ data[ url ][ 1 ] ] + "></img></body></html>" );
  	} );
  	console.log( constit )
}

app.get( "/info", function( req, res ){
	res.statusCode = 302;
	res.setHeader( "location", "/" )
	res.end()
} );

http.listen( 80, function(){
    console.log( "Started server on port 80" );
} ); 