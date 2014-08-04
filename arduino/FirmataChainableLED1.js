/*
 *  FirmataChainableLED.js
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

var temperature2color = function(temperature)  {
    var normalized = Math.min(1, Math.max(0, ((25.0 - temperature) / 15.0)))

    var c = new iotdb.libs.Color()
    c.set_hsl(normalized, 1, 0.5)

    return c.get_hex();
}

var led = iot.connect({
    model: "FirmataChainableLED",
    pin: 7
})
var dht11 = iot.connect({
    model: "FirmataDHT11",
    pin: 2
})

dht11
    .on(':sensor.temperature', function(thing, attribute, value) {
        led.set(":color", temperature2color(value))
    })
