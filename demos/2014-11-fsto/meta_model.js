/*
 *  David Janes
 *  IOTDB
 *  2014-11-21
 */

"use strict";

var iotdb = require('iotdb');

var iot = iotdb.iot();
var things = iot.connect();

things
    .with_facet(":lighting")
    .set(':on', true);
