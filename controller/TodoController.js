const todoService=require('./../service/todoService')


async function getAllTodos(req,res,next){
    let todos=await todoService.getAllToDos();
    return res.json(todos)
}
async function getAllCompletedTodo(req,res,next){
    let todo=await todoService.getAllCompleteTodo();
    return res.json(todo)
}

async function getTodoById(req,res,next){
let todoId=req.params['id'];
try{
    let todo=await todoService.getToDoById(todoId);
    if (todo){
        res.json(todo)
    }
    else {
        res.status(400).json({
            "message":"cannot not found id"
        })
    }
}
catch(e)
{
    res.status(400).json({
        error:'ToDo not found'
    });
}
}


async function createTodo(req,res,next){
    console.log("todo body",req.body)
    try{
    const todo=await todoService.saveTodo(req.body);
        if(!todo) throw Error('Cannot save todo');
        await res.status(201).json(todo);
    }
    catch(err)
    {
        console.log(err);
        await res.status(400).json({message: err})
    }
}

async function updateTodo(req,res,next){
    let todoId=req.params['id'];
    console.log("todoId",todoId,"todo Body",req.body)
    try{
        const todo=await todoService.updateTodo(todoId,req.body);

        if(!todo) throw Error('Cannot update todo');
        await res.status(201).json(todo);
    }
    catch(err)
    {
        console.log(err);
        await res.status(400).json({message: err})
    }
}

async function deleteTodo(req,res,next){
    let todoId=req.params['id'];

    try{
        const todo=await todoService.deleteTodo(todoId);

        if(!todo) throw Error('Cannot update todo');
        await res.status(201).json(todo);
    }
    catch(err)
    {
        console.log(err);
        await res.status(400).json({message: err})
    }
}

module.exports = {
    getAllTodos,
    getAllCompletedTodo,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
}