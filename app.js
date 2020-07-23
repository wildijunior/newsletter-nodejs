// require modules
const express = require("express");
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");

// app
const app = express();

// app use
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

// get request home route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

// post request
app.post("/", (req, res) => {
  // constantes com dados do post request
  const pNome = req.body.primeiroNome;
  const uNome = req.body.ultimoNome;
  const email = req.body.emailUser;

  // member key value path
  const dados = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: pNome,
          LNAME: uNome,
        },
      },
    ],
  };

  // transformar dados json em string
  // agora que temos os dados json convertidos
  // estes sao os dados que enviaremos ao servidor do mailchimp
  const jsonDados = JSON.stringify(dados);

  // api mailchimp configs
  const audienceId = "suaAudienceKey";
  const apiKey = "suaApiKey";
  const urlApi = "https://<seuUsCode>.api.mailchimp.com/3.0/lists/" + audienceId;

  // definindo a opcao do request
  // metodo e autenticacao
  const options = {
    method: "POST",
    auth: "ColoqueseuNome:" + apiKey,
  };

  // fazer request ao servidor do mailchimp
  const request = https.request(urlApi, options, (response) => {
    // valida o status code do https request
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    // pegar de volta os dados do response para enviar ao servidor do mailchimp
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  // enviando os dados ao servidor do mailchimp
  request.write(jsonDados);
  request.end();
});

// post request rota success
app.post("/success", (req, res) => {
  res.redirect("/");
});

// post request rota failure
app.post("/failure", (req, res) => {
  // redirecionar para home
  res.redirect("/");
});

// app listen
app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Servidor rodando na porta 3000");
});
