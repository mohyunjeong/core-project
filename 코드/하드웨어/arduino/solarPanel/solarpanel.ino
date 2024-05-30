#include <Wire.h>
#include <INA219_WE.h>

#define I2C_ADDRESS 0x3F
INA219_WE ina219(I2C_ADDRESS);

void setup() {

  Serial.begin(9600);
  Wire.begin();
  if(!ina219.init()){
    Serial.println("INA219 not connected!");
  }
  else{
    Serial.println("INA219 connected!");
  }
}

void loop() { 
  float shuntVoltage_mV = 0.0;
  float loadVoltage_V = 0.0;
  float busVoltage_V = 0.0;
  float current_mA = 0.0;1
  float power_mW = 0.0; 
  bool ina219_overflow = false;
  
  shuntVoltage_mV = ina219.getShuntVoltage_mV();
  busVoltage_V = ina219.getBusVoltage_V();
  current_mA = ina219.getCurrent_mA();
  power_mW = ina219.getBusPower();
  loadVoltage_V  = busVoltage_V + (shuntVoltage_mV/1000);
  ina219_overflow = ina219.getOverflow();
  
  Serial.print("Bus Power [mW]: "); Serial.println(power_mW);
  
  delay(1000);
}