import React from 'react';

const Metrics = ({ data }) => {
    const { metrics } = data;
    
    // All metrics from your backend
    const allMetrics = [
        { label: 'WMC', value: metrics.wmc || 0, description: 'Weighted Methods per Class' },
        { label: 'LOC', value: metrics.loc || 0, description: 'Lines of Code' },
        { label: 'CBO', value: metrics.cbo || 0, description: 'Coupling Between Objects' },
        { label: 'Max Nested Blocks', value: metrics.maxNestedBlocks || 0, description: 'Maximum Nesting Depth' },
        { label: 'Loop Quantity', value: metrics.loopQty || 0, description: 'Number of Loops' },
        { label: 'Comparisons', value: metrics.comparisonsQty || 0, description: 'Number of Comparisons' },
        { label: 'Line Length (mean)', value: metrics.lineLengthMean?.toFixed(2) || 0, description: 'Average Line Length' },
        { label: 'Line Length (std)', value: metrics.lineLengthStd?.toFixed(2) || 0, description: 'Standard Deviation of Line Length' },
        { label: 'Comments', value: metrics.commentsQty || 0, description: 'Number of Comments' },
        { label: 'Blank Lines', value: metrics.blankLinesQty || 0, description: 'Number of Blank Lines' },
    ];

    // Calculate max value for scaling (use 100 as max for percentage)
    const getPercentage = (value, max = 100) => {
        return Math.min(100, (Number(value) / max) * 100);
    };

    // Get color based on value
    const getColor = (value, max = 100) => {
        const percent = getPercentage(value, max);
        if (percent <= 30) return 'bg-green-500';
        if (percent <= 60) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span>2.</span> Code Metrics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allMetrics.map((metric) => {
                    const value = Number(metric.value);
                    const max = metric.label.includes('Line Length') ? 100 : 
                               metric.label.includes('LOC') ? 500 :
                               metric.label.includes('WMC') ? 50 : 
                               metric.label.includes('CBO') ? 30 : 20;
                    const percentage = getPercentage(value, max);
                    const color = getColor(value, max);
                    
                    return (
                        <div key={metric.label} className="bg-gray-50 rounded-xl p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <div className="text-sm font-medium text-gray-700">{metric.label}</div>
                                    <div className="text-xs text-gray-400">{metric.description}</div>
                                </div>
                                <div className="text-lg font-bold text-gray-800">{value}</div>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-700 ${color}`}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Metrics;