let assert = require('assert');
let fs = require('fs');
let yaml = require('js-yaml');

let port = 10514;
let template = {
    init_config: null,
    instances: null,
    logs: []
};

assert(process.env.ALLOWED_APPS, 'Environment variable ALLOWED_APPS required');
let appNames = process.env.ALLOWED_APPS.split(',');

appNames.forEach(function(name, index, arr) {
    template.logs.push({
        type: 'tcp',
        port: port++,
        service: name.replace(/_/g, '-').trim(),
        source: 'heroku'
    });
});

console.log(yaml.safeDump(template));
