import urllib
import json

mps = {}

for i in range( 1, 273 ):
	print( i )
	f = urllib.urlopen( "https://yournextmp.popit.mysociety.org/api/v0.1/persons/?page=" + str( i ) )
	data = json.loads( f.read().decode( "utf8" ) )
	for i in data[ "result" ]:
		mpdata = i[ "name" ].split( " " )
		if i[ "name" ] != "Chinners":
			mpname = mpdata[ 1 ] + ", " + mpdata[ 0 ]
		else:
			mpname = "Chinners"
		print( str( mpname.encode( "utf8") ) )
		if i.has_key( "image" ):
			print( str( i[ "image" ].encode( "utf8" ) ) )
			img = str( i[ "image" ].encode( "utf8" ) )
		else:
			print( "noimage" )
			img = "noimage"

		mps[ mpname ] = img

print( mps )
w = open( "mpimg.json", "w" )

w.write( json.dumps( mps, sort_keys = True ) )