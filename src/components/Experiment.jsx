import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import useStorage from '../hooks/useStorage';
import pdf from '../assets/Khambee Feedback PART II.pdf'

export const Experiment = () =>  {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
    const { fileLinks, loading } = useStorage(`Books/Khambee/summary`);

console.log(fileLinks[0]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
if (loading)
    return (
        <p className='text-5xl text-black w-[90%] flex justify-center items-center md:left-[40%] mx-auto h-[80dvh] align-middle'>
            Loading
        </p>
    );
  return (
      <div className='pdf-div overflow-scroll'>
          <p>
              Page {pageNumber} of {numPages}
          </p>
          <Document file={`${pdf}`} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.apply(null, Array(numPages))
                  .map((x, i) => i + 1)
                  .map((page) => (
                      <>
                          <Page
                              pageNumber={page}
                              renderTextLayer={false}
                              renderAnnotationLayer={false}
                          />
                      </>
                  ))}
          </Document>
      </div>
  );
}