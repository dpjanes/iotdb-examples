/*
 *  twitter_send.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-29
 *
 *  Demonstrate sending a message using Twitter
 */

"use strict";

var iotdb = require("iotdb")

var iot = new iotdb.IOT({
    "auto_load_models" : false,
    "auto_load_drivers" : true,
    "twitter": true
});

iot.on_ready(function(iot) {
    if (!iot.twitter) {
        console.log("# Twitter is not available")
        return
    }

    iot.twitter.send("Good Morning!")
})
