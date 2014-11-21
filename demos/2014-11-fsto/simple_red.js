/*
 *  David Janes
 *  IOTDB
 *  2014-11-21
 *
 *  Set the color of everything to red.
 */

"use strict";

var iotdb = require('iotdb');

var iot = iotdb.iot();
var things = iot.connect();

things.set(':color', 'red');
