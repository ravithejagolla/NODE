import {Router} from 'express';
import {createNote, getNotes, updateNote, deleteNote} from '../controllers/notes.controller.js';
import isAuthenticated from '../middlewares/auth.middleware.js';


const notesrouter = Router();


notesrouter.post('/notes', isAuthenticated, createNote);


notesrouter.get('/notes', isAuthenticated, getNotes);


notesrouter.put('/notes/:id', isAuthenticated, updateNote);


notesrouter.delete('/notes/:id', isAuthenticated, deleteNote);



export default notesrouter;