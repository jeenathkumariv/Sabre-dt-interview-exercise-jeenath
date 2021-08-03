import React, { useState, useMemo, useEffect } from 'react';
import Pagination from './Pagination';
import SalesIcon from '../assets/icons/salesicon.png';

let PageSize = 10;

function SalesDataTable(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSales, setPageSales] = useState(null);
  useEffect(() => {
    setCurrentPage(1);
  }, [props.reloadPagination]);
  const totalSales = props.totalValue;
  var iniPageSales = 0;

  const data = props.data;
  let firstPageData = [];
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const currentPageData = data.slice(firstPageIndex, lastPageIndex);
    setPageSales(
      currentPageData.reduce((acc, cur) => {
        return (acc += cur.sales);
      }, 0)
    );

    return currentPageData;
  }, [currentPage]);

  if (currentPage == 1) {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    firstPageData = data.slice(firstPageIndex, lastPageIndex);

    iniPageSales = firstPageData.reduce((acc, cur) => {
      return (acc += cur.sales);
    }, 0);
  }

  const tableHeader = ['NAME', 'COMPANY', 'MONTHLY SALES'];
  return (
    <div className='table-container'>
      <table className='sales-data-table'>
        <thead>
          <tr>
            {tableHeader.map((header, index) => {
              return (
                <th key={index} className='column pd-l-50'>
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {currentPage !== 1
            ? currentTableData.map((row) => {
                return (
                  <tr className='sales-data-table-row' key={row.id}>
                    <td className='pd-l-50'>{row.name}</td>
                    <td className='pd-l-50'>{row.company}</td>
                    <td className='number-value pd-r-20'>
                      {Math.round(row.sales) > 1000 ? (
                        <span>
                          <i>
                            <img
                              className='high-sales-icon'
                              src={SalesIcon}
                            ></img>
                          </i>
                          {Math.round(row.sales)}
                        </span>
                      ) : (
                        Math.round(row.sales)
                      )}
                    </td>
                  </tr>
                );
              })
            : firstPageData.map((row) => {
                return (
                  <tr className='sales-data-table-row' key={row.id}>
                    <td className='pd-l-50'>{row.name}</td>
                    <td className='pd-l-50'>{row.company}</td>
                    <td className='number-value pd-r-20'>
                      {Math.round(row.sales) > 1000 ? (
                        <span>
                          <i>
                            <img
                              className='high-sales-icon'
                              src={SalesIcon}
                            ></img>
                          </i>
                          {Math.round(row.sales)}
                        </span>
                      ) : (
                        Math.round(row.sales)
                      )}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      <div className='total-sales'>
        <div className='price-display'>
          <h1>Page Sales Subtotal </h1>
          <h1>
            {currentPage !== 1
              ? Math.round(pageSales)
              : Math.round(iniPageSales)}
          </h1>
        </div>
        <div className='price-display'>
          <h1>Total Sales</h1>
          <h1> {totalSales}</h1>
        </div>
      </div>
      <Pagination
        className='pagination-bar'
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default SalesDataTable;
