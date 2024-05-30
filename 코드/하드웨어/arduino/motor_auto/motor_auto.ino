#include <DHT.h>

#define DHTPIN 2          
#define DHTTYPE DHT11     
#define MOTOR_PIN 4      

DHT dht(DHTPIN, DHTTYPE); 

void setup() {
  Serial.begin(9600);    
  dht.begin();            
  pinMode(MOTOR_PIN, OUTPUT); 
  digitalWrite(MOTOR_PIN, LOW);
}

void loop() {
  float temperature = dht.readTemperature();
  
  if (!isnan(temperature)) {
  
    Serial.println(temperature);
    
    if (temperature > 25.00) {
      digitalWrite(MOTOR_PIN, HIGH); 
    } else {
      digitalWrite(MOTOR_PIN, LOW); 
    }
  } else {
    Serial.println("Failed to read from DHT sensor!");
  }

  delay(2000); 
}
