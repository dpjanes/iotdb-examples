/*
 *  UPnP_Discover.js
 *
 *  David Janes
 *  IOTDB
 *  2014-01-21
 *
 *  This demonstrates finding UPnP devices
 *  on your LAN. It doesn't do anything else
 */

"use strict"

var iotdb = require("iotdb")
var attribute = iotdb.attribute;

var iot = new iotdb.IOT({
    load_models: false
});
iot.on_ready(function(iot) {
    iot.discover("iot-driver:upnp")
})

