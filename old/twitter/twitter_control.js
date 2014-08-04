/*
 *  twitter_control.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-29
 *
 *  Every time the word "lawyer" is tweeted,
 *  change the color of Hue lights to Red
 */

"use strict"

var iotdb = require("iotdb")
var _ = iotdb.helpers;

var iot = new iotdb.IOT({
    auto_load_models: true,
    auto_load_drivers: true,
    twitter: true
});

iot.on_ready(function() {
    iot.discover(":hue")

    iot.twitter.search("lawyer", function(message) {
        iot.things()
            .with_driver(":hue")
            .set(':color', 'red')
            .after(750, function(things) {
                things.set(':on', false)
            })
        ;
    })
})
