import * as todoModel from '../models/todoModel.js';

export const create = async (req, res) => {
    try {
        const { title, description } = req.body;
        const todo = await todoModel.createTodo(title, description);
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAll = async (req, res) => {
    try {
        const todos = await todoModel.getAllTodos();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const todo = await todoModel.updateTodo(id, title, description, completed);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await todoModel.deleteTodo(id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getWithUsers = async (req, res) => {
    try {
        const todos = await todoModel.getTodosWithUsers();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};