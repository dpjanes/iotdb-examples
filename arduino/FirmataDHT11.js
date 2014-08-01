/*
 *  FirmataDHT11.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-30
 *
 *  - Have a DHT11 connected to pin D2
 *
 *  Make sure to see README
 *
 *  IMPORTANT: run these commands
 *  
 *  iotdb-control set firmata/firmata-dht11/tty /dev/tty.usbmodem411 --global 
 *  iotdb-control set firmata/firmata-dht11/pin 2
 */

"use strict";

var iotdb = require("iotdb")

iotdb
    .iot()
    .connect("FirmataDHT11")
    .on(':temperature', function(thing, attribute, value) {
        console.log("+ temperature (C)", value)
    })
    .on(':humidity', function(thing, attribute, value) {
        console.log("+ humidity", value)
    })
