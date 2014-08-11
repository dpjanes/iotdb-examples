/*
 *  tcp_connected.js
 *
 *  David Janes
 *  IOTDB
 *  2014-08-10
 *  "Magellan space probe reached Venus 24 years ago today"
 *
 *  Set the brightness of the light to 0.5
 */

"use strict"

var iotdb = require('iotdb')
var iot = iotdb.iot()

var things = iot
    .connect('TCPConnectedLight')
    .set(':brightness', process.argv.length == 3 ? parseInt(process.argv[2]) / 10.0 : 0.5)
