/*
 *  include_tac.h
 *
 *  David Janes
 *  IOTDB.org
 *  2014-05-01
 *
 *  Three Axis Compass
 *  http://www.seeedstudio.com/wiki/Grove_-_3-Axis_Compass_V1.0
 */

HMC5883L* tac_compass = 0;

unsigned long tac_next = 0;
int tac_delay = 100;

int tac_sysex = 0;
int tac_error = 0;

float tac_xyz[3];

void tac_param(String key, String value)
{
    if (key == k_sysex) {
        tac_sysex = value.toInt();
    }
}

void tac_enable()
{
    if (tac_compass) {
        return;
    }
    
    tac_compass = new HMC5883L();
    tac_next = millis();

    tac_error = tac_compass->setMeasurementMode(MEASUREMENT_CONTINUOUS);
    // digitalWrite(3, HIGH);
}

void tac_sysex_callback(byte command, byte argc, byte *argv)
{
    if (!tac_compass) {
        return;
    }

    if (command != tac_sysex) {
        return;
    }
}

void tac_setup()
{
    Wire.begin(); 
}

void tac_loop()
{
    if (!tac_compass) {
        return;
    }
    
    unsigned long m = millis();
    if (m < tac_next) {
        return;
    } 
    tac_next = m + tac_delay;

    MagnetometerRaw raw_xyz = tac_compass->readRawAxis();
    tac_xyz[0] = raw_xyz.XAxis;
    tac_xyz[1] = raw_xyz.YAxis;
    tac_xyz[2] = raw_xyz.ZAxis;
  
    Firmata.sendSysex(tac_sysex, sizeof tac_xyz, (byte*) tac_xyz);
}
