/*
 *  David Janes
 *  IOTDB
 *  2014-11-21
 */

"use strict";

var iotdb = require('iotdb');

var iot = iotdb.iot();
var things = iot.connect();

iot.on_things(function() {
    console.log(things.metas());
});
