const Router = require('express');
const router = new Router();

const list = require('../controller/list.controller');

router.post('/item', list.createListItem);
router.get('/list', list.getList);
router.get('/list/:id', list.getListItem);
router.put("/list/:id", list.updateListItem);
router.delete("/list/:id", list.deleteListItem);



module.exports = router;
