import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../services/api';

// Async Thunks (API calls)
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await API.get('/todos');
    return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todoData) => {
    const response = await API.post('/todos', todoData);
    return response.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, updates }) => {
    const response = await API.put(`/todos/${id}`, updates);
    return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
    await API.delete(`/todos/${id}`);
    return id; // return the ID so we can remove it from state
});

// Initial State
const initialState = {
    todos: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// Slice
const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {}, // we don't need sync reducers, thunks handle it
    extraReducers: (builder) => {
        builder
            // Fetch Todos
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Add Todo
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            // Update Todo
            .addCase(updateTodo.fulfilled, (state, action) => {
                const updated = action.payload;
                const index = state.todos.findIndex((t) => t.id === updated.id);
                if (index !== -1) {
                    state.todos[index] = updated;
                }
            })
            // Delete Todo
            .addCase(deleteTodo.fulfilled, (state, action) => {
                const id = action.payload;
                state.todos = state.todos.filter((t) => t.id !== id);
            });
    },
});

export default todoSlice.reducer;