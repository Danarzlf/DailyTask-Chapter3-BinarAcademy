//express untuk memudahkan http server
// express memudahkan server

// import / panggil package yg kita mau pakai pada aplikasi kita
const express = require('express');
const fs = require("fs");
const app = express();
const PORT = 3000;

// middleware
app.use(express.json());

// built in function di node js(?)
// proses baca file json nya dengan FS module, nah dibantu dengan JSON.parse
let persons = JSON.parse(fs.readFileSync(`${__dirname}/person.json`))

// url utamna dari app
// req = request
// res = response

// get post http method
// "/" = URL
app.get('/', (req, res) => {
    res.send('Hello FSW 3 luar biasa dehh !! dari server niih')
})

app.post('/', (req, res) => {
    res.send('Kita bisa ngelakuin post niii widiii kerenn')
})




//Code 400 untuk bad request
//Code 404 apabila sumber daya tidak ditemukan

// REQUEST METHOD GET
app.get('/person', (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            persons: persons
        }
    })
})

// // REQUEST METHOD GET DENGAN ID Cara 1
// // :id url parameter
// app.get('/person/:id', (req, res) => {
//     // console.log(req)
//     // console.log(req.params);

//     const id = req.params.id * 1;
//     const person = persons.find(el => el.id === id)
//     // console.log(person)

//     //Validasi ID harus angka bukan String
//     if (isNaN(id)) {
//         res.status(400).json({
//             status: 'failed',
//             message: 'ID harus berupa angka'
//         });
//     }

//     //Validasi ID harus bilangan positif bukan bilangan negatif(-)
//     if (id < 0) {
//         res.status(400).json({
//             status: 'failed',
//             message: 'ID harus berupa bilangan positif'
//         });
//     }

//     //Validasi ID tidak ditemukan
//     if (!person) {
//         res.status(404).json({
//             status: 'failed',
//             message: `person dengan id ${id} tersebut tidak ada / invalid`
//         })
//     } 

//     res.status(200).json({
//         status: "success",
//         data: {
//             person 
//         }
//     })
// })


// REQUEST METHOD GET DENGAN ID Cara 2
app.get('/person/:id', (req, res) => {
    const id = req.params.id * 1;
    const person = persons.find(el => el.id === id);

    //Validasi ID harus berupa angka
    if (isNaN(id)) {
        res.status(400).json({
            status: 'failed',
            message: 'ID harus berupa angka'
        });
    } 
    //Vlidasi ID Bilangan Positif tiak boleh Bilangan Negatif(-)
    else if (id < 0) {
        res.status(400).json({
            status: 'failed',
            message: 'ID harus berupa bilangan positif'
        });
    } else if (!person) {
        res.status(404).json({
            status: 'failed',
            message: `person dengan id ${id} tersebut tidak ada / invalid`
        });
    } else {
        res.status(200).json({
            status: "success",
            data: {
                person 
            }
        });
    }
});








// REQUEST METHOD POST Cara 1
app.post('/person', (req, res) => {

    console.log(persons.length - 1)
    const newId = persons.length - 1 + 10;
    const newPerson = Object.assign({ id: newId }, req.body)

    // validasi kalau name nya udh ada, maka gk bisa create data baru
    const personName = persons.find(el => el.name === req.body.name);
    console.log(personName)

    const cukupUmur = req.body.age < 20

    if (personName) {
        res.status(400).json({
            status: 'failed',
            message: `name ${req.body.name} already exist`
        })
    } else if (cukupUmur) {
        res.status(400).json({
            status: 'failed',
            message: `umur ${req.body.age} belum cukup`
        })
    } else {
        persons.push(newPerson);
        fs.writeFile(
            `${__dirname}/person.json`,
            JSON.stringify(persons),
            errr => {
                res.status(201).json({
                    status: 'success',
                    data: {
                        person: newPerson
                    }
                })
            }
        )
    }
})


// // REQUEST METHOD POST cara 2
// app.post('/person', (req, res) => {
//     const newId = persons.length > 0 ? persons[persons.length - 1].id + 1 : 1;
//     const newPerson = Object.assign({ id: newId }, req.body);

//     // validasi kalau name nya udh ada, maka gk bisa create data baru
//     const personName = persons.find(el => el.name === req.body.name);
//     if (personName) {
//         return res.status(400).json({
//             status: 'failed',
//             message: `name ${req.body.name} already exist`
//         });
//     }

//     // Validasi ID sudah ada atau belum
//     const personId = persons.some(el => el.id === newId);
//     if (personId) {
//         return res.status(400).json({
//             status: 'failed',
//             message: `ID ${newId} sudah digunakan, silahkan gunakan ID lain`
//         });
//     }

//     const cukupUmur = req.body.age < 20;

//     if (cukupUmur) {
//         return res.status(400).json({
//             status: 'failed',
//             message: `umur ${req.body.age} belum cukup`
//         });
//     }

