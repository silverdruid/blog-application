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
    res.sendFile(path.join(initial_path, "blog.html"));
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

// import { initializeApp } from 'firebase/app';

// // TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//         apiKey: "AIzaSyAcA4A-A82SgiDP3kfhCeQnJ7yhyBSuE6s",
//         authDomain: "blog-application-570a3.firebaseapp.com",
//         projectId: "blog-application-570a3",
//         storageBucket: "blog-application-570a3.appspot.com",
//         messagingSenderId: "463335489937",
//         appId: "1:463335489937:web:34567a31eeda7d58589a30",
//         measurementId: "G-FZ2KX9KKJG"
//     };

//     // Initialize Firebase
//     const appf = initializeApp(firebaseConfig);
//     const analytics = getAnalytics(appf);



app.listen(3000, () => {
    console.log('sever up!');
})