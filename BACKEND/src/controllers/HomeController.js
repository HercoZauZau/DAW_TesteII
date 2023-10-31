class HomeController {
  async index(req, res) {
    res.json('API REST');
  }
}

export default new HomeController();
