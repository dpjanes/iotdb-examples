/*
 *  pubnub-all.js
 *
 *  David Janes
 *  IOTDB
 *  2014-11-11
 *  "Armistice Day"
 *
 *  Upload _all_ sensor events to PubNub.
 *  Please see README.md and
 *  https://iotdb.org/social/iotdb/post/101170263776/pubnub-integration-with-node-iotdb
 */

"use strict"

var iotdb = require('iotdb')
var iot = iotdb.iot()

iot.store('pubnub').track(
    iot.connect()
)
