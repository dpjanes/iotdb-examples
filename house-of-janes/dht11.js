/*
 *  house-of-janes/dht11.js
 *
 *  David Janes
 *  IOTDB
 *  2014-05-04
 *
 *  DHT11 / Firmata controlled devices
 */

"use strict";

var common = require("./common")
var iot = common.iot
var globald = common.globald
var shared = common.shared

var PIN_DHT11 = 2

var arduino_tty = iot.cfg_get("arduino_tty")
if (!arduino_tty) {
    console.log("# no 'arduino_tty' defined")
    console.log("  save with: iotdb-control set arduino_tty /dev/your-tty")
    console.log()
} else {
    iot.on_register_things(function() {
        iot.discover({
            model: "FirmataDHT11",
            driver_iri: ":firmata",
            initd : {
                pin: PIN_DHT11,
                api: arduino_tty
            },
        })
    })
}

var last_temperature = null
var on_temperature = function(thing, attribute, current_temperature) {
    console.log("+ temperature °C", current_temperature)

    if (last_temperature != null) {
        if (current_temperature < last_temperature) {
            iot.twitter.send(iot.format("It's getting colder inside - it's now {{ temperature }}°C", thing))
        } else if (current_temperature > last_temperature) {
            iot.twitter.send(iot.format("It's getting warmer inside - it's now {{ temperature }}°C", thing))
        }
    }

    last_temperature = current_temperature
}

var last_humidity = null
var on_humidity = function(thing, attribute, current_humidity) {
    console.log("+ humidity", current_humidity)
    if (last_humidity == null) {
        last_humidity = current_humidity
    } else {
        if (current_humidity < (last_humidity - 5)) {
            iot.twitter.send(iot.format("It's getting less humid inside - {{ humidity }}%", thing))
            last_humidity = current_humidity
        } else if (current_humidity > (last_humidity + 5)) {
            iot.twitter.send(iot.format("It's getting more humid inside - {{ humidity }}%", thing))
            last_humidity = current_humidity
        }
    }
}

iot.on_thing_with_model("FirmataDHT11", function(iot, thing) {
    thing.on('temperature', on_temperature)
    thing.on('humidity', on_humidity)
})
