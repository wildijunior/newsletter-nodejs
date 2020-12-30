import path from "path";
import https from "https";

export default {
  postClient(req, res) {
    //   pega dados do form
    const name = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const email = req.body.inputEmail;

    // cria membro
    let newMember = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: name,
            LNAME: sobrenome,
          },
        },
      ],
    };

    // converte membro em JSON
    let newMemberJSON = JSON.stringify(newMember);

    // URL PARA POST NA API com server prefix e list_id
    const apiURL = `https://us10.api.mailchimp.com/3.0/lists/c49c61cc5e/`;

    // options
    const options = {
      method: "POST",
      auth: "wildi1:388991052a02227186416ef2033d612c-us10",
    };

    // request api mailchimp
    const request = https.request(apiURL, options, (response) => {
      // CONDICAO CASO STATUS CODE 200
      if (response.statusCode === 200) {
        res.render(path.resolve("src/views/success"));
      } else {
        res.render(path.resolve("src/views/failure"));
      }

      response.on("data", (data) => {
        console.log(JSON.parse(data));
      });
    });

    // enviar dados ao mailchimp
    request.write(newMemberJSON);
    request.end();
  },
};
