/*
 *  wemo_1.js
 *
 *  David Janes
 *  IOTDB.org
 *  2014-07-11
 *
 *  Control a WeMo. 
 *  If argument 1 is "on", the lights will be turned on
 */

var iotdb = require('iotdb')

iotdb
    .iot()
    .on_things(function(things) {
        iotdb.iot().dump(things)
    })
    .connect("WeMoSwitch")
    .set(":on", process.argv.length == 3 && process.argv[2] == "on" ? true : false)
