/*
 *  house-of-janes/common.js
 *
 *  David Janes
 *  IOTDB
 *  2014-05-04
 *
 *  Shared code for all the various HOJ modules.
 *  Customize globald to your own particular taste
 */

"use strict";

var iotdb = require("iotdb")

exports.globald = {
    house : {
        name: "David",
        possessive: "David's",
        name_is: "David's"
    }
}

exports.iot = new iotdb.IOT({
    twitter: true,
    load_models: true,
    load_drivers: true,
    iotdb_device_get: false,
    iotdb_device_create: false,
    models_path: [
        "$IOTDB_PROJECT/../iotdb-models/feeds",
        "$IOTDB_PROJECT/../models/firmata"
    ], 
});

exports.shared = {
}
