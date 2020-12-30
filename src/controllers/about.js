import path from "path";

export default {
  getAbout(req, res) {
    res.render(path.resolve("src/views/about"));
  },
};
