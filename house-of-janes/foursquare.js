/*
 *  house-of-janes/foursquare.js
 *
 *  David Janes
 *  IOTDB
 *  2014-05-04
 *
 *  Track my foursquare checkins
 */

"use strict";

var common = require("./common")
var iot = common.iot
var globald = common.globald
var shared = common.shared

var on_checkin = function(checkin, attributes) {
    if (checkin.get("fresh")) {
        globald.distance = undefined
        shared.last_checkin = checkin.freeze()
        var message = iot.format(
            "Looks like {{ house.name_is }} out. I saw him at {{ name }}\n{{ where }}",
            checkin, globald
        )
        iot.twitter.send(message)
    } else if (!shared.last_checkin) {
        shared.last_checkin = checkin.freeze()
    }
}

iot
    .connect({
        model: "FoursquareCheckin",
        iri: "{{ cfg.foursquare_rss }}",
        fresh: false
    })
    .on_change(on_checkin)
