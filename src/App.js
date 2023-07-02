import React from 'react';
import DynamicBlockGenerator from './Components/DynamicBlockGenerator/DynamicBlockGenerator';
import Layout from './Components/Layout/Layout';
import TemplateUpdater from './Components/TemplateUpdater/TemplateUpdater';
import SavedCollection from './Components/SavedCollection/SavedCollection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
          <Route exact path="/" element={<DynamicBlockGenerator/>} />
            <Route exact path="/build" element={<DynamicBlockGenerator/>} />
            <Route exact path="/update" element={<TemplateUpdater/>} />
            <Route exact path="/collection" element={<SavedCollection />} />
          </Routes>
        </Layout>
      </Router>
      </Provider>
  );
};

export default App;
