/*
 *  pubnub_2.js
 *
 *  David Janes
 *  IOTDB
 *  2014-10-28
 *
 *  Demonstrating tracking changes
 *  to everything to the PubNub Store.
 */

"use strict";

var iotdb = require('iotdb')
var iot = iotdb.iot()

var things = iot.connect()
iot
    .store('pubnub')
    .track(things);
