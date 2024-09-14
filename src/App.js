// import React from 'react';
// import TodoList from './Components/TodoList';
// import { Container, Typography } from '@mui/material';

// const App = () => {
//   return (
//     <Container>
//       <Typography variant="h3" component="h1" align="center" gutterBottom>
//         Todo App
//       </Typography>
//       <TodoList />
//     </Container>
//   );
// };

// export default App;


// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import TodoList from './Components/TodoList';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <h1>Todo App</h1> */}
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
