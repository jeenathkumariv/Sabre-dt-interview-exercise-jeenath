import React, { useState, useEffect, useRef } from 'react';
import LoadingOverLay from './LoadingOverLay';
import RangeSlider from './RangeSlider';
import SalesAverage from './SalesAverage';
import SalesDataTable from './SalesDataTable';

function GlobalSales() {
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);
  const [totalSalesValue, setTotalSalesValue] = useState(0);
  const [higherSalesAvg, setHigherSalesAvg] = useState(0);
  const [higherSalesCount, setHigherSalesCount] = useState(0);
  const [searchValue, setSearchValue] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [isReloadPagination, setisReloadPagination] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch('./mock_data.json')
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setSalesData(data);
        getMinAndMaxSlider(data);

        setTotalSalesValue(
          Math.round(
            data.reduce((acc, curr) => {
              return (acc += curr.sales);
            }, 0)
          )
        );
        setIsLoading(false);
      })
      .catch(function (err) {
        console.log(err, ' error');
      });
  }, [reload]);

  const filterResults = function (val) {
    if (val) {
      setSearchValue(val);
    }
  };
  const getMinAndMaxSlider = function (arrayObj) {
    let lowest = Number.POSITIVE_INFINITY;
    let highest = Number.NEGATIVE_INFINITY;
    let tmp;
    for (let i = arrayObj.length - 1; i >= 0; i--) {
      tmp = arrayObj[i].sales;
      if (tmp < lowest) lowest = tmp;
      if (tmp > highest) highest = tmp;
    }

    const newArr = arrayObj.filter((arr) => arr.sales > 800);
    setHigherSalesCount(newArr.length);
    setHigherSalesAvg(
      Math.round(
        newArr.reduce((acc, cur) => {
          return (acc += cur.sales);
        }, 0) / newArr.length
      )
    );

    setMinVal(Math.round(lowest));
    setMaxVal(Math.round(highest));
  };

  const handleFilter = function (event) {
    event.preventDefault();
    let newArr = [];
    debugger;
    if (searchValue > 0) {
      if (searchText) {
        newArr = salesData.filter(
          (arr) => arr.company == searchText && arr.sales > searchValue
        );
        setSalesData(newArr);
        setisReloadPagination(!isReloadPagination);
      } else {
        newArr = salesData.filter((arr) => arr.sales > searchValue);
        setSalesData(newArr);
        setisReloadPagination(!isReloadPagination);
      }
    } else {
      newArr = salesData.filter((arr) => arr.company == searchText);
      setSalesData(newArr);
      setisReloadPagination(!isReloadPagination);
    }
  };

  const reloadData = function () {
    setIsLoading(true);
    setReload(!reload);
  };
  if (isLoading) {
    return <LoadingOverLay active={isLoading} />;
  }
  return (
    <div className='container'>
      <div className='header'>
        <h1>Global Sales</h1>
      </div>
      <section className='search-section'>
        <form className='search-form' onSubmit={handleFilter}>
          <div className='form-control'>
            <input
              className='company-search'
              type='text'
              name='name'
              id='name'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <h1 className='slider-header'>Minimum sales ($)</h1>
            <RangeSlider
              minVal={minVal}
              maxVal={maxVal}
              value={searchValue}
              filterResults={filterResults}
              step={25}
            />
            <button className='btn-primary' onClick={handleFilter}>
              FILTER RESULTS
            </button>
          </div>
        </form>
      </section>
      <div className='header'>
        <h1>Sales Data</h1>
        <a className='refresh' onClick={reloadData}>
          REFRESH DATA
        </a>
      </div>
      <SalesDataTable
        data={salesData}
        totalValue={totalSalesValue}
        reloadPagination={isReloadPagination}
      />

      <SalesAverage
        higherSalesAvg={higherSalesAvg}
        higherSalesCount={higherSalesCount}
      />
    </div>
  );
}

export default GlobalSales;
