/*
 *  Abstract_Attributes.js
 *
 *  David Janes
 *  IOTDB
 *  2013-12-26
 *
 *  Demonstrate:
 *  - different ways of setting attributes
 *  - creating things without a driver (you almost never want to do this)
 *  - on ready
 */

"use strict"

var iotdb = require("iotdb")

var iot = iotdb.iot({
    load_models: false,
    load_drivers: true,
    iotdb_thing_get: false,
    iotdb_thing_create: false,
});

/*
 *  Note the use of code 'powered' rather than
 *  just defaulting to 'on'
 */
var AbstractThing = iotdb.make_model('AbstractThing')
    .attribute(
        iotdb.make_boolean(":on", "powered")
    )
    .make()


iot.on_ready(function(iot) {
    console.log("+ starting tests")

    var light = new AbstractThing()
    light.on(null, function(thing, attribute, value) {
        console.log("+ attribute changed", attribute.get_code(), value);
    });

    var on_or_off = true;
    console.log("+ expect powered", on_or_off)
    light
        .start({ notify: true })
        .set('powered', on_or_off)
        .end();

    on_or_off = !on_or_off;
    console.log("+ expect powered", on_or_off)
    light
        .start({ notify: true })
        .set("iot-attribute:on", on_or_off)
        .end();

    on_or_off = !on_or_off;
    console.log("+ expect powered", on_or_off)
    light
        .start({ notify: true })
        .set(":on", on_or_off)
        .end();

    console.log("+ expect powered", on_or_off)
    var a = iotdb.make_boolean("iot-attribute:on");
    light
        .start({ notify: true })
        .set(a, on_or_off)
        .end();

    console.log("+ finished tests")
    process.exit(0)
})

