var express = require('express');
const path = require('path');
var router = express.Router();
const todos=require('./../controller/todoController')
// const {getAllTodos} = require("../controller/todoController");


router.get('/',todos.getAllTodos);
router.get('/completed',todos.getAllCompletedTodo)
router.get('/:id',todos.getTodoById);
router.post('/',todos.createTodo);
router.put('/:id',todos.updateTodo);
router.delete('/:id',todos.deleteTodo)

// router.get('/:todoId', function(req, res, next) {
//     console.log('todos/',req.params['todoId']);
//     let todoId=req.params['todoId'];
//     let todo=todos.find((todo)=>todo.id==todoId );
//     res.json(todo);
//
//
// });

module.exports = router;

