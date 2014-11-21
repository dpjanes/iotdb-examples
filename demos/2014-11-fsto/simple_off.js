/*
 *  David Janes
 *  IOTDB
 *  2014-11-21
 *
 *  Turn everything off
 */

"use strict";

var iotdb = require('iotdb');

var iot = iotdb.iot();
var things = iot.connect();

things.set(':off', true);
