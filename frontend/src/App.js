import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import DynamicBlockGenerator from './Components/DynamicBlockGenerator/DynamicBlockGenerator';
import Layout from './Components/Layout/Layout';
import TemplateUpdater from './Components/TemplateUpdater/TemplateUpdater';
import SavedCollection from './Components/SavedCollection/SavedCollection';
import Settings from './Components/Settings/Settings';
import ZipUploader from './Components/ZipUploader/ZipUploader';
import Login from './Components/Login/Login';




const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/" element={<DynamicBlockGenerator/>} />
            <Route exact path="/build" element={<DynamicBlockGenerator/>} />
            <Route exact path="/update" element={<TemplateUpdater/>} />
            <Route exact path="/collection" element={<SavedCollection />} />
            <Route exact path="/upload" element={<ZipUploader />} />
            <Route exact path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
      </Provider>
  );
};

export default App;
