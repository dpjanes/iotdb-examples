/*
 *  FirmataInputBoolean.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-30
 *
 *  - Connect LEDs to D3 and D5
 *  - Connect a switch to D2 
 *  - LEDs will be controlled by the switch
 *
 *  Note that the model is the Dimmer light,
 *  but boolean values will be converted to 0 or 1
 *  which do the right thing anyway
 */

"use strict";

var iotdb = require("iotdb")

var iot = iotdb.iot()
iot.connect({
    model: "FirmataLightDimmer",
    pin: 5
})
iot.connect({
    model: "FirmataLightDimmer",
    pin: 3
})
var input = iot.connect({
    model: "FirmataInputBoolean",
    pin: 2
})

input.on(":value", function(thing, attribute, value) {
    iot
        .things()
        .with_code("FirmataLightDimmer")
        .set(":brightness", value)
})
