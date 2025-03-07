import { Router } from "express";
import { isAuthenticated,isAdmin } from "../middlewares/auth.middleware.js";
import {createTodo,getTodos,updateTodo,deleteTodo,getAllTodos,deleteAnyTodo} from "../controllers/todos.controller.js";

const router = Router();

// User routes
router.post('/todos', isAuthenticated,createTodo);
router.get('/todos', isAuthenticated,getTodos);
router.put('/todos/:id', isAuthenticated,updateTodo);
router.delete('/todos/:id', isAuthenticated,deleteTodo);

// Admin routes
router.get('/admin/todos', isAdmin,getAllTodos);
router.delete('/admin/todos/:id',isAdmin,deleteAnyTodo);

