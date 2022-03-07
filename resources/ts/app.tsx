import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from './routes/Router';
import { store } from './store/store';
import '../css/app.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
