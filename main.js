const http = require('http');
const html = require('./parser.js')

var get_webpage = function(url, params={}) {
	complete_url = url;
	first = true;
	for (let key in params) {
		if (first) {
			complete_url += '?';
			first = false;
		} else
			complete_url += '&';
		complete_url += key + '=' + params[key];
	}
	
	return new Promise(function (resolve, reject) {
		http.get(url, (res) => {
			let data = '';
			
			res.on('data', (chunk) => {
				data += chunk;
			});
			
			res.on('end', () => {
				resolve(data);
			});
		}).on('error', (err) => {
			console.log('Error: ' + err.message);
			reject(err);
		});
	});
};


// --- Request and parsing ---

const manipulator = require('./tournaments.js');
// get_webpage('http://badiste.fr/liste-tournoi-badminton')
get_webpage('http://localhost:8000/test.html')
.then(extract_tournaments)
.then((tournaments) => {
	for (let idx in tournaments)
		console.log(tournaments[idx]);
	console.log(tournaments.length);
});
