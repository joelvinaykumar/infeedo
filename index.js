const app =  require('./server')
require('dotenv/config')

// Task Routes
const taskRouter = require('./controllers/TaskController')
app.use('/task', taskRouter)

app.listen(process.env.PORT, () => console.log("Server listening on port " + process.env.PORT))