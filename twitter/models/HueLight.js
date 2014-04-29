/*
 *  HueLight.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-29
 *
 *  Testing model for HueLight
 */

"use strict"

var iotdb = require("iotdb")

exports.Model = iotdb.make_model('HueLight')
    .driver_identity(":hue")
    .attribute(
        iotdb.make_boolean(":on")
    )
    .attribute(
        iotdb.make_string(":color")
            .format(":color")
    )
    .make()
    ;
