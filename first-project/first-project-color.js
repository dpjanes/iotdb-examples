/*
 *  first-project-color.js
 *
 *  See:
 *  https://iotdb.org/docs/node/first-project
 */

"use strict";

var iotdb = require("iotdb")
var iot = iotdb.iot()

/**
 *  Connect to a light simulator
 */
var lights = iot
    .connect({
        model: "abstract-light-color",
        iri: "http://playground-home.iotdb.org/basement/hue/1"
    })
    .on_change(function(thing) {
        console.log("+ thing.state", thing.state())
    })

/**
 *  Cycle through colors
 */
var count = 0;
var colors = [ 'red', 'green', 'blue' ];
setInterval(function() {
    lights.set(':color', colors[count++ % colors.length])
}, 2000);
