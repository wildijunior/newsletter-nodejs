import myExpress from "./config/server.js";

const app = myExpress();

app.listen(process.env.PORT || 3333, () =>
  console.log("Server up and running")
);