//     persons.push(newPerson);
//     fs.writeFile(
//         `${__dirname}/person.json`,
//         JSON.stringify(persons),
//         errr => {
//             res.status(201).json({
//                 status: 'success',
//                 data: {
//                     person: newPerson
//                 }
//             })
//         }
//     );
// });









// REQUEST METHOD PUT cara 1
// app.put('/person/:id', (req, res) => {
//     const id = req.params.id;
//     const person = persons.find(person => person.id == id);

//     // Validasi ID harus angka bukan String
//     if (isNaN(id)) {
//         res.status(400).json({
//             status: 'failed',
//             message: 'ID harus berupa angka'
//         });
//     }

//     // Validasi ID harus bilangan positif bukan bilangan negatif(-)
//     if (id < 0) {
//         res.status(400).json({
//             status: 'failed',
//             message: 'ID harus berupa bilangan positif'
//         });
//     }

//     // Validasi ID tidak ditemukan
//     if (!person) {
//         res.status(400).json({
//             status: 'failed',
//             message: `person dengan id ${id} tersebut tidak ada / invalid`
//         })
//     } 

//     const personEdit = Object.assign(person, req.body);

//     fs.writeFile(
//         `${__dirname}/person.json`,
//         JSON.stringify(persons),
//         err => {
//             res.status(200).json({
//                 status: "success",
//                 data: {
//                     person: personEdit
//                 }
//             });
//         }
//     );
// });



// REQUEST METHOD PUT cara 2
app.put('/person/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id == id);

    if (isNaN(id)) {
        res.status(400).json({
            status: 'failed',
            message: 'ID harus berupa angka'
        });
    } else if (id < 0) {
        res.status(400).json({
            status: 'failed',
            message: 'ID harus berupa bilangan positif'
        });
    } else if (!person) {
        res.status(400).json({
            status: 'failed',
            message: `person dengan id ${id} tersebut tidak ada / invalid`
        })
    } else {
        const personEdit = Object.assign(person, req.body);

        fs.writeFile(
            `${__dirname}/person.json`,
            JSON.stringify(persons),
            err => {
                res.status(200).json({
                    status: "success",
                    data: {
                        person: personEdit
                    }
                });
            }
        );
    }
});





// REQUEST METHOD DELETE = delete existing data Cara 1
// app.delete('/person/:id', (req, res) => {
//     const id = req.params.id * 1;

//     const index = persons.findIndex(element => element.id === id);
//     const person = persons.find(el => el.id === id);

    
//     //Validasi ID harus angka bukan String
//     if (isNaN(id)) {
//         res.status(400).json({
//             status: 'failed',
//             message: 'ID harus berupa angka'
//         });
//     }

//     //Validasi ID harus bilangan positif bukan bilangan negatif(-)
//     if (id < 0) {
//         res.status(400).json({
//             status: 'failed',
//             message: 'ID harus berupa bilangan positif'
//         });
//     } 

//     //Validasi ID tidak ditemukan
//     if (!person) {
//         res.status(400).json({
//             status: 'failed',
//             message: `person dengan id ${id} tersebut tidak ada / invalid`
//         })
//     }

//     if (index !== -1) {
//         persons.splice(index, 1);
//     }

//     fs.writeFile(
//         `${__dirname}/person.json`,
//         JSON.stringify(persons),
//         errr => {
//             res.status(200).json({
//                 status: 'success',
//                 message: `data dari id ${id} nya berhasil dihapus`
//             })
//         }
//     )
// })
    




// // REQUEST METHOD DELETE = delete existing data Cara 2
app.delete('/person/:id', (req, res) => {
    const id = req.params.id * 1;

    const index = persons.findIndex(element => element.id === id);
    const person = persons.find(el => el.id === id);

    if (isNaN(id)) {
        res.status(400).json({
            status: 'failed',
            message: 'ID harus berupa angka'
        });
    } else if (id < 0) {
        res.status(400).json({
            status: 'failed',
            message: 'ID harus berupa bilangan positif'
        });
    } else if (!person) {
        res.status(400).json({
            status: 'failed',
            message: `person dengan id ${id} tersebut tidak ada / invalid`
        });
    } else {
        if (index !== -1) {
            persons.splice(index, 1);
        }

        fs.writeFile(
            `${__dirname}/person.json`,
            JSON.stringify(persons),
            errr => {
                res.status(200).json({
                    status: 'success',
                    message: `data dari id ${id} nya berhasil dihapus`
                });
            }
        );
    }
});



// memulai http server 
app.listen(PORT, () => {
    console.log(`App running on localhost: ${PORT}`)
})



//STEP
// npm init
// npm install express
// index.js
// di package.json ditambah "start": "node index.js",
// npm run start
// npm install nodemon -> akan restart server (otomatis jalan, biar ga on off in npm run start)
// di package.json ditambah "dev": "nodemon index.js"
// npm run dev (langsung ini buat jalanin, biar nyambung demon nya)