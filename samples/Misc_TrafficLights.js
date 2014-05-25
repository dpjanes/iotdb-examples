/*
 *  Misc_TrafficLights.js
 *
 *  David Janes
 *  IOTDB
 *  2013-12-27
 *
 *  Demonstrate a validator function
 *
 *  Note how everything is done with an IOT
 *  function being created!
 *  
 *  If you were modeling a real traffic light
 *  you would give each light color a semantic meaning
 *  instead of 'on', i.e. 'traffic-lights.go', 'traffic-lights.stop', etc..
 *  The reason we don't here is we have never defined 
     *  those things
 */

"use strict";

var iotdb = require("iotdb")

var TrafficLight = iotdb.make_model('TrafficLight')
    .attribute(
        iotdb.make_boolean(":on", "red")
    )
    .attribute(
        iotdb.make_boolean(":on", "amber")
    )
    .attribute(
        iotdb.make_boolean(":on", "green")
    )
    .validator(function(paramd) {
        for (var ci in paramd.codes) {
            var change_code = paramd.codes[ci]

            if (!paramd.thingd[change_code]) {
                continue
            }

            for (var thing_code in paramd.thingd) {
                if (thing_code == change_code) {
                    continue
                }

                paramd.changed[thing_code] = false
            }
        }
    })
    .make();


var light = new TrafficLight()
light.on(null, function(thing, attribute, value) {
    console.log("+ changed", attribute.get_code(), value);
});


light
    .start({ notify: true })
    .set('red', true)
    .end();
console.log("+ only 'red' should be true", "\n ", light.stated);

light
    .start({ notify: true })
    .set('amber', true)
    .end();
console.log("+ only 'amber' should be true", "\n ", light.stated);

light
    .start({ notify: true })
    .set('green', true)
    .end();
console.log("+ only 'green' should be true", "\n ", light.stated);

light
    .start({ notify: true })
    .set('blue', true)
    .end();
console.log("+ only 'green' should be true (nothing changes)", "\n ", light.stated);
