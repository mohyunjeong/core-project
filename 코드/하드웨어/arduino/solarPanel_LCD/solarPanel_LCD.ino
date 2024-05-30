#include <Wire.h>
#include <INA219_WE.h>
#include <LiquidCrystal_I2C.h>

#define I2C_ADDRESS 0x40

INA219_WE ina219(I2C_ADDRESS);
LiquidCrystal_I2C lcd(0x27,16,2);  // set the LCD address to 0x27 for a 16 chars and 2 line display

void setup() {
  lcd.init();
  lcd.backlight();
  lcd.clear();
  Serial.begin(9600);
  Wire.begin();
  if(!ina219.init()){
    Serial.println("INA219 not connected!");
    lcd.print("INA219");
    lcd.setCursor(0,1);
    lcd.print(" not connected!");
  } else {
    Serial.println("INA219 connected!");
    lcd.clear();
    lcd.print("Voltage:");
    lcd.setCursor(0,1);
    lcd.print("Current:");
    Serial.println("INA219 Current Sensor with solar panel");
  }
}

void loop() {
  float shuntVoltage_mV = 0.0;
  float loadVoltage_V = 0.0;
  float busVoltage_V = 0.0;
  float current_mA = 0.0;
  float power_mW = 0.0; 
  bool ina219_overflow = false;
  
  shuntVoltage_mV = ina219.getShuntVoltage_mV();
  busVoltage_V = ina219.getBusVoltage_V();
  current_mA = ina219.getCurrent_mA();
  power_mW = ina219.getBusPower();
  loadVoltage_V  = busVoltage_V + (shuntVoltage_mV / 1000);
  ina219_overflow = ina219.getOverflow();
  
  Serial.print("Shunt Voltage [mV]: "); Serial.println(shuntVoltage_mV);
  Serial.print("Bus Voltage [V]: "); Serial.println(busVoltage_V);
  Serial.print("Load Voltage [V]: "); Serial.println(loadVoltage_V);
  Serial.print("Current[mA]: "); Serial.println(current_mA);
  Serial.print("Bus Power [mW]: "); Serial.println(power_mW);

  lcd.setCursor(8,0);
  lcd.print(loadVoltage_V, 2);  // Print with 2 decimal places
  lcd.print("V     ");  // Add spaces to clear any previous data
  lcd.setCursor(8,1);
  lcd.print(current_mA, 2);  // Print with 2 decimal places
  lcd.print("mA    ");  // Add spaces to clear any previous data

  if(!ina219_overflow){
    Serial.println("Values OK - no overflow");
  } else {
    Serial.println("Overflow! Choose higher PGAIN");
  }
  Serial.println();
  
  delay(1000);
}
