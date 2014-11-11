# Setup

Examples of using Node-IOTDB to control Arduinos
using Firmata. We have our own slightly hacked version
of Firmata in this project directory for 
dealing with non-standard libraries.

More documentation here:
https://iotdb.org/docs/node/arduino
https://iotdb.org/docs/node/firmata

There's a number of simple setup steps that need to be done first.
Also see the documentation (links below)

## Firmata

Firmata **must** be installed on your Arduino Uno first.
Please use <code>IOTDBFirmata</code> included here. 
"Normal" Firmata will work except for some of the wonkier
devices, e.g. chainable LED, DHT11 and other things
we've compiled in extensions for

## Machine ID
Run this once per computer:

    $ iotdb-control machine-id

## TTY
Run this once per computer:

    $ iotdb-control --global set firmata/tty /dev/tty.usbmodem411

You'll need to know the name of the TTY your Arudino is talking to.
You can copy that from <code>Wiring</code>, the Arduino IDE.

Common values are:

* Macbook Air (right hand USB): <code>/dev/tty.usbmodem411</code>
* Raspberry Pi (bottom USB): <code>/dev/ttyACM0</code>

## Per-Example

The TTY and pins can be customized on a per-example basis. 
See the code header

# Examples

## Arduino examples

The examples named Arduino\* are documented here:

[https://iotdb.org/docs/node/arduino](https://iotdb.org/docs/node/arduino)

## Run sample programs (Firmata)

The examples named Firmata\* are documented here:

[https://iotdb.org/docs/node/firmata](https://iotdb.org/docs/node/firmata)
