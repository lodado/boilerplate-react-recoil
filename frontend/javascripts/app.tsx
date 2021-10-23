import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {Props} from '@Interface/index';

export default function App({} : Props ) : JSX.Element {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/main">main</Link>
              </li>
            </ul>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/main">
              <Users />
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  
  function Home() : JSX.Element {
    return <h2>Home</h2>;
  }
  
  function About() : JSX.Element  {
    return <h2>About</h2>;
  }
  
  function Users() : JSX.Element {
    return <h2>Users</h2>;
  }

  ReactDOM.render(
      <App />,
    document.getElementById('app')
  );
  