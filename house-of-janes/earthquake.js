/*
 *  house-of-janes/earthquake.js
 *
 *  David Janes
 *  IOTDB
 *  2014-05-04
 *
 *  Earthquakes around the world
 */

"use strict";

var common = require("./common")
var iot = common.iot
var globald = common.globald
var shared = common.shared

iot.on_register_things(function() {
    iot.discover({
        model: "USGSEarthquake",
        initd: {
            fresh: true
        }
    })
})

var points2distance = function (lat1, lon1, lat2, lon2) {
    var R = 6371
    var dLat = (lat2-lat1)
    var dLon = (lon2-lon1)
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
            Math.cos(lat1) * Math.cos(lat2) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    var d = R * c

    return  Math.round(d)
}

var distance = function(t1, t2) {
    return points2distance(
        t1.get(":latitude"),
        t1.get(":longitude"),
        t2.get(":latitude"),
        t2.get(":longitude")
    )
}

iot.on_thing_with_model("USGSEarthquake", function(iot, thing) {
    thing.on_change(function(earthquake, attributes) {
        var format = "Uh oh, Earthquake! {{ address }}"
        if (shared.last_checkin) {
            globald['distance'] = distance(shared.last_checkin, earthquake)
            format += ". That's only {{ distance }}km from {{ house.possessive }} last checkin!"
        }
        var message = iot.format(format, earthquake, globald)
        iot.twitter.send(message)
        console.log("+ changes!", earthquake.stated, message)
    })
})
