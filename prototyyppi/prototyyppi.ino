#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include "LittleFS.h"
#include <Arduino_JSON.h>

#define DHTPIN 2 //Yhdistetty D4 pinniin
#define DHTPIN2 0 //Yhdistetty D3 pinniin
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE); //Sisälämpötila ja -kosteus
DHT dht2 (DHTPIN2, DHTTYPE); //Ulkolämpötila ja -kosteus

//DS18B20 kytkentä
const int oneWireBus = 14; //Yhdistetty D5 pinniin
OneWire oneWire(oneWireBus);
DallasTemperature sensors(&oneWire);

//Pienempi luku märempi, suurempi kuivempi.
const int dry = 1024; //kuiva sensori
const int wet = 50; // märkä sensori

// Aseta wifin ssid ja salasana
const char* ssid = "sinun_ssid";
const char* password = "sinun_salasana";

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

// Create an Event Source on /events
AsyncEventSource events("/events");

// Json Variable to Hold Sensor Readings
JSONVar readings;

String json;

// Timer variables
unsigned long lastTime = 0;  
unsigned long timerDelay = 30000;

// Get Sensor Readings and return JSON object
String getSensorReadings(){
  //Sisäilman mittaukset
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  if (isnan(h) || isnan(t)) { h=0; t=0; }
  readings["temperatureIn"] = String(t);
  readings["humidityIn"] =  String(h);
  
  //Ulkoilman mittaukset
  float h2 = (dht2.readHumidity() - 10); //Hieman virheellinen sensori, näyttää noin 10% liikaa kosteutta
  if (h2 < 0) { h2=0; };
  float t2 = dht2.readTemperature();
  if (isnan(h2) || isnan(t2)) { h2=0; t2=0; }
  readings["temperatureOut"] = String(t2);
  readings["humidityOut"] =  String(h2);
  
  sensors.requestTemperatures();
  readings["temperatureSoil"] =  String(sensors.getTempCByIndex(0)); //Kompostimullan lämpötila

  //Kompostimullan kosteuden lukeminen
  int moist_data = analogRead(A0);
  if(moist_data < wet) { moist_data = dry; } //sensori näyttää ilmassa ollessaan 17 lukemaa, tämä korjaa
  int percentageMoisture = map(moist_data, wet, dry, 100, 0); //Muutetaan prosenteiksi
  readings["humiditySoil"] =  String(percentageMoisture);
  
  String jsonString = JSON.stringify(readings);
  return jsonString;
}

// Initialize LittleFS
void initFS() {
  if (!LittleFS.begin()) {
    Serial.println("An error has occurred while mounting LittleFS");
  }
  Serial.println("LittleFS mounted successfully");
}

// Initialize WiFi
void initWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
}

void setup() {
  Serial.begin(115200);
  pinMode(16, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(A0, INPUT);
  dht.begin();
  dht2.begin();
  sensors.begin();
  initWiFi();
  initFS();

  json = getSensorReadings();

  // Web Server Root URL
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(LittleFS, "/index.html", "text/html");
  });

  server.serveStatic("/", LittleFS, "/");
  
  // Request for the latest sensor readings
  server.on("/readings", HTTP_GET, [](AsyncWebServerRequest *request){
    //String json = getSensorReadings();
    request->send(200, "application/json", json);
    json = String();
  });

  // Ilmaluukku 0% auki
  server.on("/ilma0", HTTP_GET, [](AsyncWebServerRequest *request){
    digitalWrite(4, LOW);
    digitalWrite(5, LOW);
    digitalWrite(16, LOW);
    request->send(LittleFS, "/index.html", "text/html");
  });

  // Ilmaluukku 25% auki
  server.on("/ilma25", HTTP_GET, [](AsyncWebServerRequest *request){
    digitalWrite(4, HIGH);
    digitalWrite(5, LOW);
    digitalWrite(16, LOW);
    request->send(LittleFS, "/index.html", "text/html");
  });

  // Ilmaluukku 50% auki
  server.on("/ilma50", HTTP_GET, [](AsyncWebServerRequest *request){
    digitalWrite(4, HIGH); 
    digitalWrite(5, HIGH);
    digitalWrite(16, LOW);   
    request->send(LittleFS, "/index.html", "text/html");
  });

  // Ilmaluukku 100% auki
  server.on("/ilma100", HTTP_GET, [](AsyncWebServerRequest *request){
    digitalWrite(4, HIGH); 
    digitalWrite(5, HIGH);
    digitalWrite(16, HIGH);
    request->send(LittleFS, "/index.html", "text/html");
  });

  events.onConnect([](AsyncEventSourceClient *client){
    if(client->lastId()){
      Serial.printf("Client reconnected! Last message ID that it got is: %u\n", client->lastId());
    }
    // send event with message "hello!", id current millis
    // and set reconnect delay to 1 second
    client->send("hello!", NULL, millis(), 10000);
  });
  server.addHandler(&events);

  // Start server
  server.begin();
}

void loop() {
  if ((millis() - lastTime) > timerDelay) {
    // Send Events to the client with the Sensor Readings Every 30 seconds
    events.send("ping",NULL,millis());
    events.send(getSensorReadings().c_str(),"new_readings" ,millis());
    lastTime = millis();
  }
}
