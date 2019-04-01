const html_parser = require('node-html-parser');


exports.parse_badiste = function (data) {
  const root = html_parser.parse(data);
  var table = root.querySelector('table.tux');

  let tournaments = [];
  for (let tournament_idx=1 ; tournament_idx<table.childNodes.length ; tournament_idx++) {
    let tournament = table.childNodes[tournament_idx];
    if (tournament.tagName != 'tr') continue;

    // Filter to keep only tds.
    let tds = [];
    for (let idx in tournament.childNodes) {
      let node = tournament.childNodes[idx];

      if (node == undefined)
        continue;

      if (node.tagName == "td") {
        tds.push(tournament.childNodes[idx]);
      }
    }

    let parsed_tournament = {};
    parsed_tournament.date = tds[0].rawText;
    parsed_tournament.register_link = tds[1].innerHTML;
    parsed_tournament.name = tds[1].rawText;
    parsed_tournament.club_ref = tds[2].innerHTML;
    parsed_tournament.zipcode = tds[3].rawText;
    parsed_tournament.gmaps = tds[4].innerHTML;
    parsed_tournament.unknown = tds[5].innerHTML;
    parsed_tournament.start_registration = tds[6].rawText;
    parsed_tournament.categories = tds[7].rawText;
    parsed_tournament.level = tds[8].rawText;
    parsed_tournament.closing_registration = tds[9].rawText;
    parsed_tournament.unknown2 = tds[10].innerHTML;

    tournaments.push(parsed_tournament);
  }

  return tournaments;
};