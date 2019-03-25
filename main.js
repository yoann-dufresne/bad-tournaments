const http = require('http');

var get_webpage = function(url, params) {
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

get_webpage('http://badiste.fr/liste-tournoi-badminton')
.then((data) => {console.log(data)});
