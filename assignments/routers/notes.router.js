import {Router} from 'express';
import {createNote, getNotes, updateNote, deleteNote} from '../controllers/notes.controller.js';
import isAuthenticated from '../middlewares/auth.middleware.js';


const router = Router();


router.post('/notes', isAuthenticated, createNote);


router.get('/notes', isAuthenticated, getNotes);


router.put('/notes/:id', isAuthenticated, updateNote);


router.delete('/notes/:id', isAuthenticated, deleteNote);



export default router;