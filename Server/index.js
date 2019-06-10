const express = require('express')
const multer = require('multer')

const app = express()
const port = process.env.PORT || 3000

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, callback) {
      callback(null, file.originalname)
  }
});

const upload = multer({ storage: storage })


app.get('/', function(req, res) {
    res.send("Cool! The server is running!")
})

app.post('/upload', upload.single('uploadedFile'), (req, res) => {
    if (req.file) {
        console.log(req.file)
        console.log(req.body)

        return res.send({ result: true })
    } else {
        return res.send({ result: false })
    }
})


app.post('/multiupload', upload.array('uploadedFile', 10), (req, res) => {
    if (req.files) {
        console.log("Received files:")
        for (let i=0; i<req.files.length; i++) {
            console.log("- " + req.files[i].originalname)
        }

        return res.send({ result: true })
    } else {
        return res.send({ result: false })
    }
})

app.listen(port)
console.log('Server started successfully on port ' + port + "!")
