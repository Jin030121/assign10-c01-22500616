import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

const initialTodos = [
    { id: 1, text: '리액트 컴포넌트 구조 공부하기', isComplete: false },
    { id: 2, text: '오픈소스 프로젝트 커스터마이징', isComplete: false },
    { id: 3, text: 'Vercel에 프로젝트 배포하기', isComplete: false },
];

function TodoList() {
    const [todos, setTodos] = useState([]);

    const LOCAL_STORAGE_KEY = "react-do-list-todos";

    useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

        if (storageTodos && storageTodos.length > 0) {
            setTodos(storageTodos);
        } else {
            setTodos(initialTodos);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
        console.log(...todos);
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    }

    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id);

        setTodos(removeArr);
    };

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo;
        })
        setTodos(updatedTodos);
    };

    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.isComplete));
    };

    return (
        <div className="todo-context">
            <h1>오늘 할 일 목록</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
            {todos.some(todo => todo.isComplete) && (
                <button className="clear-button" onClick={clearCompleted}>
                    완료된 항목 삭제
                </button>
            )}
        </div>
    );
}

export default TodoList;
