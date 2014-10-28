/*
 *  pubnub_1_gen.js
 *
 *  David Janes
 *  IOTDB
 *  2014-10-28
 *
 *  See "pubnub_1.js"
 *
 *  Randomly generate data for
 *  10 different devices. The data
 *  looks kinda like IOTDB Thing
 *
 *  NOTE: you must make a file in the 
 *  current directory called "keys.js" or
 *  just edit this file to add in 
 *  your PubNub publish and subscribe keys
 */

"use strict";

var cfgd = require('./keys').cfgd;
var pubnub = require("pubnub").init({
    publish_key: cfgd.publish_key,
    subscribe_key: cfgd.subscribe_key,
});

var msgd = {
    device: 0,
    on: false,
    left: false,
    right: false,
}

setInterval(function() {
    msgd.device = Math.round(Math.random() * 10);
    msgd.left = Math.random() < 0.5 ? false : true;
    msgd.right = Math.random() < 0.5 ? false : true;
    msgd.on = msgd.left || msgd.right;

    pubnub.publish({ 
        channel: 'pgen',
        message: msgd,
        callback: function() { console.log("+", msgd); },
        error: function(error) { console.log("#", error); }
    });
}, 5000);
