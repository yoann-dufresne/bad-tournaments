fs = require('fs');

export.extract_tournaments = function(data) { return new Promise(function(resolve, reject) {
  resolve(html.parse_badiste(data));
})};

export.save_tournaments = function(tournaments, filename) {
  fs.writeFile(filename, JSON.stringify(tournaments), (err)=>{});
}

export.load_tournaments = function(filename) {
  fs.readFile(filename, (err, data)=>{
    return data;
  });
}
