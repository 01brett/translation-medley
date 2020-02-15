import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { getDiffPassage } from '../actions/actions';
import Swapper from './Swapper';

const Search = props => {
  const { isToggled, passage } = useSelector(
    state => ({
      isToggled: state.isToggled,
      passage: state.passage
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const initQuery = {
    book: 'Matthew',
    chapter: '7',
    verseRange: '1-9'
  };

  const [query, setQuery] = useState({
    book: 'Matthew',
    chapter: '7',
    verseRange: '1-9'
  });

  const [input, setInput] = useState('');
  const handleInput = e => {
    setInput(e.target.value);
  };

  const [bible, setBible] = useState('ESV');

  const handleSubmit = query => {
    dispatch(getDiffPassage({ bible: bible, ...query }));
    setQuery(initQuery);
    setInput('');
  };

  // console.log('query •••', query);
  return (
    <div className="search">
      <div className="box">
        <input
          type="text"
          id="search"
          name="search"
          value={input}
          onChange={handleInput}
        />
      </div>
      <Swapper
        query={query}
        bible={bible}
        setBible={setBible}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Search;
