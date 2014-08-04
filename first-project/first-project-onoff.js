/*
 *  test-project-onoff.js
 *
 *  See:
 *  https://iotdb.org/docs/node/first-project
 */

"use strict";

var iotdb = require("iotdb")

var things = iotdb
    .iot()
    .connect()

var count = 0;
setInterval(function() {
    things.set(':on', count++ % 2)
}, 2000);
