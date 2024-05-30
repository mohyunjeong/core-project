#define LightPin A0
#define LedPin 3 

void setup() {
  pinMode(LightPin, INPUT);
  pinMode(LedPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int lightLevel = analogRead(LightPin);
  int brightness = map(lightLevel, 0, 1023, 0, 255);
  brightness=255-brightness;
  analogWrite(LedPin, brightness); 
  Serial.println(brightness);

  delay(2000);
}
