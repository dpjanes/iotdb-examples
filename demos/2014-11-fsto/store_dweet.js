/*
 *  David Janes
 *  IOTDB
 *  2014-11-21
 *
 *  (for my computer only)
 *  http://dweet.io/follow/firmata-input-unit:175fa5ac996ea24b018febebe823f0ce
 */

"use strict";

var iotdb = require('iotdb');

var iot = iotdb.iot();
var input = iot.connect('TIKeyFob')

var store = iot
    .store('dweet')
    .track(input)
