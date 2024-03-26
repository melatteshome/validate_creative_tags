// AdScriptComponent.js
import React, { useState, useEffect } from 'react';

// Function to fix the JSON formatting
function fixJSONFormat(jsonString) {
    // Replace line breaks and excessive whitespace with a single space
    const cleanString = jsonString.replace(/\s+/g, ' ');

    // Parse the cleaned string into an object
    const jsonObject = JSON.parse(cleanString);

    // Stringify the object with proper indentation
    const formattedJSON = JSON.stringify(jsonObject, null, 2);

    return formattedJSON;
}

const AdScriptComponent = () => {
    const [fixedScriptContent, setFixedScriptContent] = useState(null);

    useEffect(() => {
        fetch('./tag.json')
            .then(response => response.json())
            .then(data => {
                const formattedContent = fixJSONFormat(data);
                setFixedScriptContent(formattedContent);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return fixedScriptContent; // Return only the fixedScriptContent
};

export default AdScriptComponent;
