/*
 *  David Janes
 *  IOTDB
 *  2014-11-21
 *
 *  mqtt.iotdb.org u/dpjanes/#
 */

"use strict";

var iotdb = require('iotdb');

var iot = iotdb.iot();
var input = iot.connect({
    model: "FirmataInputUnit",
    pin: 0
});

var store = iot
    .store('mqtt')
    .track(input)
