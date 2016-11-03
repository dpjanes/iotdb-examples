/*
 *  wemo_1.js
 *
 *  David Janes
 *  IOTDB.org
 *  2014-07-11
 *
 *  Blink WeMo lights
 */

var iotdb = require('iotdb')

var iot = iotdb.iot()
var wemos = iot.connect("WeMoSwitch")
wemos.on("thing", function(wemo) {
    console.log("+ found wemo")
})

var on = false
setInterval(function() {
    wemos.set(':on', on)
    on = !on
}, 2000)
