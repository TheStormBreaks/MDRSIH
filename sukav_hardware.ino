#include <DHT.h>
// Pin definitions
const int tempSensorPin = A0;
const int irSensorPin = 2;
const int touchDigitalPin = 5;
const int touchAnalogPin = A1;
#define DHTPIN 3
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// MDR Fake Values (simulates Pathogen Virulence)
float mdrValue = 0.35;

// Terminal color macros (for Serial Monitor)
#define RED     "\033[31m"
#define YELLOW  "\033[33m"
#define GREEN   "\033[32m"
#define RESET   "\033[0m"
#define CLEAR   "\033[2J\033[H"

// Helper functions to map sensor values to 0-10 scale
float tempToVulnerability(float t) {
  // For example: <36.5°C = 2, 36.5–37.5°C = 6, >37.5°C = 9
  if (t > 37.5) return 9.0;
  if (t > 36.5) return 6.0;
  return 2.0;
}
float humidityToEnvRisk(float h) {
  // For example: <40% or >70% = 9, 40–70% = 2
  if (h < 40 || h > 70) return 9.0;
  return 2.0;
}
float mdrToVirulence(float m) {
  // MDR risk assumed already in 0–1.25, map to 0–10
  return (m / 1.25) * 10.0;
}

String riskColor(float v) {
  if (v > 70) return RED;
  if (v > 40) return YELLOW;
  return GREEN;
}

String riskText(float v) {
  if (v > 70) return "HIGH RISK";
  if (v > 40) return "MODERATE RISK";
  return "NORMAL";
}

void setup() {
  Serial.begin(9600);
  dht.begin();
  pinMode(irSensorPin, INPUT);
  pinMode(touchDigitalPin, INPUT);
  randomSeed(analogRead(A3));
}

void loop() {
  // Read sensors
  int rawTemp = analogRead(tempSensorPin);
  float voltage = rawTemp * (5.0 / 1024.0);
  float temperatureC = (voltage - 0.5) * 100;
  float humidity = dht.readHumidity();
  if (isnan(humidity)) humidity = random(40, 80); // fallback

  // Simulate drift of MDR value (pathogen risk)
  float change = (random(-7, 9) / 100.0);
  mdrValue += change;
  if (mdrValue < 0.10) mdrValue = 0.10;
  if (mdrValue > 1.25) mdrValue = 1.25;

  // Convert readings to risk scores (0-10)
  float pathogenVirulence = mdrToVirulence(mdrValue);
  float patientVulnerability = tempToVulnerability(temperatureC);
  float environmentalRisk = humidityToEnvRisk(humidity);

  // MAIN RISK FORMULA
  float riskScore = ((pathogenVirulence * 0.4) + (patientVulnerability * 0.3) + (environmentalRisk * 0.3)) / 10.0 * 100.0;

  // Output
  Serial.print(CLEAR);
  Serial.println("==============================================================");
  Serial.println("                    BIOSAFETY WRISTBAND STATUS               ");
  Serial.println("==============================================================\n");
  Serial.print("[ AGGREGATE RISK ]   ");
  Serial.print(riskColor(riskScore));
  Serial.print(" << ");
  Serial.print(riskText(riskScore));
  Serial.print(" >> ");
  Serial.print(RESET);
  Serial.print("   Risk Score: ");
  Serial.print(riskScore, 1);
  Serial.println("%\n");

  Serial.print("   MDR Virulence Score: "); Serial.println(pathogenVirulence, 1);
  Serial.print("   Patient Vulnerability (Temp): "); Serial.println(patientVulnerability, 1);
  Serial.print("   Environmental Risk (Humidity): "); Serial.println(environmentalRisk, 1);
  Serial.print("   Temp: "); Serial.print(temperatureC, 1); Serial.println("°C");
  Serial.print("   Humidity: "); Serial.print(humidity, 0); Serial.println("%");

  // Retain other sensor outputs if needed (e.g., touch, IR)

  Serial.println("==============================================================");
  delay(1000);
}
