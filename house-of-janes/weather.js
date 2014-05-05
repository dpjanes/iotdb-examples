/*
 *  house-of-janes/weather.js
 *
 *  David Janes
 *  IOTDB
 *  2014-05-04
 *
 *  Clever things about the weather
 */

"use strict";

var common = require("./common")
var iot = common.iot
var globald = common.globald

/*
 *  Show changes to the weather
 */
var last_weather = null

var weather_rss = iot.cfg_get("weather_rss")
if (!weather_rss) {
    console.log("# no 'weather_rss' defined")
    console.log("  find your feed here: http://past.theweathernetwork.com/rss/")
    console.log("  save with: iotdb-control set weather_rss <the-url>")
    console.log()
}

iot.on_register_things(function() {
    iot.discover({
        model: "TWNCurrentWeather",
        initd: {
            api: weather_rss,
            fresh: false
        }
    })
})

var on_weather = function(weather, attributes) {
    if (last_weather != null) {
        var last = last_weather.get("conditions")
        var current = weather.get("conditions")
        if (last != current) {
            iot.tweet(iot.format("The weather is now {{ conditions }}", weather))
        }

        var last = last_weather.get("temperature")
        var current = weather.get("temperature")
        if (current < last) {
            iot.twitter.send(iot.format("It's getting colder outside - it's now {{ temperature }}", weather))
        } else if (current > last) {
            iot.twitter.send(iot.format("It's getting warmer outside - it's now {{ temperature }}", weather))
        }
    }
    console.log("+ weather", weather.stated)

    last_weather = weather.freeze()
}

iot.on_thing_with_model("TWNCurrentWeather", function(iot, thing) {
    thing.on_change(on_weather)
})
