```
curl --location --request POST 'http://localhost:8080/generate-prompt' \
--header 'Content-Type: application/json' \
--data-raw '{
    "actors": [
        {
            "Resembling personality": "Varun Sharma",
            "action": "Fighting",
            "Age": "30",
            "Body Shape": "Weak",
            "Atire": "Armor"
        }
    ],
    "Background Audience": "Spectators in a stadium",
    "Background Specification": "Daytime with clear sky",
    "Lightings": "Bright with focus on actors",
    "Mood": "Exciting",
    "targetAudiance": [
        {
            "Age group": "35",
            "Gender": "Female"
        }
    ],
    "Product": [
        {
            "Discription": "Latest gaming console",
            "Expected Impact": "Trying harder"
        }
    ]
}'

```
