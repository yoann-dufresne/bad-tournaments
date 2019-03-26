const http = require('http');

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

//var get_num_pages = function(data)

var extract_tournaments = function(data) { return new Promise(function(resolve, reject) {
	// Extract the table part
	data = data.split('<table class="tux"')[1].split('</table')[0];
	
	// Extract lines
	lines = data.split('<tr>');
	console.log(typeof lines);
	
	resolve(lines)
})};

get_webpage('http://badiste.fr/liste-tournoi-badminton')
.then(extract_tournaments)
.then((tournaments) => {
	//for (let idx=0 ; idx<tournaments.length ; idx++)
		//console.log(tournaments[idx] + "\n\n");
	console.log(typeof tournaments);
});
