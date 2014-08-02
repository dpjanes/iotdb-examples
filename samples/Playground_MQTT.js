/*
 *  Playground_MQTT.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-08
 *
 *  Demonstrate a Model receiving MQTT messages
 *
 *  To test:
 *  - run this program
 *  - go to https://iotdb.org/playground/home
 *  - change the on/off value of lights
 *  - see them change here
 */

"use strict";

var iotdb = require("iotdb")

var MQTTLight = iotdb.make_model('MQTTLight')
    .attribute(
        iotdb.make_boolean(":on")
    )
    .driver_in(function(paramd) {
        var key = paramd.driverd.mqtt_topic.replace(/^.*[/]/, '')
        paramd.thingd[key] = paramd.driverd.mqtt_message
    })
    .make()
    ;

var iot = new iotdb.IOT({
    load_drivers: true,
    load_models: false,
    iotdb_thing_get: false,
    iotdb_thing_create: false,
    discover: false
});

iot.on_register_things(function() {
    var paths = [
        "kitchen/light",
        "bedroom/light",
        "basement/hue/1",
        "basement/hue/2",
        "basement/hue/3"
    ]
    for (var pi = 0; pi < paths.length; pi++) {
        var path = paths[pi];

        iot.discover({
            model: MQTTLight,
            driver: ":mqtt",
            initd: {
                mqtt_topic: "iot/" + path + "/#",
                mqtt_broker: "mqtt.iotdb.org",
                mqtt_json: true
            }
        })
    }
})
iot.on_thing(function(iot, thing) {
    thing.on(null, function(thing, attribute, value) {
        console.log("+ attribute changed", thing.initd, attribute.get_code(), value);
    });
})
