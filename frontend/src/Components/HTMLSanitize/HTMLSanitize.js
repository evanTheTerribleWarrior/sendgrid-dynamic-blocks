import React from 'react';
import dompurify from 'dompurify';

const HTMLSanitize = ({ html, trusted }) => {
    const sanitizedHTML = trusted ? html : dompurify.sanitize(html, { USE_PROFILES: { html: true } });
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

export default HTMLSanitize;