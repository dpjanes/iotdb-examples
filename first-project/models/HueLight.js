/*
 *  HuueLight.js
 *
 *  David Janes
 *  IOTDB
 *  2014-01-26
 */

var iotdb = require("iotdb")

exports.Model = iotdb.make_model('HueLight')
    .facet("lighting")
    .name("Hue Light")
    .description("Philips Hue colored light")
    .attribute(
        iotdb.control_boolean("on")
            .description("turn the light on or off")
    )
    .attribute(
        iotdb.control_color("color")
            .description("set the color of the light")
    )
    .driver_identity("iot-driver:hue")
    .make()
    ;
