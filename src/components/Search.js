import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { fetchNewText } from '../actions/actions';

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
    verseRange: ''
  };

  const [query, setQuery] = useState({
    book: 'Matthew',
    chapter: '7',
    verseRange: ''
  });

  const [input, setInput] = useState('');
  const handleInput = e => {
    setInput(e.target.value);
  };

  const [bible, setBible] = useState('ESV');
  const handleBible = e => {
    e.preventDefault();
    setBible(e.target.value);
  };

  const handleSubmit = query => {
    dispatch(fetchNewText({ bible: bible, ...query }));
    setQuery(initQuery);
    setInput('');
  };

  console.log('query •••', query);
  return (
    <div className="search">
      <div className="box">
        <label htmlFor="search">Find</label>
        <input
          type="text"
          id="search"
          name="search"
          value={input}
          onChange={handleInput}
        />
        <Swapper
          query={query}
          bible={bible}
          handleBible={handleBible}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Search;

function Swapper({ query, bible, handleBible, handleSubmit }) {
  const { bibles } = useSelector(
    state => ({
      bibles: state.bibles
    }),
    shallowEqual
  );

  const handleClick = () => {
    handleSubmit({
      ...query,
      bible: bible
    });
  };

  return (
    <div className="swapper">
      <select onChange={handleBible} value={bible}>
        {bibles.map(bible => (
          <option key={bible.id} value={bible.id}>
            ({bible.id}) {bible.display}
          </option>
        ))}
      </select>

      <button onClick={handleClick} disabled={!query}>
        Go
      </button>
    </div>
  );
}
