import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Results from './components/Results';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import api from './api/api';

function App() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);

    const handleFileSelect = (selectedFile) => {
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setResult(null);
        }
    };

    const handleAnalyze = async () => {
        if (!file) return;

        setIsAnalyzing(true);
        setResult(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post('/analyze', formData);
            
            if (response) {
                setResult(response);
            }
        } catch (error) {
            console.error('Analysis failed:', error);
            alert('Failed to analyze code. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setFileName('');
        setResult(null);
        setIsAnalyzing(false);
    };

    const AppContent = () => (
        <>
            <Hero />
            <main className="flex-1 container mx-auto px-4 md:px-6 py-8 max-w-6xl">
                <Home
                    file={file}
                    fileName={fileName}
                    isAnalyzing={isAnalyzing}
                    onFileSelect={handleFileSelect}
                    onAnalyze={handleAnalyze}
                    onReset={handleReset}
                />

                {isAnalyzing && (
                    <div className="mt-8 text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                        <p className="mt-4 text-lg font-medium text-gray-700">
                            Analyzing your code...
                        </p>
                        <p className="text-sm text-gray-500">
                            This may take a few seconds
                        </p>
                    </div>
                )}

                {!isAnalyzing && result && <Results data={result} />}
            </main>
        </>
    );

    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
                <Header />
                <Routes>
                    <Route path="/" element={<AppContent />} />
                    <Route path="/analyzer" element={<AppContent />} />
                    <Route path="/about" element={<div className="flex-1 container mx-auto px-4 py-20">About Page</div>} />
                    <Route path="/login" element={<div className="flex-1 container mx-auto px-4 py-20">Login Page</div>} />
                    <Route path="/register" element={<div className="flex-1 container mx-auto px-4 py-20">Register Page</div>} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;