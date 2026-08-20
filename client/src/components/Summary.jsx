import React from 'react';

const Summary = ({ data }) => {
    const { filename, probability, prediction } = data;
    const isDefective = prediction === 'DEFECTIVE';

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    <span className="mr-2">📄</span> File
                </h3>
                <div className="text-xl font-bold break-all">{filename || '-'}</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    <span className="mr-2"></span> Defect Probability
                </h3>
                <div className="text-2xl font-bold mb-3">{probability}%</div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(100, probability)}%` }}
                    ></div>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    <span className="mr-2"></span> Prediction
                </h3>
                <div className={`text-xl font-bold ${isDefective ? 'text-red-600' : 'text-green-600'}`}>
                    {prediction || '-'}
                </div>
            </div>
        </div>
    );
};

export default Summary;