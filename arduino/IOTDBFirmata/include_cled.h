/*
 *  include_cled.h
 *
 *  David Janes
 *  IOTDB.org
 *  2014-04-30
 *
 *  Chainable LED
 */

ChainableLED* cled_leds;
float cled_hue = 0.0;
boolean cled_up = true;
unsigned long cled_next = 0;

int cled_sysex = 0;
int cled_pin = 0;
int cled_nleds = 1;

void cled_param(String key, String value)
{
    if (key == k_sysex) {
        cled_sysex = value.toInt();
    } else if (key == k_pin) {
        cled_pin = value.toInt();
    } else if (key == "nleds") {
        cled_nleds = value.toInt();
    }
}

void cled_enable()
{
    if (cled_leds) {
        return;
    }
    
    cled_leds = new ChainableLED(cled_pin, cled_pin+1, cled_nleds);
    cled_next = millis();
}

void cled_sysex_callback(byte command, byte argc, byte *argv)
{
    if (!cled_leds) {
        return;
    }
    if (command != cled_sysex) {
        return;
    }

    if (argc == 3) {
        cled_leds->setColorRGB(0, argv[0], argv[1], argv[2]);
    } else if (argc == 4) {
        if (argv[0] < cled_nleds) {
            cled_leds->setColorRGB(argv[0], argv[1], argv[2], argv[3]);
        }
    }
}

void cled_setup()
{
}

void cled_loop()
{
}
