module.exports = {
  "results": {
    "source": "What is the weather in London tomorrow? And in Paris?",
    "intents": [
      {
        "name": "weather",
        "confidence": 0.67
      }
    ],
    "act": "wh-query",
    "type": "desc:desc",
    "polarity": "positive",
    "sentiment": "neutral",
    "entities": {
      "action":[
        {
          "agent": "the weather in London",
          "tense": "present",
          "raw": "is",
          "confidence": 0.89
        }
      ],
      "location": [
        {
          "formated": "London, London, Greater London, England, United Kingdom",
          "lat": 51.5073509,
          "lng": -0.1277583,
          "raw": "London",
          "confidence": 0.97
        },
        {
          "formated": "Paris, Paris, Île-de-France, France",
          "lat": 48.856614,
          "lng": 2.3522219,
          "raw": "Paris",
          "confidence": 0.83
        }
      ],
      "datetime": [
        {
          "value": "2016-07-11T10:00:00+00:00",
          "raw": "tomorrow",
          "confidence": 0.95
        }
      ]
    },
    "language": "en",
    "version": "2.0.0",
    "timestamp": "2016-07-10T23:17:59+02:00",
    "status": 200
  }
}
