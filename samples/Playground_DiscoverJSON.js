/*
 *  Playground_DiscoverJSON.js
 *
 *  David Janes
 *  IOTDB
 *  2014-02-08
 *
 *  Talk to the IOTDB playground using multiple models
 *  and the 'discover_json' function.
 *
 *  IMPORTANT REQUIREMENTS:
 *  - have an IOTDB account
 *  - do: 'iotdb-control update-project' - make sure to set your username
 *  - do: 'iotdb-control oauth-iotdb' 
 */

"use strict";

var iotdb = require("iotdb")

var iot = new iotdb.IOT({
    require_username: true,
    require_iotdb_oauth: true,
    load_drivers: true,
    load_models: true,
    models_path: [
        "$IOTDB_PROJECT/../models/abstract"
    ],
    iotdb_device_get: true,
    iotdb_device_create: true,
    discover: false
});
iot.on_register_things(function(iot) {
    iot.discover_json("http://playground-home.iotdb.org/kitchen/light", "abstract-light-simple")
    iot.discover_json("http://playground-home.iotdb.org/bedroom/light", "abstract-light-simple")
    iot.discover_json("http://playground-home.iotdb.org/basement/hue/1", "abstract-light-color")
    iot.discover_json("http://playground-home.iotdb.org/basement/hue/2", "abstract-light-color")
    iot.discover_json("http://playground-home.iotdb.org/basement/hue/3", "abstract-light-color")
})
iot.on_things(function(iot, things) {
    var count = 0;
    setInterval(function() {
        things.with_room("Kitchen").set(':on', count++ % 2)
    }, 1000)

    iotdb.helpers.dump_things(iot, things)
})
