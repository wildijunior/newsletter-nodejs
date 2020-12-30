import path from "path";
import mailchimp from "@mailchimp/mailchimp_marketing";
import client from "@mailchimp/mailchimp_marketing";

export default {
  getSignup(req, res) {
    res.render(path.resolve("src/views/signup"));
  },

  postSignup(req, res) {
    // mailchimp config
    mailchimp.setConfig({
      apiKey: "388991052a02227186416ef2033d612c-us10",
      server: "us10",
    });

    // listid
    const listId = "c49c61cc5e";

    // novo user
    const subscribingUser = {
      firstName: req.body.nome,
      lastName: req.body.sobrenome,
      email: req.body.inputEmail,
    };

    //
    async function run() {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName,
        },
      });

      console.log(
        `Successfully added contact as an audience member. The contact's id is ${response.id}.`
      );
    }

    run();

    res.render(path.resolve("src/views/success"));
  },

  getList(req, res) {
    client.setConfig({
      apiKey: "388991052a02227186416ef2033d612c-us10",
      server: "us10",
    });
    const run = async () => {
      const response = await client.lists.getListClients("c49c61cc5e");
      console.log(response);
    };

    run();
  },

  getFailure(req, res) {
    res.status(400).render(path.resolve("src/views/failure"));
  },
};
