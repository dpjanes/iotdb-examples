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

exports.iot = iotdb.iot({
    iotdb_thing_create: false,
    iotdb_thing_get: false
})

exports.shared = {
}
