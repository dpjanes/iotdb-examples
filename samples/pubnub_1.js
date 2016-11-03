/*
 *  pubnub_1.js
 *
 *  David Janes
 *  IOTDB
 *  2014-10-28
 *
 *  Demonstrate how we can map a PubNub Channel
 *  into IOTDB Things.
 */

"use strict";

var iotdb = require('iotdb');
var iot = iotdb.iot();

iot
    .connect({
        model: "TIKeyFob",
        driver: ":pubnub",
        channel: "pgen",
        selector: "device",
    })
    .on("thing", function(thing) {
        console.log("+ thing", thing.thing_id());
    })
    .on_change(function(thing) {
        console.log("+ changed", thing.thing_id(), thing.state());
    })
    ;
