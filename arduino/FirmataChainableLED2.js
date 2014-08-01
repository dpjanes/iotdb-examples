/*
 *  FirmataChainableLED2.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-30
 *
 *  - Have a DHT11 connected to pin D2
 *  - Have a Grove Chainable LED connected to pin 7
 *  - As the temperature changes, so will the LED color
 *
 *  Note the use of the Color library to use 'hue'. We'll
 *  likely be making changes soon to the ChainableLED 
 *  Model so we can address N leds rather than 1!
 *
 *  Make sure to see README
 */

"use strict";

var iotdb = require("iotdb")
var iot = iotdb.iot()

var color = function(value)  {
    return (new iotdb.libs.Color())
        .set_hsl(value, 1, 0.5)
        .get_hex();
}

var led = iot.connect({
    model: "FirmataChainableLED",
    pin: 7
})
var pot = iot.connect({
    model: "FirmataInputUnit",
    pin: 0
})

pot
    .on(':value', function(thing, attribute, value) {
        led.set(":color", color(value))
    })
