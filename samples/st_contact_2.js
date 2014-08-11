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
var iot = iotdb.iot()

var contacts = iot.connect("SmartThingsContact")
var lights = iot.connect("HueLight")

contacts.on(':open', function(thing, open_attribute, is_open) {
    lights.set(':color', is_open ? 'red' : 'green')
})
