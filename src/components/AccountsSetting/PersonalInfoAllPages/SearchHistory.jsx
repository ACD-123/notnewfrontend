import React from 'react';
import SearchIcon from '../../../assets/Images/searchicon.png';
import { Link } from 'react-router-dom';

const SearchHistory = () => {
  // Example search history data (replace this with your actual data)
  const searchHistory = [
    { term: 'SportsShoes', alert: 'Email Alerts on' },
    { term: 'Running Gear', alert: 'Email Alerts off' },
    { term: 'Fitness Trackers', alert: 'Email Alerts on' },
    { term: 'Hoodies Men', alert: 'Email Alerts on' },
    { term: 'Watches For mens', alert: 'Email Alerts on' },
    { term: 'Mobile android Samsung S22 Ultra', alert: 'Email Alerts on' },
    { term: 'Fitness Trackers', alert: 'Email Alerts on' },
    { term: 'Machin- HKC Product k66', alert: 'Email Alerts on' },
  ];

  return (
    <section id='searchhistory'>
      <div className='row'>
        <div className='title-buton'>
          <div>
            <h3>Search History</h3>
            <p>{searchHistory.length} Searches</p>
          </div>
          <div>
            <button>Clear history</button>
          </div>
        </div>
      </div>
      <div className='row'>
        {searchHistory.map((item, index) => (
          <div className='historylist' key={index}>
            <div className='list-inline'>
              <div>
                <img src={SearchIcon} alt='Search Icon' />
              </div>
              <div>
               <Link to='/category'> <h4>{item.term}</h4></Link>
                <p>{item.alert}</p>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchHistory;
