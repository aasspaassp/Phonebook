// mongodb+srv://andresfilos94:<password>@cluster0.zsxgft3.mongodb.net/?retryWrites=true&w=majority

const { Note } = require('@mui/icons-material')
const mongoose = require('mongoose')

//Código para conectarse a la database y enlistar los datos

if(process.argv.length<3){
  console.log("Give password as argument")
  process.exit(1)
}

const password = process.argv[2]

url = `mongodb+srv://andresfilos94:${password}@cluster0.zsxgft3.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 5){

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  
  person.save().then(result => {
    console.log(result)
    mongoose.connection.close()
  })

}else{
  Person.find({}).then(result => {
    result.forEach(person =>{
      console.log(person)
    })
    mongoose.connection.close()
  })
}


