/*
 *  include_neopixel.h
 *
 *  David Janes
 *  IOTDB.org
 *  2014-11-15
 *
 *  AdaFruit NeoPixel
 *
 *  Required library can be found here
 *  https://github.com/adafruit/Adafruit_NeoPixel
 */

Adafruit_NeoPixel* neopixel_strip = 0;

int neopixel_sysex = 0;
int neopixel_pin = 6;
int neopixel_nleds = 16;

void neopixel_param(String key, String value)
{
    if (key == k_sysex) {
        neopixel_sysex = value.toInt();
    } else if (key == k_pin) {
        neopixel_pin = value.toInt();
    } else if (key == "nleds") {
        // neopixel_nleds = value.toInt();
    }
}

void neopixel_enable()
{
    if (neopixel_strip) {
        return;
    }
    
    /*
    neopixel_strip = new ChainableLED(neopixel_pin, neopixel_pin+1, neopixel_nleds);
     */
    neopixel_strip = new Adafruit_NeoPixel(neopixel_nleds, neopixel_pin, NEO_GRB + NEO_KHZ800);
    neopixel_strip->begin();
    neopixel_strip->show(); // Initialize all pixels to 'off'
}

int count = 0;

void neopixel_sysex_callback(byte command, byte argc, byte *argv)
{
    digitalWrite(13, HIGH); // count++ % 2 ? HIGH : LOW);
    if (!neopixel_strip) {
        return;
    }
    if (command != neopixel_sysex) {
        return;
    }
    if (argc < 3) {
        return;
    }

    uint32_t color = neopixel_strip->Color(argv[0], argv[1], argv[2]);
    uint16_t pin = (argc == 3) ? 0 : argv[3];
    
    neopixel_strip->setPixelColor(pin, color);
    neopixel_strip->show();
}

void neopixel_setup()
{
}

void neopixel_loop()
{
}
