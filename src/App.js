// dependencies
import React from 'react';
import Home from './pages/Home';
import Header from './components/Header'
import { Routes, Route , BrowserRouter as Router} from 'react-router-dom';
import { AppContextProvider } from './AppContext';

// css
import './styles/App.css';

const App = (props) => {
  
  return (
    <AppContextProvider>
      <Router >  
          <Header />
          <Routes>
            <Route exact path="/" element={Home}/>
          </Routes>
      </Router>
      <Home />
    </AppContextProvider>
  );
};

export default App;
