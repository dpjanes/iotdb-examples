/*
 *  TWNCurrentWeather.js
 *
 *  David Janes
 *  IOTDB
 *  2014-05-05
 */

"use strict";

var iotdb = require("iotdb")

exports.Model = iotdb.make_model('TWNCurrentWeather')
    .attribute( 
        iotdb.value_number(":temperature")
            .unit(":temperature.si.celsius")
    )
    .attribute( 
        iotdb.value_number(":humidity")
            .unit(":math.fraction.percent")
    )
    .attribute( 
        iotdb.value_string(":message", "conditions")
    )
    .driver_identity(":feed")
    .driver_setup(function(paramd) {
        paramd.initd.track_links = false
    })
    .driver_in(function(paramd) {
        if (paramd.driverd.title !== "Current Weather") {
            return
        }

        var description = paramd.driverd.description
        if (description !== undefined) {
            // 'A few clouds,\r\n\t\t11&nbsp;&deg;C\t\t, Humidity\t\t43%\t\t, Wind\t\tSW 9km/h'
            var match = description.match(/^(.*?),/)
            if (match) {
                paramd.thingd.conditions = match[1]
            }

            var match = description.match(/([\d.]+)&nbsp;&deg;C/)
            if (match) {
                paramd.thingd.temperature = match[1]
            }

            var match = description.match(/Humidity\t\t(\d+)%\t\t/)
            if (match) {
                paramd.thingd.humidity = match[1]
            }
        }

        // console.log(paramd.thingd)
    })
    .make()
