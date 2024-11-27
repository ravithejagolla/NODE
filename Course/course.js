const express = require('express');
const fs = require('fs');
const readline = require('readline');

// Initialize Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON

const PORT = 3000;
const dbPath = './db.json';

// Helper functions to read and write data
const readData = () => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Create Course (POST Route)
app.post('/courses', (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    const data = readData();
    const newCourse = {
        id: data.courses.length + 1,
        title,
        description,
    };

    data.courses.push(newCourse);
    writeData(data);

    res.status(201).json({ message: 'Course added successfully', course: newCourse });
});

// Read Courses (GET Route)
app.get('/courses', (req, res) => {
    const data = readData();
    res.status(200).json(data.courses);
});

// Get Course by ID (GET Route)
app.get('/courses/:id', (req, res) => {
    const { id } = req.params;
    const data = readData();
    const course = data.courses.find(course => course.id === parseInt(id));

    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
});

// Update Course (PUT Route)
app.put('/courses/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    const data = readData();
    const courseIndex = data.courses.findIndex(course => course.id === parseInt(id));

    if (courseIndex === -1) {
        return res.status(404).json({ message: 'Course not found' });
    }

    data.courses[courseIndex] = { id: parseInt(id), title, description };
    writeData(data);

    res.status(200).json({ message: 'Course updated successfully', course: data.courses[courseIndex] });
});

// Delete Course (DELETE Route)
app.delete('/courses/:id', (req, res) => {
    const { id } = req.params;
    const data = readData();
    const courseIndex = data.courses.findIndex(course => course.id === parseInt(id));

    if (courseIndex === -1) {
        return res.status(404).json({ message: 'Course not found' });
    }

    data.courses.splice(courseIndex, 1);
    writeData(data);

    res.status(200).json({ message: 'Course deleted successfully' });
});

// Search Courses by Title (GET Route)
app.get('/courses/search', (req, res) => {
    const { title } = req.query;
    if (!title) {
        return res.status(400).json({ message: 'Title query parameter is required' });
    }

    const data = readData();
    const matchingCourses = data.courses.filter(course => course.title.toLowerCase().includes(title.toLowerCase()));

    if (matchingCourses.length === 0) {
        return res.status(404).json({ message: 'No courses found matching the title' });
    }

    res.status(200).json(matchingCourses);
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
    promptForCourseData(); // Start the terminal input process
});

// Function to prompt for course data from the terminal
const promptForCourseData = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question('Do you want to add a new course? (yes/no): ', (answer) => {
        if (answer.toLowerCase() === 'yes') {
            rl.question('Enter course title: ', (title) => {
                rl.question('Enter course description: ', (description) => {
                    const data = readData();
                    const newCourse = {
                        id: data.courses.length + 1,
                        title,
                        description,
                    };

                    data.courses.push(newCourse);
                    writeData(data);

                    console.log('Course added successfully:', newCourse);
                    rl.close();
                });
            });
        } else {
            console.log('No new course added.');
            rl.close();
        }
    });
};
