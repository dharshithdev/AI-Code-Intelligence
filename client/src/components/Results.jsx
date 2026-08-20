import React from 'react';
import Summary from './Summary';
import Health from './Health';
import Metrics from './Metrics';

const Results = ({ data }) => {
    return (
        <div className="mt-8 space-y-6 animate-fadeIn">
            <Summary data={data} />
            <Health data={data} />
            <Metrics data={data} />
        </div>
    );
};

export default Results;