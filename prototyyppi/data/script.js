// Get current sensor readings when the page loads  
window.addEventListener('load', getReadings);

// Create Temperature Gauge (inside compost)
var gaugeTempIn = new LinearGauge({
  renderTo: 'gauge-temperature-in',
  width: 120,
  height: 400,
  units: "Lämpötila C",
  minValue: 0,
  startAngle: 90,
  ticksAngle: 180,
  maxValue: 90,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueDec: 2,
  valueInt: 2,
  majorTicks: [
      "0",
      "5",
      "10",
      "15",
      "20",
      "25",
      "30",
      "35",
      "40",
      "45",
      "50",
      "55",
      "60",
      "65",
      "70",
      "85",
      "90"
  ],
  minorTicks: 5,
  strokeTicks: true,
  highlights: [
      {
          "from": 50,
          "to": 90,
          "color": "rgba(200, 50, 50, .75)"
      }
  ],
  colorPlate: "#fff",
  colorBarProgress: "#CC2936",
  colorBarProgressEnd: "#049faa",
  borderShadowWidth: 0,
  borders: false,
  needleType: "arrow",
  needleWidth: 2,
  needleCircleSize: 7,
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear",
  barWidth: 10,
}).draw();

// Create Temperature Gauge (soil)
var gaugeTempSoil = new LinearGauge({
  renderTo: 'gauge-temperature-soil',
  width: 120,
  height: 400,
  units: "Lämpötila C",
  minValue: 0,
  startAngle: 90,
  ticksAngle: 180,
  maxValue: 90,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueDec: 2,
  valueInt: 2,
  majorTicks: [
      "0",
      "5",
      "10",
      "15",
      "20",
      "25",
      "30",
      "35",
      "40",
      "45",
      "50",
      "55",
      "60",
      "65",
      "70",
      "85",
      "90"
  ],
  minorTicks: 5,
  strokeTicks: true,
  highlights: [
      {
          "from": 50,
          "to": 90,
          "color": "rgba(200, 50, 50, .75)"
      }
  ],
  colorPlate: "#fff",
  colorBarProgress: "#CC2936",
  colorBarProgressEnd: "#049faa",
  borderShadowWidth: 0,
  borders: false,
  needleType: "arrow",
  needleWidth: 2,
  needleCircleSize: 7,
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear",
  barWidth: 10,
}).draw();

// Create Temperature Gauge (outside compost)
var gaugeTempOut = new LinearGauge({
    renderTo: 'gauge-temperature-out',
    width: 120,
    height: 400,
    units: "Lämpötila C",
    minValue: -40,
    startAngle: 90,
    ticksAngle: 180,
    maxValue: 40,
    colorValueBoxRect: "#049faa",
    colorValueBoxRectEnd: "#049faa",
    colorValueBoxBackground: "#f1fbfc",
    valueDec: 2,
    valueInt: 2,
    majorTicks: [
        "-40",
        "-35",
        "-30",
        "-25",
        "-20",
        "-15",
        "-10",
        "-5",
        "0",
        "5",
        "10",
        "15",
        "20",
        "25",
        "30",
        "35",
        "40"
    ],
    minorTicks: 5,
    strokeTicks: true,
    highlights: [
        {
            "from": 0,
            "to": 40,
            "color": "rgba(200, 50, 50, .75)"
        },
        {
          "from": -40,
          "to": 0,
          "color": "rgba(75, 75, 200, .75)"
      },
    ],
    colorPlate: "#fff",
    colorBarProgress: "#CC2936",
    colorBarProgressEnd: "#049faa",
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animationDuration: 1500,
    animationRule: "linear",
    barWidth: 10,
  }).draw();
  
// Create Humidity Gauge (inside compost)
var gaugeHumIn = new RadialGauge({
  renderTo: 'gauge-humidity-in',
  width: 300,
  height: 300,
  units: "Kosteus (%)",
  minValue: 0,
  maxValue: 100,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueInt: 2,
  majorTicks: [
      "0",
      "20",
      "40",
      "60",
      "80",
      "100"

  ],
  minorTicks: 4,
  strokeTicks: true,
  highlights: [
      {
          "from": 80,
          "to": 100,
          "color": "#03C0C1"
      }
  ],
  colorPlate: "#fff",
  borderShadowWidth: 0,
  borders: false,
  needleType: "line",
  colorNeedle: "#007F80",
  colorNeedleEnd: "#007F80",
  needleWidth: 2,
  needleCircleSize: 3,
  colorNeedleCircleOuter: "#007F80",
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear"
}).draw();

