/*
 *  include_dht.h
 *
 *  David Janes
 *  IOTDB.org
 *  2014-04-29
 *
 *  DHT Temperature Humidity Sensors
 */

float dht_ht[2];
int dht_sysex = 0;
int dht_pin = 0;
int dht_type = DHT11;

DHT *dht;

void dht_param(String key, String value)
{
    if (key == k_sysex) {
        dht_sysex = value.toInt();
    } else if (key == k_pin) {
        dht_pin = value.toInt();
    } else if (key == "dht11") {
        dht_type = DHT11;
    } else if (key == "dht21") {
        dht_type = DHT21;
    } else if (key == "dht22") {
        dht_type = DHT22;
    }
}

void dht_enable() {
    if (dht) {
        return;
    }

    dht = new DHT(dht_pin, dht_type);
    dht->begin();

    dht_ht[0] = -1;
    dht_ht[1] = -1;
}

void dht_setup() {
}

void dht_loop() {
    if (!dht) {
        return;
    }

    // digitalWrite(3, HIGH);

    int changed = false;

    float h = dht->readHumidity();
    if (isnan(h)) {
        return;
    } else if (h != dht_ht[0]) {
        dht_ht[0] = h;
        changed = true;
    }

    float t = dht->readTemperature();
    if (isnan(t)) {
        return;
    } else if (t != dht_ht[1]) {
        dht_ht[1] = t;
        changed = true;
    }

    if (changed) {
        Firmata.sendSysex(dht_sysex, sizeof dht_ht, (byte*) dht_ht);
    }
}
