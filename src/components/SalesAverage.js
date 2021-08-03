import React from 'react';

function SalesAverage(props) {
  const higherSalesAvg = props.higherSalesAvg;
  const higherSalesCount = props.higherSalesCount;
  return (
    <div>
      <h1 style={{ paddingLeft: '20px', fontSize: '24px' }}>
        Top Performers ($800+ / Month)
      </h1>

      <div className='sales-section-top flex-space-between'>
        <h1>Number of Clients</h1>
        <h1>{higherSalesCount}</h1>
      </div>
      <div className='sales-section-bottom flex-space-between'>
        <h1>Average Monthly Sales</h1>
        <h1>{higherSalesAvg}</h1>
      </div>
    </div>
  );
}

export default SalesAverage;
