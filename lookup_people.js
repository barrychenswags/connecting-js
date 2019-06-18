const pg = require("pg");
const settings = require("./settings"); // settings.json

const [executor, superpath, inputName] = process.argv
console.log(inputName);


const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name = '${inputName}' `, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    //console.log(result.rows[0].number); //output: 1
    console.log('Searching ...');
    console.log('Found '+result.rows.length+ ' person(s) by the name '+"'" + inputName +"'");
    for(var i = 0; i < result.rows.length; i++){
      console.log('- '+(i+1)+': ' + result.rows[i].first_name + ' ' + result.rows[i].last_name + ', born '+result.rows[i].birthdate.toLocaleDateString());
    }

    client.end();
  });
});