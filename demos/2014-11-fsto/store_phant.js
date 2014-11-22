/*
 *  David Janes
 *  IOTDB
 *  2014-11-21
 *
 *  (for my computer only)
 *  https://data.sparkfun.com/streams/aGNjQK9RwZHgEmx089Lg
 */

"use strict";

var iotdb = require('iotdb');

var iot = iotdb.iot();
var input = iot.connect('TIKeyFob')

var store = iot
    .store('phant')
    .track(input)
