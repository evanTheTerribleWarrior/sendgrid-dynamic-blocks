import React from 'react';
import MainPage from './Components/MainPage/MainPage';
import Layout from './Components/Layout/Layout';
import SavedCollection from './Components/SavedCollection/SavedCollection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/build" element={<MainPage />} />
          <Route path="/update" element={<><div>Testing...</div></>} />
          <Route path="/collection" element={<SavedCollection />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
