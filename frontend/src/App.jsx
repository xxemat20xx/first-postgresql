import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📋 My Todo App</h1>
          <p className="text-gray-600">Stay organized with PostgreSQL & Redux</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <TodoForm />
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;