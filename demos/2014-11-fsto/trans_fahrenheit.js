/*
 *  trans_fahrenheit.js
 *
 *  David Janes
 *  IOTDB
 *  2014-11-22
 *
 *  Have a DHT11 connected to pin D2
 *
 *  Make sure to see README
 *
 *  IMPORTANT: run these commands (or similar)
 *  
 *  iotdb set firmata/firmata-dht11/tty /dev/tty.usbmodem411 --global 
 *  iotdb set firmata/firmata-dht11/pin 2
 */

"use strict";

var iotdb = require("iotdb")
var iot = iotdb.iot();

var t_c = iot.connect("FirmataDHT11")
t_c.on('temperature', function(thing, attribute, value) {
    console.log("+ temperature (C)", value)
})

var t_f = t_c.transmogrify(iot.transmogrifier(":imperial/fahrenheit"))
t_f.on('temperature', function(thing, attribute, value) {
    console.log("+ temperature (F)", value)
})
