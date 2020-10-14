import React from 'react';
import { Provider } from 'react-redux';
import Layout from './containers/layout/layout';
import ListingPage from './containers/listingPage/listingPage';
import store from './redux/store';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Layout> 
          <ListingPage />
          </Layout>
      </div>
    </Provider>
  );
}

export default App;
