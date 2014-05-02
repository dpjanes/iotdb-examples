/*
 *  FirmataDHT11.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-30
 *
 *  Arduino DHT11 temperature sensor connected to Pin 2
 */

"use strict";

var iotdb = require("iotdb")

exports.Model = iotdb.make_model('FirmataDHT11')
    .product("http://www.seeedstudio.com/depot/Grove-TempHumi-Sensor-p-745.html")
    .attribute(
        iotdb.make_value("humidity")
            .measuring(":humidity")
    )
    .attribute(
        iotdb.make_value("temperature_c")
            .unit(":temperature.si.celsius")
    )
    .attribute(
        iotdb.make_value("temperature_f")
            .unit(":temperature.si.fahrenheit")
    )
    .driver_identity(":firmata")
    .driver_setup(function(paramd) {
        paramd.initd["pins"] = "ht:pin=2,mode=sysex-input-float,extension=dht"
    })
    .driver_in(function(paramd) {
        if (paramd.driverd.ht !== undefined) {
            paramd.thingd.humidity = paramd.driverd.ht[0]
            paramd.thingd.temperature_c = paramd.driverd.ht[1]
            paramd.thingd.temperature_f = paramd.driverd.ht[1] * 9 / 5 + 32
        }
    })
    .driver_out(function(paramd) {
        console.log(paramd.thingd)
    })
    .make()
    ;

