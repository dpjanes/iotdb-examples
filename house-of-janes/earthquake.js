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

var compute_distance = function(t1, t2) {
    return points2distance(
        t1.get(":latitude"),
        t1.get(":longitude"),
        t2.get(":latitude"),
        t2.get(":longitude")
    )
}

var on_earthquake = function(earthquake) {
    var format = "Uh oh, Earthquake! {{ address }}"
    if (shared.last_checkin) {
        var distance = compute_distance(shared.last_checkin, earthquake)
        if ((globald.distance !== undefined) && (globald.distance < distance))  {
            return
        }

        format += ". That's only {{ distance }}km from {{ house.possessive }} last checkin!"
        globald.distance = distance
    }

    var message = iot.format(format, earthquake, globald)
    iot.twitter.send(message)

    console.log("+ changes!", earthquake.stated, message)
}

iot
    .connect({
        model: "USGSEarthquake",
        fresh: true
    })
    .on_change(on_earthquake)
