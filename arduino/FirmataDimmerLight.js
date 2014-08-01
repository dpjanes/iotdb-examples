/*
 *  FirmataDimmerLight.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-30
 *
 *  - connect LEDs to pins D3 & D5
 *  - the lights will gradually get brighter
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

var dimmers = iot.things().with_model("FirmataLightDimmer")

var value = 0
setInterval(function() {
    dimmers.set('brightness', value)
    value += 0.02
    if (value > 1) {
        value = 0
    }
}, 50)
