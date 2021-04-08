import React from 'react';
import PermanentDrawerLeft from './components/main/Main';
import { BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <Router>
      <PermanentDrawerLeft/>
    </Router> 
  );
}

export default App;
