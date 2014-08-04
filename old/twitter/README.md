# Twitter Examples

Note the setup required for these examples. 

## Get your IOTDB account

You **will** need an IOTDB account. Please contact us to get this set up. 
Put your name on our mailing list at [https://iotdb.org/](https://iotdb.org/)
and send me an email @ [iotdb@iotdb.org](mailto:iotdb@iotdb.org)

Some but not all of the examples require connected devices (such as WeMos or Hues).

## Install Node IOTDB

[See the instructions here](https://iotdb.org/docs/node/getting-started)

## Download this github project

    $ git clone https://github.com/dpjanes/iotdb-examples.git
    $ cd iotdb-examples/arduino

## iotdb-control
### Setup the project

    iotdb-control update-project

Enter your IOTDB username. The other questions answer "y" to everything

### Setup IOTDB Oauth

    iotdb-control oauth-iotdb

Enter your IOTDB username and password. The password is not stored!

### Setup Twitter OAuth

Please see the instructions here:
[https://iotdb.org/docs/node/twitter](https://iotdb.org/docs/node/twitter).
Yes, there's a lot of steps but once it's done it's done.

## Run sample programs

