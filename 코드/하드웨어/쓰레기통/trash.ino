#include <SoftwareSerial.h>
#include <Servo.h>

Servo myservo;

SoftwareSerial mySerial(10, 11);

int pos = 0;
int echoPin = 3;
int trigPin = 4;

void setup() {
  myservo.attach(7);
  mySerial.begin(9600); // Initialize software serial
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  long duration;
  long distance;
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = duration * 170 / 200;
  Serial.println(distance);

  if (distance < 200 && distance != 0) {
    for (pos = 100; pos >= 20; pos -= 1) {
      myservo.write(pos);
      delay(100);
    }

    for (pos = 20; pos < 110; pos += 1) {
      myservo.write(pos);
      delay(100);
    }
  }
}
