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
 *
 *  Notes:
 *  - the clever bit is using "driver": ":firmata" which
 *    forces IOTDB to bind the model to the Fimata Driver.
 *    The Firmata*js examples in this folder are
 *    a little simpler to to use
 */

"use strict";

var iotdb = require("iotdb")

exports.TAG_SWITCH = "switch"
exports.TAG_POTENTIOMETER = "potentiometer"
exports.TAG_LED = "led"
exports.TAG_LED_1 = "led_1"
exports.TAG_LED_2 = "led_2"

exports.iot = iotdb.iot()

exports.iot
    .connect({
        model: "abstract-value-unit",
        driver: ":firmata",
        pins: "value:pin=3,mode=analog-output"
    })
    .tag(exports.TAG_LED)
    .tag(exports.TAG_LED_1)
exports.iot
    .connect({
        model: "abstract-value-unit",
        driver: ":firmata",
        pins: "value:pin=5,mode=analog-output"
    })
    .tag(exports.TAG_LED)
    .tag(exports.TAG_LED_2)
exports.iot
    .connect({
        model: "abstract-value-unit",
        driver: ":firmata",
        pins: "value:pin=0,mode=analog-input"
    })
    .tag(exports.TAG_POTENTIOMETER)
exports.iot
    .connect({
        model: "abstract-value-boolean",
        driver: ":firmata",
        pins: "value:pin=4,mode=digital-input"
    })
    .tag(exports.TAG_SWITCH)

