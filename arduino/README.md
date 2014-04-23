# Arduino Examples

Note the setup required for these examples. There's a number of steps,
but none of them are overly complicated.

## Get your IOTDB account

You **will** need an IOTDB account. Please contact us to get this set up. 
Put your name on our mailing list at [https://iotdb.org/](https://iotdb.org/)
and send me an email @ [iotdb@iotdb.org](mailto:iotdb@iotdb.org)

## Install Firmata on your Arduino

* Plug in your Arduino
* Start the Arduino IDE
* <code>File > Examples > Firmata > Standard Firmata</code>

Make note of the TTY/COM port being used

## Install Node IOTDB

[See the instructions here](https://iotdb.org/docs/node/getting-started)

## Download this github project

    $ git clone https://github.com/dpjanes/iotdb-examples.git
    $ cd iotdb-examples/arduino

## iotdb-control
### Setup the project

    iotdb-control update-project

Enter your IOTDB username. The other questions answer "y" to everything

### Setup oauth

    iotdb-control oauth-iotdb

Enter your IOTDB username and password. The password is not stored!

### Setup a unique machine-id

    iotdb-control machine-id

This only has to be done once per computer

### Save your TTY

    iotdb-control set arduino_tty "/dev/tty.usbmodem411" --global

Substituting whatever your real TTY is

## Run sample programs

These are all really short. The common code is in <code>common.js</code>.
You'll need to breadboard components as follows (on an Arduino Uno)

* Analog Pin 0: Potentiometer
* Digital/PWM Pin 3: LED
* Digital/PWM Pin 5: LED
* Digital Pin 4: Pushbutton

### Flash LEDs (1)
[Video](https://www.youtube.com/watch?v=eeyOBpH0CwA) 
[Code](arduino_1.js)

    node arduino_1

### Flash LEDs (2)
[Code](arduino_2.js)

    node arduino_2

### Control LEDs with Potentiometer
[Video](https://www.youtube.com/watch?v=Kd-7FSwtyzo) 
[Code](arduino_3.js)

    node arduino_3

### Control LEDs with Potentiometer and Switch
[Video](https://www.youtube.com/watch?v=wBGJxara84E) 
[Code](arduino_4.js)

    node arduino_4