// Create Humidity Gauge (outside compost)
var gaugeHumOut = new RadialGauge({
  renderTo: 'gauge-humidity-out',
  width: 300,
  height: 300,
  units: "Kosteus (%)",
  minValue: 0,
  maxValue: 100,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueInt: 2,
  majorTicks: [
      "0",
      "20",
      "40",
      "60",
      "80",
      "100"

  ],
  minorTicks: 4,
  strokeTicks: true,
  highlights: [
      {
          "from": 80,
          "to": 100,
          "color": "#03C0C1"
      }
  ],
  colorPlate: "#fff",
  borderShadowWidth: 0,
  borders: false,
  needleType: "line",
  colorNeedle: "#007F80",
  colorNeedleEnd: "#007F80",
  needleWidth: 2,
  needleCircleSize: 3,
  colorNeedleCircleOuter: "#007F80",
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear"
}).draw();

// Create Humidity Gauge (outside compost)
var gaugeHumSoil = new RadialGauge({
  renderTo: 'gauge-humidity-soil',
  width: 300,
  height: 300,
  units: "Kosteus (%)",
  minValue: 0,
  maxValue: 100,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueInt: 2,
  majorTicks: [
      "0",
      "20",
      "40",
      "60",
      "80",
      "100"

  ],
  minorTicks: 4,
  strokeTicks: true,
  highlights: [
      {
          "from": 80,
          "to": 100,
          "color": "#03C0C1"
      }
  ],
  colorPlate: "#fff",
  borderShadowWidth: 0,
  borders: false,
  needleType: "line",
  colorNeedle: "#007F80",
  colorNeedleEnd: "#007F80",
  needleWidth: 2,
  needleCircleSize: 3,
  colorNeedleCircleOuter: "#007F80",
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear"
}).draw();

var myObj;
// Function to get current readings on the webpage when it loads for the first time
function getReadings(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myObj = JSON.parse(this.responseText);
      console.log(myObj);

      var tempIn = myObj.temperatureIn;
      var humIn = myObj.humidityIn;
      gaugeTempIn.value = tempIn;
      gaugeHumIn.value = humIn;

      var tempOut = myObj.temperatureOut;
      var humOut = myObj.humidityOut;
      gaugeTempOut.value = tempOut;
      gaugeHumOut.value = humOut;

      var tempSoil = myObj.temperatureSoil;
      var humSoil = myObj.humiditySoil;
      gaugeTempSoil.value = tempSoil;
      gaugeHumSoil.value = humSoil;

      if (humSoil < 45) {
        document.getElementById("warning").innerText = "Kuiva! < 45%"
        document.getElementById("warning").style.display = "inline";
      } else if (humSoil > 70) {
        document.getElementById("warning").innerText = "Märkä! > 70%"
        document.getElementById("warning").style.display = "inline";
      } else {
        document.getElementById("warning").style.display = "none";
      }
    }
  }; 
  xhr.open("GET", "/readings", true);
  xhr.send();
}

if (!!window.EventSource) {
  var source = new EventSource('/events');
  
  source.addEventListener('open', function(e) {
    console.log("Events Connected");
  }, false);

  source.addEventListener('error', function(e) {
    if (e.target.readyState != EventSource.OPEN) {
      console.log("Events Disconnected");
    }
  }, false);
  
  source.addEventListener('message', function(e) {
    console.log("message", e.data);
  }, false);
  
  source.addEventListener('new_readings', function(e) {
    console.log("new_readings", e.data);
    myObj = JSON.parse(e.data);
    console.log(myObj);
    gaugeTempIn.value = myObj.temperatureIn;
    gaugeHumIn.value = myObj.humidityIn;
    gaugeTempOut.value = myObj.temperatureOut;
    gaugeHumOut.value = myObj.humidityOut;
    gaugeTempSoil.value = myObj.temperatureSoil;
    gaugeHumSoil.value = myObj.humiditySoil;

    if (myObj.humiditySoil < 45) {
      document.getElementById("warning").innerText = "Kuiva! < 45%"
      document.getElementById("warning").style.display = "inline";
    } else if (myObj.humiditySoil > 70) {
      document.getElementById("warning").innerText = "Märkä! > 70%"
      document.getElementById("warning").style.display = "inline";
    } else {
      document.getElementById("warning").style.display = "none";
    }
  }, false);
}

if (window.location.href.indexOf('/ilma0') !== -1) {
  document.getElementById("button0").style.backgroundColor = "#4CAF50";
}
if (window.location.href.indexOf('/ilma25') !== -1) {
  document.getElementById("button25").style.backgroundColor = "#4CAF50";
}
if (window.location.href.indexOf('/ilma50') !== -1) {
  document.getElementById("button50").style.backgroundColor = "#4CAF50";
}
if (window.location.href.indexOf('/ilma100') !== -1) {
  document.getElementById("button100").style.backgroundColor = "#4CAF50";
}