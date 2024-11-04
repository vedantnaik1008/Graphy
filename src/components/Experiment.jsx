import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import useStorage from '../hooks/useStorage';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// import pdf from '../assets/Khambee Feedback PART II.pdf'

export const Experiment = () => {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const { fileLinks, loading, pdf } = useStorage(`Books/Khambee/summary`);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
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
        <Viewer
            fileUrl={fileLinks[0]}
            plugins={[defaultLayoutPluginInstance]}
        />
    );
};
