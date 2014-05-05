# House of Janes

Inspired by Tom Coates' "House of Coates" twitter account, we've created our own version using Node and IOTDB.

Note the setup required for these examples. There's a number of steps,
but none of them are overly complicated.

## Get your IOTDB account

This is optional, but will be highly useful when we integrate sensors.

Please contact us to get this set up. 
Put your name on our mailing list at [https://iotdb.org/](https://iotdb.org/)
and send me an email @ [iotdb@iotdb.org](mailto:iotdb@iotdb.org)

## Install Node IOTDB

[See the instructions here](https://iotdb.org/docs/node/getting-started)

## Download this github project

    $ git clone https://github.com/dpjanes/iotdb-examples.git

## iotdb-control

Go to this project directory, i.e. 

	$ cd iotdb-examples/house-of-janes

### Setup the project

    $ iotdb-control update-project

Enter your IOTDB username. The other questions answer "y" to everything

### Setup oauth

If you haven't got an IOTDB account yet, skip this step

    $ iotdb-control oauth-iotdb

Enter your IOTDB username and password. The password is not stored!

### Setup Twitter

This is **non-optional**. 
[Go to this page on IOTDB](https://iotdb.org/docs/node/twitter) and follow the instructions. This is the most horrible part of this project.


### Setup Foursquare

Find your Foursquare checkin feed
[https://foursquare.com/feeds/](https://foursquare.com/feeds/)

Add it:

	iotdb-control set foursquare_rss <the-url>
	
### Setup Weather

Find your Weather feed here
[http://past.theweathernetwork.com/rss/](http://past.theweathernetwork.com/rss/)

Add it:

	iotdb-control set weather_rss <the-url>

## Run

	node HouseOfJanes



