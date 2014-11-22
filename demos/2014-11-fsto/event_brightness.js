/*
 *  David Janes
 *  IOTDB
 *  2014-11-21
 *
 *  Set the color of everything to red.
 */

"use strict";

var iotdb = require('iotdb');

var iot = iotdb.iot();

var lights = iot.connect()
    .with_facet(":device.lighting");
/*
*/

var input = iot.connect({
    model: "FirmataInputUnit",
    pin: 0
});
input = input.transmogrify(iot.transmogrifier('debounce', { timeout: 250 }));

input.on(":value", function(thing, attribute, value) {
    console.log("BRIGHTNESS %d\%", value * 100);
    lights.set(':brightness', value);
})
