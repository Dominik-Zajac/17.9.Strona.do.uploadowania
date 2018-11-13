var fs = require('fs');
var colors = require('colors');
var formidable = require('formidable');

exports.upload = function(request, response) {
    console.log('Rozpoczynam obsluge zadania upload.'.cyan);
    var form = new formidable.IncomingForm();

    form.parse(request, function(err, fields, files) {
    	if (err) throw err;

        fileName = fields.title + '.png';
        fs.renameSync(files.upload.path, fileName);
        fs.readFile('./templates/upload.html', function(err, html) {
            if (err) throw err;

            response.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            response.write(html);
            response.write("<img src='/show' style='width: 1000px;'/>");
            response.end();
        });
    });
};

exports.welcome = function(request, response) {
    console.log('Rozpoczynam obsluge zadania welcome.'.cyan);

    switch (request.url) {
        case '/style.css':
            fs.readFile('./css/style.css', 'utf-8', function(err, css) {
                if (err) throw err;

                response.writeHead(200, {
                    'Content-type': 'text/css; charset=utf-8'
                });
                response.write(css);
                response.end();
            });
            break;
        default:
            fs.readFile('./templates/start.html', function(err, html) {
                if (err) throw err;

                response.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8'
                });
                response.write(html);
                response.end();
            });
    }
};

exports.error = function(request, response) {
    console.log('Nie wiem co robic.'.red);
    response.write('404 :(');
    response.end();
};

exports.show = function(request, response) {
    fs.readFile(fileName, 'binary', function(err, file) {
    	if (err) throw err;

        response.writeHead(200, {
            'Content-Type': 'image/png'
        });
        response.write(file, 'binary');
        response.end();
    });
};