/*
 *  facet_1.js
 *
 *  David Janes
 *  IOTDB
 *  2014-08-11
 *  "In 1942, Hedy Lamarr and George Antheil patent frequency-hopping communications"
 *
 *  Turn all the lights off - a demo of facets
 */

"use strict"

var iotdb = require('iotdb')
var iot = iotdb.iot()

var things = iot
    .connect()
    .with_facet(":device.lighting")
    .set(":on", process.argv.length == 3 && process.argv[2] == "on" ? true : false)
