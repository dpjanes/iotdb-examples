/*
 *  include_gsc.h
 *
 *  David Janes
 *  IOTDB.org
 *  2014-04-29
 *
 *  Grove I2C Color Senor
 */

#define COLOR_SENSOR_ADDR  0x39//the I2C address for the color sensor 
#define REG_CTL 0x80
#define REG_TIMING 0x81
#define REG_INT 0x82
#define REG_INT_SOURCE 0x83
#define REG_ID 0x84
#define REG_GAIN 0x87
#define REG_LOW_THRESH_LOW_BYTE 0x88
#define REG_LOW_THRESH_HIGH_BYTE 0x89
#define REG_HIGH_THRESH_LOW_BYTE 0x8A
#define REG_HIGH_THRESH_HIGH_BYTE 0x8B
#define REG_BLOCK_READ 0xCF
#define REG_GREEN_LOW 0xD0
#define REG_GREEN_HIGH 0xD1
#define REG_RED_LOW 0xD2
#define REG_RED_HIGH 0xD3
#define REG_BLUE_LOW 0xD4
#define REG_BLUE_HIGH 0xD5
#define REG_CLEAR_LOW 0xD6
#define REG_CLEAR_HIGH 0xD7
#define CTL_DAT_INIITIATE 0x03
#define CLR_INT 0xE0
//Timing Register
#define SYNC_EDGE 0x40
#define INTEG_MODE_FREE 0x00
#define INTEG_MODE_MANUAL 0x10
#define INTEG_MODE_SYN_SINGLE 0x20
#define INTEG_MODE_SYN_MULTI 0x30
 
#define INTEG_PARAM_PULSE_COUNT1 0x00
#define INTEG_PARAM_PULSE_COUNT2 0x01
#define INTEG_PARAM_PULSE_COUNT4 0x02
#define INTEG_PARAM_PULSE_COUNT8 0x03
//Interrupt Control Register 
#define INTR_STOP 40
#define INTR_DISABLE 0x00
#define INTR_LEVEL 0x10
#define INTR_PERSIST_EVERY 0x00
#define INTR_PERSIST_SINGLE 0x01
//Interrupt Souce Register
#define INT_SOURCE_GREEN 0x00
#define INT_SOURCE_RED 0x01
#define INT_SOURCE_BLUE 0x10
#define INT_SOURCE_CLEAR 0x03
//Gain Register
#define GAIN_1 0x00
#define GAIN_4 0x10
#define GAIN_16 0x20
#define GANI_64 0x30
#define PRESCALER_1 0x00
#define PRESCALER_2 0x01
#define PRESCALER_4 0x02
#define PRESCALER_8 0x03
#define PRESCALER_16 0x04
#define PRESCALER_32 0x05
#define PRESCALER_64 0x06

#define STATE_NO                            0
#define STATE_gcs_setTimingReg              1
#define STATE_gcs_setInterruptSourceReg     2  
#define STATE_gcs_setInterruptControlReg    3
#define STATE_gcs_setGain                   4
#define STATE_gcs_setEnableADC              5
#define STATE_gcs_readRGB1                  6
#define STATE_gcs_readRGB2                  7
#define STATE_gcs_clearInterrupt            8
 
int gcs_readingdata[20];
int gcs_i;
int gcs_rgba[4];
int gcs_state = STATE_NO;

unsigned long gcs_next = 0;

void gcs_setTimingReg(int x)
{
    Wire.beginTransmission(COLOR_SENSOR_ADDR);
    Wire.write(REG_TIMING);
    Wire.write(x);
    Wire.endTransmission();  
}

void gcs_setInterruptSourceReg(int x)
{
    Wire.beginTransmission(COLOR_SENSOR_ADDR);
    Wire.write(REG_INT_SOURCE);
    Wire.write(x);
    Wire.endTransmission();  
}

void gcs_setInterruptControlReg(int x)
{
    Wire.beginTransmission(COLOR_SENSOR_ADDR);
    Wire.write(REG_INT);
    Wire.write(x);
    Wire.endTransmission();  
}

void gcs_setGain(int x)
{
    Wire.beginTransmission(COLOR_SENSOR_ADDR);
    Wire.write(REG_GAIN);
    Wire.write(x);
    Wire.endTransmission();
}

void gcs_setEnableADC()
{
    Wire.beginTransmission(COLOR_SENSOR_ADDR);
    Wire.write(REG_CTL);
    Wire.write(CTL_DAT_INIITIATE);
    Wire.endTransmission();  
}

void gcs_clearInterrupt()
{
    Wire.beginTransmission(COLOR_SENSOR_ADDR);
    Wire.write(CLR_INT);
    Wire.endTransmission(); 
}

void gcs_readRGB1()
{
    Wire.beginTransmission(COLOR_SENSOR_ADDR);
    Wire.write(REG_BLOCK_READ);
    Wire.endTransmission();

    Wire.beginTransmission(COLOR_SENSOR_ADDR);
    Wire.requestFrom(COLOR_SENSOR_ADDR,8);
}

void gcs_readRGB2()
{
    if (8 <= Wire.available()) {
        for(gcs_i=0;gcs_i<8;gcs_i++) {
            gcs_readingdata[gcs_i]=Wire.read();
        }
    }

    gcs_rgba[1]=gcs_readingdata[1]*256+gcs_readingdata[0];
    gcs_rgba[0]=gcs_readingdata[3]*256+gcs_readingdata[2];
    gcs_rgba[2]=gcs_readingdata[5]*256+gcs_readingdata[4];
    gcs_rgba[3]=gcs_readingdata[7]*256+gcs_readingdata[6];

    Firmata.sendSysex(10, sizeof gcs_rgba, (byte*) gcs_rgba);
}

void gcs_enable()
{
    gcs_next = millis();
    gcs_state = STATE_gcs_setTimingReg;
}

void gcs_setup()
{ 
}

void gcs_loop()
{
    unsigned long m = millis();
    if (m < gcs_next) {
        return;
    }

    switch (gcs_state) {
    case STATE_NO:
        return;

    case STATE_gcs_setTimingReg:
        gcs_setTimingReg(INTEG_MODE_FREE);
        gcs_next = m + 100;
        gcs_state = STATE_gcs_setInterruptSourceReg;
        break;

    case STATE_gcs_setInterruptSourceReg:
        gcs_setInterruptSourceReg(INT_SOURCE_GREEN);
        gcs_next = m + 100;
        gcs_state = STATE_gcs_setInterruptControlReg;
        break;

    case STATE_gcs_setInterruptControlReg:
        gcs_setInterruptControlReg(INTR_LEVEL|INTR_PERSIST_EVERY);
        gcs_next = m + 100;
        gcs_state = STATE_gcs_setGain;
        break;

    case STATE_gcs_setGain:
        gcs_setGain(GAIN_1|PRESCALER_4);
        gcs_next = m + 100;
        gcs_state = STATE_gcs_setEnableADC;
        break;

    case STATE_gcs_setEnableADC:
        gcs_setEnableADC();
        gcs_next = m + 100;
        gcs_state = STATE_gcs_readRGB1;
        break;

    case STATE_gcs_readRGB1:
        gcs_readRGB1();
        gcs_next = m + 500;
        gcs_state = STATE_gcs_readRGB2;
        break;

    case STATE_gcs_readRGB2:
        gcs_readRGB2();
        gcs_next = m + 500;
        gcs_state = STATE_gcs_clearInterrupt;
        break;

    case STATE_gcs_clearInterrupt:
        gcs_clearInterrupt();  
        gcs_next = m + 1000;
        gcs_state = STATE_gcs_readRGB1;
        break;
    }
}
