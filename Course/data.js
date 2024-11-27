
import express from 'express';
import fs from 'fs';



const app = express();

app.post('/courses', (req, res)=>{
    const course = req.body;
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if(err) {
            return res.status(500).send('Error reading file');
        }
        const courses = JSON.parse(data);
        courses.push(course);
        fs.writeFile('./data.json', JSON.stringify(courses), (err) => {
            if(err) {
                return res.status(500).send('Error writing to file');
            }
            res.status(200).send(course);
            console.log('Course added successfully');
        });
    });
})

app.listen(3000, ()=>{
  console.log("Server is running on http://localhost:3000");
})