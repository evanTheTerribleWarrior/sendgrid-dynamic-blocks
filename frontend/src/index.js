import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getSegmentWriteKey } from './Utils/functions';
import store from './Redux/store';
import { AnalyticsBrowser } from '@segment/analytics-next';
import { HashRouter } from "react-router-dom";
window.onbeforeunload = () => { return "" };

const key = ""//await getSegmentWriteKey()
export const analytics = AnalyticsBrowser.load({ writeKey: key })
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
    
  </React.StrictMode>
);

const segmentWebVitals = store.getState().segmentWebVitals.segmentWebVitals;
    
const sendToSegment = (metrics) => {
  if (analytics){
    analytics.track('Sendgrid Dynamic Blocks - App Performance', metrics)
  }  
}
      
reportWebVitals(segmentWebVitals ? sendToSegment : "");
