import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import history from './history';
import store from './redux/store';
import { Provider } from 'react-redux';
import Loader from 'react-loader-spinner'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";
import PrivateRoute from './common/privateRoute';

import Index from './pages';
import Dashboard from './pages/auth/Dashboard';


export default function Routes() {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      demoAsyncCall().then(() => setLoading(false))
    });
  
    const demoAsyncCall = async () => {
      return new Promise((resolve) => setTimeout(() => resolve(), 3000));
    }
  
    if (loading) {
      // return null;
      return (
        <div style={{position: 'absolute', top: 'calc(50% - 40px)', right: 'calc(50%)'}}>
          <Loader
            type="Oval"
            color="#ff214f"
            height={40}
            width={40}
            timeout={3000}
          />
        </div>
      )
    }

    const persistor = persistStore(store);
  
    return (
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
              <Router history={history}>
                  <Switch>
                      <Route exact path="/" component={Index} />
                      <PrivateRoute exact={true} path="/dashboard" component={Dashboard} />
                  </Switch>
              </Router>
          </Provider>
        </PersistGate>
    )
}

if (document.getElementById('app')) {
    ReactDOM.render(<Routes />, document.getElementById('app'));
}