/*
 *  David Janes
 *  IOTDB
 *  2014-11-21
 *
 *  Turn everything on
 */

"use strict";

var iotdb = require('iotdb');

var iot = iotdb.iot();
var things = iot.connect();

iot
    .connect('TIKeyFob')
    .on('left', function() {
        things.set(':on', true);
    })
    .on('right', function() {
        things.set(':on', false);
    })
    ;


