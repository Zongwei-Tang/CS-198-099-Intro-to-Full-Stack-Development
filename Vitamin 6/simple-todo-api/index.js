const express = require('express')
const app = express()
const fs = require('fs')
const port = 3000

let todos
let currentid

if (fs.existsSync('Todos.txt') && fs.readFileSync(__dirname + '/Todos.txt', 'utf8')){
    todos = JSON.parse(fs.readFileSync(__dirname + '/Todos.txt', 'utf8'));
}
else{
    todos = []
}

if (fs.existsSync('id.txt')) {
    currentid=parseInt(fs.readFileSync(__dirname + '/id.txt'))
}
else {
    currentid=11111
}

app.use(express.json())

app.get('/', (req, res) => {
    console.log('You can use "/todos"')
})

app.get('/todos', (req, res, next) => {
    try{
        res.json(todos);
    }
    catch(error){
        next(error)
    }
})

app.post('/todos', (req, res, next) => {
    try{
        if (! req.body.task) {
            return res.send('Task is empty')
        }
        currentid++
        fs.writeFileSync(__dirname + '/id.txt', currentid)
        const newToDo = {id: currentid, task: req.body.task}
        todos.push(newToDo)
        fs.writeFileSync('Todos.txt', JSON.stringify(todos))
        res.status(200).json(newToDo)
    }
    catch(error){
        next(error)
    }
})

app.put('/todos/:id', (req, res, next) => {
    try{
        if (!req.body.task){
            return res.send('Task is empty')
        }
        const realTask =  todos.find(t => t.id === parseInt(req.params.id))
        if (realTask){
            realTask.task = req.body.task
            fs.writeFileSync('Todos.txt', JSON.stringify(todos))
            res.json(realTask)
        }
        else{
            res.status(404).send('No such todo item')
        }
    }
    catch(error){
        next(error)
    }
})

app.delete('/todos/:id', (req, res, next) => {
    try {
        const TaskItem = todos.find(t => t.id === parseInt(req.params.id))
        if (TaskItem) {
            todos = todos.filter(t => t.id != TaskItem.id)
            fs.writeFileSync('Todos.txt', JSON.stringify(todos))
            res.json(TaskItem)
        }
        else {
            res.send('No such item found')
        }
    }
    catch(error){
        next(error)
    }
})

app.use((err, req, res, next) => {
    res.json({Error: 'You are cooked'})
})



app.listen(port, () => {console.log('Server starts')})