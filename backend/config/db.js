const { default: mongoose } = require("mongoose")

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("db is connected")
}).catch(err => {
  if (err) {
    console.log('there is an error', err.message)
  }
})

