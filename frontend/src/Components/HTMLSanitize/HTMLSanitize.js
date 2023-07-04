import React from 'react';
import dompurify from 'dompurify';

const HTMLSanitize = ({ html }) => {
    const sanitizedHTML = dompurify.sanitize(html, { USE_PROFILES: { html: true } });
    console.log(html)
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

export default HTMLSanitize;