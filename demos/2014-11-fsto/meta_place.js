/*
 *  David Janes
 *  IOTDB
 *  2014-11-21
 */

"use strict";

var iotdb = require('iotdb');

var iot = iotdb.iot();

iot
    .connect()
    .with_room("David Bedroom")
    .with_floor("Second Floor")
    .set(':color', 'green')
