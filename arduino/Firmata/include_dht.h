
/*
 *  include_dht.h
 *
 *  David Janes
 *  IOTDB.org
 *  2014-04-29
 *
 *  DHT Temperature Humidity Sensors
 */

// Example testing sketch for various DHT humidity/temperature sensors
// Written by ladyada, public domain

#define DHTPIN 2     // what pin we're connected to

// Uncomment whatever type you're using!
#define DHTTYPE DHT11   // DHT 11 
// #define DHTTYPE DHT22   // DHT 22  (AM2302)
//#define DHTTYPE DHT21   // DHT 21 (AM2301)

// Connect pin 1 (on the left) of the sensor to +5V
// Connect pin 2 of the sensor to whatever your DHTPIN is
// Connect pin 4 (on the right) of the sensor to GROUND
// Connect a 10K resistor from pin 2 (data) to pin 1 (power) of the sensor

float dht_ht[2];

DHT *dht;

void dht_enable() {
    if (dht) {
        return;
    }

    dht = new DHT(DHTPIN, DHTTYPE);
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

    digitalWrite(3, HIGH);
/*    
    dht_ht[0] = -1;
    dht_ht[1] = -1;
        Firmata.sendSysex(11, sizeof dht_ht, (byte*) dht_ht);
        return;
        */

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
        Firmata.sendSysex(11, sizeof dht_ht, (byte*) dht_ht);
    }
}
