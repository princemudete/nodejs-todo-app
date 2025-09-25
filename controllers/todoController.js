const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// ✅ Replace with your Atlas connection string
const mongoURI = "mongodb+srv://todoUser:todoPass123@cluster0.i39yfn2.mongodb.net/todoDB?retryWrites=true&w=majority";

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create a schema - blueprint for todos
const todoSchema = new mongoose.Schema({
  item: String
});

// Create a Mongoose model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app) {

  // GET: list all todos
  app.get('/todo', async (req, res) => {
    try {
      const data = await Todo.find();
      res.render('todo', { todos: data });
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // POST: add a new todo
  app.post('/todo', urlencodedParser, async (req, res) => {
    try {
      const newTodo = new Todo(req.body);
      const data = await newTodo.save();   // ✅ async/await, no callback
      res.json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // DELETE: remove a todo by item name
  app.delete('/todo/:item', async (req, res) => {
    try {
      const itemToDelete = req.params.item.replace(/-/g, ' ');
      const result = await Todo.deleteOne({ item: itemToDelete });
      res.json(result);
    } catch (err) {
      res.status(500).send(err);
    }
  });

};
