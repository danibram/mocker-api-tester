# mocker-api-tester

[![Support link][paypal-badge]][paypal-link]

mocker-tester is the repository of the api deployed in heroku of this awesome module:

[https://github.com/danibram/mocker-data-generator](https://github.com/danibram/mocker-data-generator)

This project lives in heroku: [https://mocker-api.herokuapp.com](https://github.com/danibram/mocker-data-generator)
##API
####2 routes are exposed:
- **_/schema/:name_** (POST): You must pass in the body a JSON with this structure:

  ```javascript
    //Structure
    {schema, options}

    //Example
    {
        "schema": {
            "firstName": {
                "faker": "name.firstName"
            },
            "lastName": {
                "faker": "name.lastName"
            },
            "country": {
                "faker": "address.country"
            },
            "createdAt": {
                "faker": "date.past"
            }
        },
        "options": 5
    }

    //Response
    {
      "metadata": {
        "count": 5,
        "generationTime(seconds)": 0.001
      },
      "users": [
        {
          "firstName": "Ignatius",
          "lastName": "Shields",
          "country": "Georgia",
          "createdAt": "2015-04-21T14:26:28.920Z"
        },
        {
          "firstName": "Braxton",
          "lastName": "Heathcote",
          "country": "Sri Lanka",
          "createdAt": "2015-03-16T19:04:37.245Z"
        },
        {
          "firstName": "Marlin",
          "lastName": "Morar",
          "country": "Kuwait",
          "createdAt": "2015-12-03T04:53:37.689Z"
        },
        {
          "firstName": "Emmanuel",
          "lastName": "Bernhard",
          "country": "Togo",
          "createdAt": "2015-08-25T14:40:59.559Z"
        },
        {
          "firstName": "Hermina",
          "lastName": "Heathcote",
          "country": "Marshall Islands",
          "createdAt": "2015-09-19T07:24:54.477Z"
        }
      ]
    }
  ```

- **_/schemas_** (POST):  You must pass in the body a JSON with this structure:

  ```javascript
    //Structure
    [{name, schema, options}, {name, schema, options}, {name, schema, options}, ...]

    //Example
        [{
          "name": "users",
          "schema": {
              "firstName": {
                  "faker": "name.firstName"
              },
              "lastName": {
                  "faker": "name.lastName"
              },
              "country": {
                  "faker": "address.country"
              },
              "createdAt": {
                  "faker": "date.past"
              }
          },
          "options": 5
      },{
          "name": "cats",
          "schema": {
              "name":{
                  "values": ["pitxi", "txury", "kitty"]
              }
          },
          "options": 4
      }]

      //Response
      {
      "users": [
        {
          "firstName": "Ila",
          "lastName": "Hackett",
          "country": "Morocco",
          "createdAt": "2015-04-18T05:37:56.118Z"
        },
        {
          "firstName": "Breana",
          "lastName": "Larkin",
          "country": "Haiti",
          "createdAt": "2015-10-30T17:50:09.801Z"
        },
        {
          "firstName": "Rory",
          "lastName": "Hilpert",
          "country": "Togo",
          "createdAt": "2015-04-30T08:40:01.859Z"
        },
        {
          "firstName": "Dawn",
          "lastName": "McClure",
          "country": "Kiribati",
          "createdAt": "2015-11-28T01:23:42.825Z"
        },
        {
          "firstName": "Rosemarie",
          "lastName": "Huels",
          "country": "Uzbekistan",
          "createdAt": "2015-12-15T09:36:49.934Z"
        }
      ],
      "cats": [
        {
          "name": "txury"
        },
        {
          "name": "kitty"
        },
        {
          "name": "kitty"
        },
        {
          "name": "txury"
        }
      ],
      "metadata": {
        "generationTime(seconds)": 0.002
      }
      }
  ```
##Curl Examples:

[![asciicast](https://asciinema.org/a/36797.png)](https://asciinema.org/a/36797)

- **_/schema/:name_**

  ```bash
  curl -i \
  -H "Accept: application/json" \
  -H "Content-Type:application/json" \
  -X POST --data '{ "schema": { "firstName": { "faker": "name.firstName" }, "lastName": { "faker": "name.lastName" }, "country": { "faker": "address.country" }, "createdAt": { "faker": "date.past" } }, "options": 5 }' https://mocker-api.herokuapp.com/schema/users
  ```

  ```bash
  curl -i \
  -H "Accept: application/json" \
  -H "Content-Type:application/json" \
  -X POST --data '{ "schema": { "firstName": { "faker": "name.firstName" }, "lastName": { "faker": "name.lastName" }}, "options": 5 }' https://mocker-api.herokuapp.com/schema/users
  ```

- **_/schemas**

  ```bash
  curl -i \
  -H "Accept: application/json" \
  -H "Content-Type:application/json" \
  -X POST --data '[{ "name": "users", "schema": { "firstName": { "faker": "name.firstName" }, "lastName": { "faker": "name.lastName" }, "country": { "faker": "address.country" }, "createdAt": { "faker": "date.past" } }, "options": 5 },{ "name": "cats", "schema": { "name":{ "values": ["pitxi", "txury", "kitty"] } }, "options": 4 }]' https://mocker-api.herokuapp.com/schemas
  ```

## Module Documentation
[https://github.com/danibram/mocker-data-generator](https://github.com/danibram/mocker-data-generator)

## License
Licensed under the MIT license. 2015

[paypal-badge]: https://img.shields.io/badge/❤%20support-paypal-blue.svg?style=flat-square
[paypal-link]: https://www.paypal.me/danibram
