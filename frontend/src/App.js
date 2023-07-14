import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import DynamicBlockGenerator from './Components/DynamicBlockGenerator/DynamicBlockGenerator';
import Layout from './Components/Layout/Layout';
import TemplateUpdater from './Components/TemplateUpdater/TemplateUpdater';
import SavedCollection from './Components/SavedCollection/SavedCollection';
import Settings from './Components/Settings/Settings';
import ZipUploader from './Components/ZipUploader/ZipUploader';
import Auth from './Components/Auth/Auth';
import Login from './Components/Auth/Login/Login';

const App = () => {

  return(
    <Provider store={store}> 
        <Layout>
          <Routes>      
            <Route exact path="/build" element={<Auth><DynamicBlockGenerator/></Auth>} />
            <Route exact path="/update" element={<Auth><TemplateUpdater/></Auth>} />
            <Route exact path="/collection" element={<Auth><SavedCollection /></Auth>} />
            <Route exact path="/upload" element={<Auth><ZipUploader /></Auth>} />
            <Route exact path="/settings" element={<Auth><Settings /></Auth>} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<Login />} />
            <Route exact path="/index.html" element={<Login />} />
          </Routes>
        </Layout>
    </Provider>
  );
};

export default App;
