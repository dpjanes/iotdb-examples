/*
 *  Feed_Foursquare.js
 *
 *  David Janes
 *  IOTDB
 *  2014-05-03
 *
 *  Monitor a foursquare feed
 */

"use strict";

var iotdb = require("iotdb")

var iot = new iotdb.IOT({
    models_path: [
        "$IOTDB_PROJECT/../models/feeds"
    ],
    load_models: true,
    load_drivers: true,
    iotdb_device_get: false,
    iotdb_device_create: false,
    discover: false
});

iot.on_register_things(function() {
    var foursquare_rss = iot.cfg_get("foursquare_rss")
    if (!foursquare_rss) {
        console.log("# no 'foursquare_rss' defined")
        console.log("  find your feed here: https://foursquare.com/feeds/")
        console.log("  save with: iotdb-control set foursquare_rss <the-url>")
        console.log()
        process.exit(0)
    } else {
        iot.discover({
            model: "FoursquareCheckin",
            driver_iri: "iot-driver:feed",
            initd : {
                api: foursquare_rss,
                fresh: false
            },
        })
    }
})
iot.on_thing(function(iot, thing) {
    thing.on_change(function(thing, attributes) {
        console.log("+ changes!", thing.stated)
    })
})
iot.on_things(function(iot, things) {
    iotdb.helpers.dump_things(iot, things)
})
