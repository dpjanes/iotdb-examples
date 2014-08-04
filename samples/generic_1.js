/*
 *  generic_1.js
 *
 *  David Janes
 *  IOTDB.org
 *  2014-07-11
 *
 *  Connect to IRI without a model
 *
 *  Demonstrates:
 *  - "generic" model
 *  - Link: rel="mqtt"
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
 *  Connect to a thing without a Model
 */
var bedroom_light = iot.connect({
    iri: "http://playground-home.iotdb.org/bedroom/light",
    poll: 0
})
bedroom_light.on_change(function(thing) {
    console.log("+ Thing changed", thing.stated)
})
bedroom_light.on_thing(function(thing) {
    console.log("+ new Thing")
    thing.set('on', !thing.get('on'))
})
