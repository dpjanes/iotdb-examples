## Data Stores

Data Stores are places where you can
send sensor data, i.e. changes to your Things.

There are three things that have to be
happen for this to work (for each Thing)

* a "channel" (terminology varies) has to be created
* the channel has to be configured
* data has to be sent to the channel

IOTDB can do the last operation automatically, but
the first two items may have to be manually done, 
depending on the particualar data store. 
If you do have to do a manually step, the 
appropriate commands on how to do this will be listed on the
command line.

### Dweet.io

Node-IOTDB can automatically create and maintain [dweet.io](http://dweet.io)
stores.

Example:
http://dweet.io/follow/smart-things-three-axis:d28141d0c23c31e8065bb0df77e20c25

### ThingSpeak

Node-IOTDB cannot create ThingSpeak channels, though it can configure
the channel once it's configured.

Right now we can only talk to the ThinkSpeak server. 
Because ThingSpeak is an open source project, you can run
your own server.
If you need Node-IOTDB updated for this, let us know.

### Phant / data.sparkfun.org

Phant is the data engine behind http://data.sparkfun.org. 

If you're interested in running your own Phant engine (it's 
not too challenging)
start here: https://github.com/sparkfun/phant-manager-http
If you have issues get in touch.


You have to create streams (a channel) on Phant manually. 
You will be prompted by Node-IOTDB as follows (with no line breaks)

    iotdb-control configure-store-thing \
        --store :phant \
        --thing urn:iotdb:device:966ce4b37255c33eeffe789f8d62036c \
        --model smart-things-contact

To do this:

* create a your stream on Phant / data.sparkfun.org
* copy the private and public URLs somewhere safe
* run the command above
* you will be prompted for the name of your Phant server,
  the Public Key and the Private Key
* **depending** on the server, you may have to 
  manually set things up. You will be given the info
  on the console
