/*
 *  common.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-23
 *
 *  Common code for the Arduino samples
 *
 *  We expect you have some or all of these
 *  devices connected to your Arduino. We're
 *  testing this on an Uno, the pins
 *  may need to be changed for your setup
 *
 *  Analog Pin 0: Potentiometer
 *  Digital/PWM Pin 3: LED
 *  Digital/PWM Pin 5: LED
 *  Digital Pin 4: Pushbutton
 *
 *  We used a Grove to set all this up - it's 
 *  a hell of a lot easier that breadboarding
 *  http://www.seeedstudio.com/wiki/GROVE_System
 */

"use strict";

var assert = require("assert")
var iotdb = require("iotdb")

exports.TAG_SWITCH = "switch"
exports.TAG_POTENTIOMETER = "potentiometer"
exports.TAG_LED = "led"
exports.TAG_LED_1 = "led_1"
exports.TAG_LED_2 = "led_2"

exports.make_iot = function() {
    var iot = new iotdb.IOT({
        load_drivers: true,
        iotdb_device_get: false,
        iotdb_device_create: false,
        discover: false,
        model_path: [
            "$IOTDB_PROJECT/../models/abstract"
        ]
    });

    iot.on_register_things(exports.register_things)

    return iot;
}

exports.register_things = function(iot) {
    // make sure to do (for whatever your TTY is)
    // iotdb-control set arduino_tty /dev/tty.usbmodem411
    var arduino_tty = iot.cfg_get("arduino_tty")
    assert.ok(arduino_tty && arduino_tty.length)

    iot.discover({
        model: "abstract-value-unit",
        driver_iri: ":firmata",
        initd : {
            tag: [ exports.TAG_LED, exports.TAG_LED_1 ],
            api: arduino_tty,
            pins: "value:pin=3,mode=analog-output"
        },
    })
    iot.discover({
        model: "abstract-value-unit",
        driver_iri: ":firmata",
        initd : {
            tag: [ exports.TAG_LED, exports.TAG_LED_2 ],
            api: arduino_tty,
            pins: "value:pin=5,mode=analog-output"
        },
    })
    iot.discover({
        model: "abstract-value-unit",
        driver_iri: ":firmata",
        initd : {
            tag: exports.TAG_POTENTIOMETER,
            api: arduino_tty,
            pins: "value:pin=0,mode=analog-input"
        },
    })
    iot.discover({
        model: "abstract-value-boolean",
        driver_iri: ":firmata",
        initd : {
            tag: exports.TAG_SWITCH,
            api: arduino_tty,
            pins: "value:pin=4,mode=digital-input"
        },
    })
}
