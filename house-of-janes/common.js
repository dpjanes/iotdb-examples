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
    auto_load_models: true,
    auto_load_drivers: true,
    auto_iotdb_device_get: false,
    auto_iotdb_device_create: false,
});

exports.shared = {
}
