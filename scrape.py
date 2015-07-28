# Best scraper 2015

from bs4 import BeautifulSoup
import json

mplist = {}

f = open( "gov.txt" )
fw = open( "gov.json", "w" )

html = f.read().decode( "utf8", "ignore" )

soup = BeautifulSoup( html, "html.parser" )
mp = soup.find( id="ctl00_ctl00_FormContent_SiteSpecificPlaceholder_PageContent_rptMembers_ctl72_trItemRow" )

for i in range( 1, 650 ):
	if ( i < 10 ):
		text = soup.find( id="ctl00_ctl00_FormContent_SiteSpecificPlaceholder_PageContent_rptMembers_ctl0" + str( i ) + "_trItemRow" )
	else:
		text = soup.find( id="ctl00_ctl00_FormContent_SiteSpecificPlaceholder_PageContent_rptMembers_ctl" + str( i ) + "_trItemRow" )

	cleanse = str( text )
	#print( cleanse )
	mpsoup = cleanse.split( "\n" )
	#print( mpsoup )
	mpname = mpsoup[ 2 ]
	mpname = mpname.split( ">" )

	mpname = mpname[ 1 ].replace( "</a", "" )
	mparty = mpsoup[ 3 ].replace( "<tr>", "" )
	mparty = mpsoup[ 3 ].replace( "</tr>", "" )
	mparty = mparty.replace( " ", "" )
	mparty = mparty.replace( "\r", "" )
	mparty = mparty.replace( "\n", "" )
	mparty = mparty.replace( "(", "" )
	mparty = mparty.replace( ")", "" )

	mpconst = mpsoup[ 5 ]
	mpconst = mpconst.replace( "<td>", "" )
	mpconst = mpconst.replace( "</td>", "" )
	mpconst = mpconst.replace( ",", " " )
	mpconst = mpconst.replace( " ", "-" )
	mpconst = mpconst.lower()

	#print( soup2 )

	print( "Name: " + mpname )
	print( "Party: " + mparty )
	print( "Constituancy: " + mpconst )

	#print( location )

	mplist[ mpconst ] = [ mparty, mpname ]

print( json.dumps( mplist ) )
print( "Scrapped data successfully!" )

fw.write( json.dumps( mplist, sort_keys = True ) )