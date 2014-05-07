/*
 *  USGSEarthquake.js
 *
 *  David Janes
 *  IOTDB
 *  2014-05-04
 *
 *  Parsed earthquake from
 *  'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.atom'
 */

"use strict";

var iotdb = require("iotdb")

exports.Model = iotdb.make_model('USGSEarthquake')
    .attribute(iotdb.value_string("name"))
    .attribute(
        iotdb.value_string("schema:address", "address")
    )
    .attribute(
        iotdb.value_datetime(":timestamp")
    )
    .attribute(iotdb.value_number(":latitude"))
    .attribute(iotdb.value_number(":longitude"))
    .attribute(iotdb.value_number(":elevation"))
    .attribute(
        iotdb.value_number(":energy.magnitude.richter", "magnitude")
    )
    .driver_identity("iot-driver:feed")
    .driver_setup(function(paramd) {
        paramd.initd.api = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.atom'
    })
    .driver_in(function(paramd) {
        if (paramd.driverd.date) {
            paramd.thingd.timestamp = paramd.driverd.date
        }

        if (paramd.driverd.title) {
            paramd.thingd.name = paramd.driverd.title

            var match = paramd.driverd.title.match(/^M ([0-9][^ ]*)/)
            if (match) {
                paramd.thingd.magnitude = match[1]
            }

            var match = paramd.driverd.title.match(/^.*? of (.*)$/)
            if (match) {
                paramd.thingd.address = match[1]
            }
        }

        var p = paramd.driverd.georss_point
        if (p) {
            var parts = p.split(' ')
            if (parts.length == 2) {
                paramd.thingd.latitude = parseFloat(parts[0])
                paramd.thingd.longitude = parseFloat(parts[1])
            }
        }

        var e = paramd.driverd.georss_elev
        if (e) {
            paramd.thingd.elevation = parseInt(e)
        }
    })
    .make()
