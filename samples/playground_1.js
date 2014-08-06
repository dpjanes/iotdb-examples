/*
 *  Node-IOTDB (v2)
 *
 *  David Janes
 *  IOTDB.org
 *  2014-07-11
 *
 *  Here's what we plan to do to simplify Node IOTDB
 */

var iotdb = require('iotdb')

/*
 *  There's no more need to instatiate a IOT object
 *  with arguments - it'll always do the "right" thing
 */
var iot = iotdb.iot()
iot.on_things(function(things) {
    iot.dump(things)
})

/*
 *  Connect to a thing with a Model
 */
var bedroom_light = iot.connect({
    model: "light",
    iri: "http://playground-home.iotdb.org/bedroom/light"
})
bedroom_light.set(':on', true)
