/*
 *  Feed_Earthquake.js
 *
 *  David Janes
 *  IOTDB
 *  2014-02-16
 *
 *  Monitor earthquakes
 */

"use strict";

var iotdb = require("iotdb")

var iot = new iotdb.IOT({
    models_path: [
        "$IOTDB_PROJECT/../iotdb-models/feeds"
    ],
    load_models: true,
    load_drivers: true,
    iotdb_thing_get: false,
    iotdb_thing_create: false,
    discover: false
});

iot.on_thing(function(iot, thing) {
    thing.on_change(function(thing, attributes) {
        console.log("+ changes!", thing.stated)
    })
})
iot.on_things(function(iot, things) {
    iotdb.helpers.dump_things(iot, things)
})
iot.on_ready(function() {
    iot.discover({
        model: "USGSEarthquake"
    })
})
