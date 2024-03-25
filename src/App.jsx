import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import AdUnit from './components/ad_unit';
import adScriptContent from './docs/adScript'; // Importing the script content
import Home from './components/Home'; // Corrected import

function AdUnitIframe({ scriptContent }) {
  const iframeStyle = {
    width: '100%',
    height: '500px', // Adjust the height as needed
    border: 'none',
  };

  return (
    <iframe title="AdUnit Frame" style={iframeStyle}>
      <AdUnit scriptContent={scriptContent} />
    </iframe>
  );
}

function App() {
  return (
    <>
      <div className='absolute bottom-0 left-0'>
        <AdUnit className='mx-10' scriptContent={adScriptContent} /> 
      </div>
    </>
  );
}

export default App;
