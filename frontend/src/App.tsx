import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Wizard from './Wizard';

const App: React.FC = () => {
  return (
    <Router>
      <Wizard />
    </Router>
  );
};

export default App;
