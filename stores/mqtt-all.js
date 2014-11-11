/*
 *  mqtt-all.js
 *
 *  David Janes
 *  IOTDB
 *  2014-11-11
 *  "Armistice Day"
 *
 *  Upload _all_ sensor events to MQTT.
 *  Please see README.md and
 *  https://iotdb.org/social/iotdb/post/102106617796/mqtt-store-integration-with-node-iotdb
 */

"use strict"

var iotdb = require('iotdb')
var iot = iotdb.iot()

iot.store('mqtt').track(
    iot.connect()
)
