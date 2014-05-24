/*
 *  HueLight_BlinkOnTwitter.js
 *
 *  David Janes
 *  IOTDB
 *  2014-05-23
 *
 *  This will blink the lights every time
 *  Twitter is mentioned.
 *
 *  You must must have Twitter OAuth configured
 *  using iotdb-control. See:
 *  https://iotdb.org/docs/node/twitter
 */

"use strict"

var iotdb = require("iotdb")

var iot = new iotdb.IOT({
    models_path: [
        "$IOTDB_PROJECT/../models/ots"
    ],
    load_models: true,
    load_drivers: true,
    iotdb_device_get: false,
    iotdb_device_create: false,
    twitter: true,
    discover: false
});

iot.on_ready(function() {
    iot.discover(":hue")

    if (!iot.twitter) {
        console.log("# SORRY, twitter isn't configured -- exiting")
        process.exit(0)
    } else {
        console.log("+ search Twitter for 'laywer'")
        iot.twitter.search("lawyer", function(message) {
            console.log("+ got it", message.stated)
            iot.things()
                .with_driver(":hue")
                .set(':color', 'red')
                .after(750, function(things) {
                    things.set(':on', false)
                })
            ;
        })
    }
})
