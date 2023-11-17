let Todos=require('../model/ToDo')
async function getAllToDos()
{
    return Todos.find();
}
async function getAllCompleteTodo()
{
    let todo = await Todos.find({
        completed:true
    });
    return todo;
}
async function getToDoById(id)
{
    let todo = await Todos.findById(id);
    console.log('get Todo by id ',todo);
    return todo;
}

async function saveTodo(todo){
    let newTodo=new Todos(todo);
    return newTodo.save()
}

async function updateTodo(todoId,todo){
    let updateTodo=await Todos.findByIdAndUpdate(todoId,todo,{new:true});
    return updateTodo;
}

async function deleteTodo(todoId){
    let deleteTodo=await Todos.findByIdAndDelete(todoId);
    return deleteTodo;
}
module.exports = {
    getAllToDos,
    getAllCompleteTodo,
    getToDoById,
    saveTodo,
    updateTodo,
    deleteTodo
}