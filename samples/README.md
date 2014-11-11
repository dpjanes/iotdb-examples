# Setup

Many examples of using Node-IOTDB to handle 
events, etc.

Make sure you're set up as per:

https://iotdb.org/docs/node/getting-started

## OAuth

Consider running this command so your Node-IOTDB
installation can store and retrieve data on iotdb.org.
It's optional

    $ iotdb-control oauth-iotdb --global

## SmartThings

MQTT events from SmartThings (using IOTDB-Smartthings) 
are tied to IOTDB usernames.

Run the command to add user username first

    $ iotdb-control update-project
