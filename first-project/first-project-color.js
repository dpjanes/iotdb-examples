/*
 *  first-project-color.js
 *
 *  See:
 *  https://iotdb.org/docs/node/first-project
 */

"use strict";

var iotdb = require("iotdb")

/**
 *  This code creates the IOTDB object. The IOTDB
 *  object manages all the Models, Drivers and Things
 *  and is responsible for querying the IOTDB.org
 *  website for additional data
 *
 *  You can add a dictionary to parameterize
 *  this or just change the file '.iotdb/iotdb.json'
 */
var iot = new iotdb.IOT()

/**
 *  This code is called every time a new Thing
 *  is discovered by the IOTDB object.
 *
 *  In this particular fragment:
 *  - Thing.pull asynchronously queries the Thing for
 *    it's current state
 *  - The 'on_change' function prints out the state
 *    every time it changes.
 */
iot.on_thing(function(iot, thing) {
    thing.pull()
    thing.on_change(function() {
        console.log("+ thing.state", thing.state())
    })
})

/**
 *  This code is called to allow you to explicitly 
 *  add Thing(s) to the IOTDB object. 
 *
 *  If you're writing code that's going to control
 *  Philips Hues or Belkin WeMos, you don't need 
 *  to do this. These are automatically discovered 
 *  by 'iot.discover()' and don't need to explicitly
 *  hooked up.
 *
 *  In the code sample below, 
 */
iot.on_register_things(function() {
    /*
    iot.discover({
        model: "sample-light",
        driver: ":json",
        initd: {
            api: "http://playground-home.iotdb.org/kitchen/light",
            mqtt_topic: "iot/kitchen/light/#",
            mqtt_json: true
        }
    })

    iot.discover({
        model: "sample-rgb",
        driver: ":json",
        initd: {
            api: "http://playground-home.iotdb.org/basement/hue/1",
            mqtt_topic: "iot/basement/hue/1/#",
            mqtt_json: true
        }
    })
    */
})


/**
 *  This code is called when the number of Things
 *  "stabilizes". 
 *
 *  Change the color of all devices - i.e. your WeMo Hues
 */
iot.on_things(function(iot, things) {
    var count = 0;
    var colors = [ 'red', 'green', 'blue' ];
    setInterval(function() {
        things.set(':color', colors[count++ % colors.length])
    }, 2000);
})

/**
 *  This lets you access the 'iot' object if you 
 *  require this file into another Node JS file.
 */
exports.iot = iot

