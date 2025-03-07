const Note = require('../models/note.model'); // Assuming you have a Note model




// Create a new note
export const createNote = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { title, content } = req.body;

        const newNote = new Note({
            userId,
            title,
            content
        });

        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Fetch notes created by the logged-in user
export const getNotes = async (req, res) => {
    try {
        const userId = req.user.id; 
        const notes = await Note.find({ userId });

        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a note
export const updateNote = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user
        const noteId = req.params.id;
        const { title, content } = req.body;

        const note = await Note.findOneAndUpdate(
            { _id: noteId, userId },
            { title, content },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a note
export const deleteNote = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user
        const noteId = req.params.id;

        const note = await Note.findOneAndDelete({ _id: noteId, userId });

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};