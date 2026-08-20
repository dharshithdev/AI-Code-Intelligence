import React, { useRef, useState } from 'react';

const Home = ({ file, fileName, isAnalyzing, onFileSelect, onAnalyze, onReset }) => {
    const fileInputRef = useRef(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileInputChange = (e) => {
        const selected = e.target.files?.[0];
        if (selected) {
            onFileSelect(selected);
        }
        e.target.value = '';
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile && (droppedFile.name.endsWith('.cpp') || 
                           droppedFile.name.endsWith('.cc') || 
                           droppedFile.name.endsWith('.cxx'))) {
            onFileSelect(droppedFile);
        } else {
            alert('Please upload a C++ source file (.cpp, .cc, .cxx)');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleRemoveFile = () => {
        onReset();
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // SVG Icons
    const FileCodeIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
        </svg>
    );

    const FolderOpenIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            <path d="M18 11v4"/>
            <path d="M14 13h4"/>
        </svg>
    );

    const UploadIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
    );

    const XIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
    );

    return (
        <div className="max-w-2xl mx-auto">
            <div
                className={`
                    glass rounded-3xl p-8 md:p-12 text-center border-2 transition-all
                    ${isDragOver ? 'border-primary bg-blue-50/50 scale-[1.01]' : 'border-gray-200 hover:border-primary/50'}
                    ${file ? 'border-green-400 bg-green-50/30' : ''}
                `}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-primary mb-6">
                    <FileCodeIcon />
                </div>

                <h2 className="text-2xl font-bold mb-2">
                    {file ? 'File Ready for Analysis' : 'Upload C++ Source Code'}
                </h2>
                <p className="text-gray-500 mb-6">
                    {file ? fileName : 'Drag & drop your file here or click to browse'}
                </p>

                <input
                    type="file"
                    ref={fileInputRef}
                    accept=".cpp,.cc,.cxx"
                    onChange={handleFileInputChange}
                    className="hidden"
                    id="fileInput"
                />

                {!file ? (
                    <button
                        onClick={handleBrowseClick}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                    >
                        <FolderOpenIcon />
                        Choose File
                    </button>
                ) : (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl">
                            <FileCodeIcon />
                            <span className="font-medium truncate max-w-[200px]">{fileName}</span>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleRemoveFile}
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                aria-label="Remove file"
                            >
                                <XIcon />
                            </button>
                            <button
                                onClick={onAnalyze}
                                disabled={isAnalyzing}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <UploadIcon />
                                {isAnalyzing ? 'Analyzing...' : 'Analyze Code'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {!file && (
                <p className="text-sm text-gray-400 text-center mt-4">
                    Supported formats: .cpp, .cc, .cxx
                </p>
            )}
        </div>
    );
};

export default Home;