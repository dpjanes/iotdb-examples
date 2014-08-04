/*
 *  st_contact_1.js
 *
 *  David Janes
 *  IOTDB
 *  2014-02-26
 *
 *  Note:
 *  SmartThings requires quite a bit of setup. See
 *  https://github.com/dpjanes/iotdb-smartthings
 */

"use strict";

var iotdb = require("iotdb")

iotdb
    .iot()
    // .connect("SmartThingsMotion")
    .connect("SmartThingsContact")
    .on_change(function(thing) {
        console.log("+ thing", thing.state())
    })
