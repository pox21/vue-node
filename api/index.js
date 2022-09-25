const express = require('express');
const useRouter = require('./routes/list.routes');
const PORT = process.env.PORT || 8080;

const app = express();

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.json());
app.use('/api', useRouter);

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
  console.log(`GET: http://localhost:${PORT}/api/list - получить весь список`);
  console.log(`GET: http://localhost:${PORT}/api/list/:id - получить элемент списка`);
  console.log(`POST: http://localhost:${PORT}/api/item - добавить элемент в список`);
  console.log(`PUT: http://localhost:${PORT}/api/list/:id- изменить элемент`);
  console.log(`DELETE: http://localhost:${PORT}/api/list/:id- удалить элемент`);
  console.log(`---------------------------------------------------------------`);
  console.log(`обязательные поля при добавлении элемента: name`);
  console.log(`существующие поля при добавлении элемента: name, amount, distance`);
  console.log(`обязательный параметр для обновления элемента: id`);
  console.log(
    `существующие поля для обновления элемента: name, amount, distance`
  );
  console.log(`обязательный параметр для удаления элемента: id`);
});
