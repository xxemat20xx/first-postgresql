import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, deleteTodo, updateTodo } from '../store/todoSlice';

const TodoList = () => {
    const dispatch = useDispatch();
    const { todos, status, error } = useSelector((state) => state.todos);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTodos());
        }
    }, [status, dispatch]);

    const handleToggle = (id, completed, title, description) => {
        dispatch(updateTodo({ id, updates: { title, description, completed: !completed } }));
    };

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    };

    if (status === 'loading') return <div className="text-center py-10 text-gray-500">Loading your todos...</div>;
    if (status === 'failed') return <div className="text-center py-10 text-red-500">Error: {error}</div>;
    if (todos.length === 0) return <div className="text-center py-10 text-gray-400">No todos yet. Add one above!</div>;

    return (
        <ul className="space-y-3">
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                    <div className="flex-1 pr-4">
                        <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                            {todo.title}
                        </h3>
                        {todo.description && (
                            <p className={`text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                                {todo.description}
                            </p>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleToggle(todo.id, todo.completed, todo.title, todo.description)}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${todo.completed
                                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                                }`}
                        >
                            {todo.completed ? 'Undo' : 'Done'}
                        </button>
                        <button
                            onClick={() => handleDelete(todo.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;