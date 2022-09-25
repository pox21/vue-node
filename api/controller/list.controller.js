const db = require('../db');

class ListController {
  async createListItem(req, res) {
    const { name, amount, distance } = req.body;
    if (!name) { 
      res.json({errorMsg: 'Заполните поле обязательное поле: name'});
      return;
    }
    if (amount && isNaN(+amount)) {
      res.json({ errorMsg: "поле amount должно быть числом" });
      return;
    }
    if (distance && isNaN(+distance)) {
      res.json({ errorMsg: "поле distance должно быть числом" });
      return;
    }
    
    const newItem = await db.query(
      `insert into list (name, amount, distance) values ($1, $2, $3) returning *`,
      [name, amount || 1, distance || 0]
    );
    res.json(newItem.rows);
  }

  async getList(req, res) {
    const list = await db.query(`select * from list`);
    res.json(list.rows);
  }

  async getListItem(req, res) {
    const id = req.params.id;
    const item = await db.query(`select * from list where id = $1`, [id]);
    res.json(item.rows[0]);
  }

  async updateListItem(req, res) {
    const id = req.params.id;
    const { name, amount, distance } = req.body;
    const item = await db.query(
      `update list set name = $1, amount = $2, distance = $3 where id = $4 returning *`,
      [name, amount, distance, id]
    );
    res.json(item.rows[0]);
  }

  async deleteListItem(req, res) {
    const id = req.params.id;
    const item = await db.query(`delete from list where id = $1`, [id]);
    res.json(item.rows[0]);

  }
}

module.exports = new ListController();