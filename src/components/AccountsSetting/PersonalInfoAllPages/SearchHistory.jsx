import React, { useState } from 'react';
import SearchIcon from '../../../assets/Images/searchicon.png';
import { Link } from 'react-router-dom';

const SearchHistory = () => {
  // Example search history data (replace this with your actual data)
  const initialSearchHistory = [
    { term: 'SportsShoes', alert: 'Email Alerts on' },
    { term: 'Running Gear', alert: 'Email Alerts off' },
    { term: 'Fitness Trackers', alert: 'Email Alerts on' },
    { term: 'Hoodies Men', alert: 'Email Alerts on' },
    { term: 'Watches For mens', alert: 'Email Alerts on' },
    { term: 'Mobile android Samsung S22 Ultra', alert: 'Email Alerts on' },
    { term: 'Fitness Trackers', alert: 'Email Alerts on' },
    { term: 'Machin- HKC Product k66', alert: 'Email Alerts on' },
  ];

  const [searchHistory, setSearchHistory] = useState(initialSearchHistory);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelect = (index) => {
    const selectedIndex = selectedItems.indexOf(index);
    let newSelectedItems = [...selectedItems];

    if (selectedIndex === -1) {
      newSelectedItems = [...selectedItems, index];
    } else {
      newSelectedItems.splice(selectedIndex, 1);
    }

    setSelectedItems(newSelectedItems);
  };

  const clearSelected = () => {
    const newHistory = searchHistory.filter((item, index) => !selectedItems.includes(index));
    setSearchHistory(newHistory);
    setSelectedItems([]);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    setSelectedItems([]);
  };

  return (
    <section id='searchhistory'>
      <div className='row'>
        <div className='title-buton'>
          <div>
            <h3>Search History</h3>
            <p>{searchHistory.length} Searches</p>
          </div>
          <div>
            <button onClick={clearSelected} disabled={selectedItems.length === 0}>
              Delete selected
            </button>
            <button onClick={clearHistory}>Clear history</button>
          </div>
        </div>
      </div>
      <div className='row'>
        {searchHistory.map((item, index) => (
          <div className='historylist' key={index}>
            <div className='list-inline'>
              <div>
                <input
                  type='checkbox'
                  checked={selectedItems.includes(index)}
                  onChange={() => toggleSelect(index)}
                />
              </div>
              <div>
                <img src={SearchIcon} alt='Search Icon' />
              </div>
              <div>
                <Link to='/category'>
                  <h4>{item.term}</h4>
                </Link>
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
