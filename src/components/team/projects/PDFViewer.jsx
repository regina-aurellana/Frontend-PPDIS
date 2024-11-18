import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import "../../../styles/Styles.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const PDFViewer = ({ url }) => {
    return (
        <div style={{ height: '50vh', marginBottom: 100 }} className="pdf-container">
            <iframe
                title="PDF Viewer"
                src={url}
                style={{ width: '100%', height: '100%' }}
                frameBorder="0"
            />
        </div>
    );
};

export default PDFViewer;
