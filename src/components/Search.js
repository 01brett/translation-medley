import React, { useState } from 'react';

import { searchPassage } from '../actions/searchActions';

export default function(){
  const [query, setQuery] = useState('');

  const handleChange = e => {
    e.preventDefault();
    setQuery(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    searchPassage();
    setQuery('');
  }
  
  return(
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        id='search'
        name='search'
        placeholder='Search a book of the Bible...'
        value={query}
        onChange={handleChange}
      />
      <select>
        <option>KJV</option>
      </select>
      <button>Go</button>
    </form>
  );
}