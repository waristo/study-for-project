import React from 'react';
import { Route } from 'react-router-dom';
import Xsss from './Xsss';
import Home from './Home';

const App = () => {
  return (
    <div>
      <Route path="/" exact={true} component={Home} />
      <Route path="/xss" component={Xsss} />
    </div>
  );
};

export default App;