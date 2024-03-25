import React from 'react';
import ReactDOM from 'react-dom';
import AdUnit from './ad_unit'; // Assuming AdUnit component is in the same directory

const AdUnitIframe = () => {
  const iframeStyle = {
    width: '100%',
    height: '500px', // Adjust the height as needed
    border: 'none',
  };

  return (
    <iframe title="AdUnit Frame" style={iframeStyle}>
      <AdUnit scriptContent={'/* Your script content here */'} />
    </iframe>
  );
};

ReactDOM.render(<AdUnitIframe />, document.getElementById('root'));
