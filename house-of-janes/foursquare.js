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

var foursquare_rss = iot.cfg_get("foursquare_rss")
if (!foursquare_rss) {
    console.log("# no 'foursquare_rss' defined")
    console.log("  find your feed here: https://foursquare.com/feeds/")
    console.log("  save with: iotdb-control set foursquare_rss <the-url>")
    console.log()
}

iot.on_register_things(function() {
    iot.discover({
        model: "FoursquareCheckin",
        initd: {
            api: foursquare_rss,
            fresh: false
        }
    })
})

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

iot.on_thing_with_model("FoursquareCheckin", function(iot, thing) {
    thing.on_change(on_checkin)
})
