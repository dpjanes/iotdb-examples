/*
 *  SmartThings_Switch1.js
 *
 *  David Janes
 *  IOTDB
 *  2014-02-26
 *
 *  Talk to a SmartThings switch
 *  Using a proper SmartThings enabled class
 *
 *  Note:
 *  SmartThings requires quite a bit of setup. See
 *  https://github.com/dpjanes/iotdb-smartthings
 */

"use strict";

var iotdb = require("iotdb")

var SmartThingsSwitch = iotdb.make_model('SmartThingsSwitch')
    .attribute(
        iotdb.make_boolean("on")
    )
    .driver_identity({
        driver: "iot-driver:smartthings",
        type: "switch"
    })  
    .driver_out(function(paramd) {
        if (paramd.thingd.on !== undefined) {
            paramd.driverd['switch'] = paramd.thingd.on ? 1 : 0
        }
    })
    .make()
    ;

var iot = new iotdb.IOT();
iot.on_register_things(function(iot) {
    iot.register_model(SmartThingsSwitch)
})
iot.on_thing(function(iot, thing) {
    console.log("+ SmartThings discovered");
    thing.on(':on', function() {
        console.log("+ ON changed", thing.get(':on'));
    });

    setInterval(function() {
        thing.set(':on', !thing.get(':on'));
    }, 4000);
});
iot.on_ready(function() {
    iot.discover("iot-driver:smartthings")
})
