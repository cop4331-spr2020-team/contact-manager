import React from 'react';
import AppNavbar from './components/AppNavbar';
import ContactList from './components/ContactList';
import ItemModal from './components/ItemModal';
import SearchBar from './components/SearchBar';
import { Container } from 'reactstrap';

// Redux dependencies
import { Provider } from 'react-redux';
import store from './store';

// ReactStrap dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <AppNavbar />
      <Container
      style={{border: '2px solid red'}}>
        <SearchBar />
        <ItemModal />
        <ContactList />
      </Container>
    </div>
    </Provider>
  );
}

export default App;
