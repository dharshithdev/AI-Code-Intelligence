import React from 'react';

const Health = ({ data }) => {
    const { metrics } = data;
    
    // Calculate health scores using the formulas from your script
    const calculateHealth = (metricsData) => {
        // Complexity score: (wmc + loopQty + comparisonsQty) * 2, capped at 100
        const complexityScore = Math.min(
            (Number(metricsData.wmc || 0) + 
             Number(metricsData.loopQty || 0) + 
             Number(metricsData.comparisonsQty || 0)) * 2,
            100
        );
        
        // Size score: loc / 10, capped at 100
        const sizeScore = Math.min(
            Number(metricsData.loc || 0) / 10,
            100
        );
        
        // Coupling score: cbo * 2, capped at 100
        const couplingScore = Math.min(
            Number(metricsData.cbo || 0) * 2,
            100
        );
        
        // Nesting score: maxNestedBlocks * 5, capped at 100
        const nestingScore = Math.min(
            Number(metricsData.maxNestedBlocks || 0) * 5,
            100
        );
        
        return {
            complexity: Math.max(0, Math.round(100 - complexityScore)),
            size: Math.max(0, Math.round(100 - sizeScore)),
            coupling: Math.max(0, Math.round(100 - couplingScore)),
            nesting: Math.max(0, Math.round(100 - nestingScore))
        };
    };

    const health = calculateHealth(metrics);
    
    // Calculate overall health score (average of all 4)
    const overallScore = Math.round(
        (health.complexity + health.size + health.coupling + health.nesting) / 4
    );

    const getHealthStatus = (score) => {
        if (score >= 80) return { label: 'Good', color: 'text-green-600', barColor: 'bg-green-500', cls: 'health-good' };
        if (score >= 60) return { label: 'Moderate', color: 'text-yellow-600', barColor: 'bg-yellow-500', cls: 'health-moderate' };
        return { label: 'Needs Attention', color: 'text-red-600', barColor: 'bg-red-500', cls: 'health-poor' };
    };

    const overallStatus = getHealthStatus(overallScore);

    // Health metrics with their raw values and health percentages
    const healthMetrics = [
        { 
            label: 'Complexity', 
            value: metrics.wmc || 0, 
            health: health.complexity,
            detail: `WMC: ${metrics.wmc || 0}, Loops: ${metrics.loopQty || 0}, Comparisons: ${metrics.comparisonsQty || 0}`
        },
        { 
            label: 'Code Size', 
            value: metrics.loc || 0, 
            health: health.size,
            detail: `Lines of Code: ${metrics.loc || 0}`
        },
        { 
            label: 'Coupling', 
            value: metrics.cbo || 0, 
            health: health.coupling,
            detail: `CBO: ${metrics.cbo || 0}`
        },
        { 
            label: 'Nesting', 
            value: metrics.maxNestedBlocks || 0, 
            health: health.nesting,
            detail: `Max Nested Blocks: ${metrics.maxNestedBlocks || 0}`
        },
    ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <span>1.</span> Code Health
            </h2>
            <p className="text-sm text-gray-500 mb-6">
                An overview of the structural characteristics of the analyzed code.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {healthMetrics.map((metric) => (
                    <div key={metric.label}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">{metric.label}</span>
                            <span className="font-medium">{metric.health}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-700 ${
                                    metric.health >= 80 ? 'bg-green-500' :
                                    metric.health >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${Math.min(100, metric.health)}%` }}
                            ></div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                            {metric.detail}
                        </div>
                    </div>
                ))}
            </div>

            {/* Overall Health Score */}
            <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20">
                        <svg className="w-20 h-20 transform -rotate-90">
                            <circle
                                className="text-gray-200"
                                strokeWidth="6"
                                stroke="currentColor"
                                fill="transparent"
                                r="34"
                                cx="40"
                                cy="40"
                            />
                            <circle
                                className={`${overallStatus.barColor} transition-all duration-700`}
                                strokeWidth="6"
                                strokeDasharray={2 * Math.PI * 34}
                                strokeDashoffset={2 * Math.PI * 34 * (1 - overallScore / 100)}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="34"
                                cx="40"
                                cy="40"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold">{overallScore}</span>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm font-medium">Overall Health</div>
                        <div className={`text-lg font-bold ${overallStatus.color}`}>
                            {overallStatus.label}
                        </div>
                        <div className="text-xs text-gray-500">
                            {overallScore >= 80 
                                ? 'Your code has relatively healthy structural characteristics.'
                                : overallScore >= 60
                                ? 'Your code is generally manageable, but some areas could be improved.'
                                : 'Several structural characteristics may make this code harder to maintain.'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Health;