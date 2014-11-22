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
var things = iot.connect('HueLight');

things
    .set(':on', true)
    .set(':color', 'green')
    ;
