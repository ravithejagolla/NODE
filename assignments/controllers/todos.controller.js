import { Todo } from "../models/todos.scham.js";

// Create a new todo (only for self)
export const createTodo = async (req, res) => {
    try {
        const todo = new Todo({
            ...req.body,
            user: req.user._id
        });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Fetch only the todos created by the logged-in user
export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user._id });
        res.status(200).json(todos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update only self-created todos
export const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete only self-created todos
export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Admin-Only Actions

// Fetch all todos in the database (Admin only)
export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete any todo (Admin only)
export const deleteAnyTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};