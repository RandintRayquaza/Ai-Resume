import 'dotenv/config'
import app from './src/app.js'
import  ConnectDB from './src/config/database.js'

const port = process.env.PORT || 5000
ConnectDB()
app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
})