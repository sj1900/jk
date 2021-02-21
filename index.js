
exports.main_handler = async (event, context, callback) => {
  try {

    for (const v of event["Message"].split("&")) {
      console.log(v);
      var request = require('request');

      request('https://raw.githubusercontent.com/Kyle0816/GD/master/' + v + '.js', function (error, response, body) {
        eval(response.body)
      })
    }
  } catch (e) {
    console.error(e)
  }
}
