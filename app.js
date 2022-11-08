const express = require('express')
const path = require('path')
const fileupload = require('express-fileupload')
const app = express()

let initialPath = path.join(__dirname, "/public")

app.use(express.static(initialPath))

app.use(fileupload())

app.get('/', (req, res) => {
    res.sendFile(path.join(initialPath, "index.html"));
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initialPath, "editor.html"));
})


app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initialPath, "blog.html"));
})

app.use((req, res) => {
    res.json("404");
})


app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();

    // image name
    let imagename = date.getDate() + date.getTime() + file.name;

    // image upload path
    let path = 'public/uploads/' + imagename;

    // create upload
    file.mv(path, (err, result) => {
        if (err) {
            throw err;
        } else {
            // our image upload path
            res.json(`uploads/${imagename}`)
        }
    })
})

app.listen(3000, () => {
    console.log('sever up!');
})