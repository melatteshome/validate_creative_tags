import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import AdUnit from './components/ad_unit';
import fixedScriptContent from './docs/adScript'; // Importing the script content


function App() {
  return (
    <>
      <div className='absolute bottom-0 left-0'>
        <AdUnit className='mx-10' scriptContent={fixedScriptContent} /> 
      </div>
    </>
  );
}

export default App;
