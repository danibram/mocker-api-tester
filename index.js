var express = require('express');
var package = require('./package.json');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write(`<h1>mocker-data-generator tester</h1><p>Hey! this is the mocker-data-generator tester. I configured 2 routes (POSTs routes): <br/> <br/> "/schema/:schemaName" you need to send a post and send in the body {schema, options}, is like the schema method of the module. <br/>"/schemas" you need to send an array of schemas [{name, schema, options} ...] <br/><br/>  Have fun!!! <br/><br/> <a href="https://github.com/danibram/mocker-api-tester/"> View api documentation </a><a href="http://danibram.github.io/mocker-data-generator/"> View module documentation </a> </p><br/>Using version ${package.dependencies['mocker-data-generator']} of mocker-data-generator`);
  res.end();
});

app.post('/schema/:name', function (req, res) {
  var input = req.body;

  if (typeof input.options === 'object' || parseInt(input.options) > 0) {
    var opts = (typeof input.options === 'object') ? input.options : parseInt(input.options)
    var start = new Date()
    require('mocker-data-generator').default()
      .schema('mock', input.schema, opts)
      .build(function (err, data) {
        var result = {
          "metadata": {
            "count": data.mock.length,
            "generationTime(seconds)": ((new Date().getTime() - start.getTime()) / 1000)
          }
        }
        result[req.params.name] = data.mock
        res.json(result)
      })
  } else {
    res.end('Bad input!')
  }

});

app.post('/schemas', function (req, res) {
  var m = require('mocker-data-generator').default()
  var start = new Date()
  req.body.map(function (sch) {
    console.log(sch)
    if (typeof sch.options === 'object' || parseInt(sch.options) > 0) {
      var opts = (typeof sch.options === 'object') ? sch.options : parseInt(sch.options)
      m.schema(sch.name, sch.schema, opts)
    } else {
      res.end('Bad schema ' + sch.name + '!')
    }
  })

  m.build(function (err, data) {
    data.metadata = {
      "generationTime(seconds)": ((new Date().getTime() - start.getTime()) / 1000)
    }
    res.json(data)
  })
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
