import React from 'react';
import loaderGif from '../assets/icons/loadinfo.gif';

function LoadingOverLay(props) {
  const { active } = props;

  return (
    <>
      {active ? (
        <div className='loader-overlay'>
          <img className='loader-gif' src={loaderGif} alt='loading...' />
        </div>
      ) : null}
    </>
  );
}

export default LoadingOverLay;
