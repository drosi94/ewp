/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const request = require('request');
const parser = require('fast-xml-parser');
const cookieSession = require('cookie-session');

const app = express();
const port = 8080;

const key = fs.readFileSync(__dirname + '/../.cert/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/../.cert/selfsigned.crt');
const options = {
  key: key,
  cert: cert,
};

app.use(
  cookieSession({
    name: 'session',
    secret: 'supersecretkey',

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(bodyParser.json());

const allowedOrigins = ['https://localhost:8000', 'http://localhost:8000'];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.post('/api/validate', async (req, res) => {
  const {service, ticket} = req.body;
  request(
    {
      method: 'GET',
      uri: `https://sso.hua.gr/serviceValidate?service=${service}&ticket=${ticket}`,
    },
    (err, response) => {
      const jsonResponse = parser.parse(response.body);
      console.log(jsonResponse)
      if (
        jsonResponse['cas:serviceResponse'] &&
        jsonResponse['cas:serviceResponse']['cas:authenticationSuccess'] &&
        jsonResponse['cas:serviceResponse']['cas:authenticationSuccess'][
          'cas:user'
        ]
      ) {
        const user =
          jsonResponse['cas:serviceResponse']['cas:authenticationSuccess'][
            'cas:user'
          ];

        req.session.user = user;
        return res.redirect('https://localhost:8000/login');
      } else {
        return res.status(401).send();
      }
    }
  );
});

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Server listening at https://localhost:${port}`);
});
