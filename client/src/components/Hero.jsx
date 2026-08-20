import React from 'react';

const Hero = () => {
    return (
        <section className="text-center pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-6 md:pb-10 px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Analyze Your Code with{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    AI
                </span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
                Upload a C++ source file and let our machine learning model
                analyze its code metrics and estimate the probability of defects.
            </p>
        </section>
    );
};

export default Hero;