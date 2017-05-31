var jwt = require('express-jwt');
var validation = require('mw-validation');

class Users {
    constructor(app) {

        app.use(jwt({secret: 'secret'}).unless({path:['/api/users/login']}));

        app.options('/api/users/login', function (request, response) {
            response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            response.header('Access-Control-Allow-Methods', 'POST');
            response.header('Access-Control-Allow-Headers', 'Content-Type');
            response.json();
        });

        app.post('/api/users/login', function (request, response) {

            response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            response.header('Access-Control-Allow-Methods', 'POST');
            response.header('Access-Control-Allow-Headers', 'Content-Type');

            let login = request.body;

            const rules = {
                password: ['required', {equal:'password'} ],
                username: ['required', {equal:'username'} ]
            };
            var validationResult = validation.objectValidation.validateModel(login, rules, true);

            if (!validationResult.success) {
                response.status(400).json(validationResult.detail);
                return;
            }
            var token = jwt.sign({username:'username'}, 'secret');

            response.status(200).json({jwt:token});
        });

    }
}
module.exports = Users;