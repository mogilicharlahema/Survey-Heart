// src/Components/TodoList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, deleteTodo, editTodo } from '../slices/todosSlice';
import { CircularProgress, List, ListItem, ListItemText, IconButton, TextField, Button, Typography, Container, Paper, Divider, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Alert } from '@mui/material';

const TodoList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.todos);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const filteredTodos = items.filter((todo) => 
    todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newId = items.length ? items[items.length - 1].id + 1 : 1;
      dispatch(addTodo({ id: newId, todo: newTodo }));
      setNewTodo('');
      setSnackbarMessage('Todo added successfully!');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
    setSnackbarMessage('Todo deleted successfully!');
    setSnackbarOpen(true);
  };

  const handleEditTodo = (id, todoText) => {
    setEditingTodoId(id);
    setEditingTodoText(todoText);
  };

  const handleSaveEdit = () => {
    if (editingTodoText.trim()) {
      dispatch(editTodo({ id: editingTodoId, updatedTodo: editingTodoText }));
      setEditingTodoId(null);
      setEditingTodoText('');
      setSnackbarMessage('Todo updated successfully!');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container 
      component="main" 
      maxWidth="md" 
      style={{ 
        padding: '20px', 
        backgroundColor: '#121212', // Dark background color
        minHeight: '100vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper style={{ 
        padding: '20px', 
        width: '100%', 
        maxWidth: '800px', 
        margin: 'auto',
        backgroundColor: '#1e1e1e', // Slightly lighter dark background for the Paper component
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', 
        color: '#e0e0e0' // Light text color for readability
      }}>
        <Typography variant="h3" style={{ color: '#BB86FC' }} gutterBottom align="center">Todo App</Typography>

        {/* Search Input */}
        <TextField
          label="Search Todos"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            marginBottom: '20px', 
            color: '#e0e0e0', // Text color for input
            backgroundColor: '#333', // Background color for input
          }}
          InputProps={{
            style: {
              color: '#e0e0e0', // Text color inside input
            },
          }}
          InputLabelProps={{
            style: {
              color: '#e0e0e0', // Label color
            },
          }}
        />

        {/* Add New Todo */}
        <TextField
          label="New Todo"
          variant="outlined"
          fullWidth
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{ 
            marginBottom: '20px', 
            color: '#e0e0e0',
            backgroundColor: '#333',
          }}
          InputProps={{
            style: {
              color: '#e0e0e0',
            },
          }}
          InputLabelProps={{
            style: {
              color: '#e0e0e0',
            },
          }}
        />
        <Button variant="contained" color="primary" onClick={handleAddTodo}>
          Add Todo
        </Button>

        <Divider style={{ margin: '20px 0', backgroundColor: '#444' }} />

        <List>
          {filteredTodos.map((todo) => (
            <ListItem key={todo.id} divider style={{ backgroundColor: '#1e1e1e' }}>
              {editingTodoId === todo.id ? (
                <>
                  <TextField
                    value={editingTodoText}
                    onChange={(e) => setEditingTodoText(e.target.value)}
                    variant="outlined"
                    fullWidth
                    style={{ marginRight: '10px', color: '#e0e0e0', backgroundColor: '#333' }}
                    InputProps={{
                      style: {
                        color: '#e0e0e0',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: '#e0e0e0',
                      },
                    }}
                  />
                  <Button variant="contained" color="secondary" onClick={handleSaveEdit}>
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <ListItemText primary={todo.id} style={{ color: '#e0e0e0' }} />
                  <ListItemText primary={todo.todo} style={{ color: '#e0e0e0' }} />
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditTodo(todo.id, todo.todo)}>
                    <EditIcon style={{ color: '#e0e0e0' }} />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(todo.id)}>
                    <DeleteIcon style={{ color: '#e0e0e0' }} />
                  </IconButton>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Snackbar for Notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TodoList;
