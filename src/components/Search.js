import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import lookup from '../helpers/lookup';
import search from '../helpers/search';
import books from '../helpers/books';
import { getDiffPassage, hideVerseControls } from '../actions/actions';
import Swapper from './Swapper';

const Search = () => {
  const { isToggled, passage } = useSelector(
    state => ({
      isToggled: state.isToggled,
      passage: state.passage
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const [showFlyout, setShowFlyout] = useState(false);

  const [typed, setTyped] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [activeFlyout, setActiveFlyout] = useState(0);

  useEffect(() => {
    // const typedBook = typed.length > 0 && typed.match(/(^.+)(?=\s\d)/i);
    const filtered = books.filter(book =>
      book.toLowerCase().includes(typed.toLowerCase())
    );
    setFilteredResults(filtered);
  }, [typed]);

  const initQ = {
    book: '',
    chapter: '',
    verseRange: ''
  };
  const [query, setQuery] = useState(initQ);

  const handleKeyDown = e => {
    if (typed.length > 1 && !query.book) setShowFlyout(true);
    // User pressed the enter key or right arrow, update the input
    // and close the suggestions
    if (
      (!query.book && e.keyCode === 13) ||
      (!query.book && e.keyCode === 39)
    ) {
      setTyped(filteredResults[activeFlyout] + ' ');
      setActiveFlyout(0);
      setQuery({
        ...query,
        book: filteredResults[activeFlyout]
      });
      setShowFlyout(false);
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeFlyout === 0) {
        return;
      }
      setActiveFlyout(prev => prev - 1);
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeFlyout === filteredResults.length - 1) {
        return;
      }
      setActiveFlyout(prev => prev + 1);
    }
  };

  // TODO: still not working right
  const handleClick = e => {
    if (!query.book) {
      setTyped(e.target.textContent + ' ');
      setQuery({
        ...query,
        book: e.target.textContent
      });
      setActiveFlyout(0);
      setShowFlyout(false);
      document.querySelector('#search').focus();
    }
  };

  const handleChange = e => {
    const str = e.target.value;
    setTyped(str);

    const bk = str.match(/(^.+)(?=\s|\s\d)|(^.+)/i);

    if (str.length < 2) {
      setQuery(initQ);
      setShowFlyout(false);
    } else if (bk && bk[0] !== query.book) {
      setQuery(initQ);
      setShowFlyout(true);
    } else {
      const ch = str.match(/(?<=\s)\d+|\d+(?=:)/i);
      // const vr = str.match(/(?<=:)(\d+-?\d+|\d+)/i);

      let queryStr;
      // if (vr) {
      //   queryStr = {
      //     ...query,
      //     chapter: ch ? ch[0] : '',
      //     verseRange: vr && vr[0]
      //   };
      // } else {
      queryStr = {
        ...query,
        chapter: ch ? ch[0] : '',
        verseRange: query.book && ch ? `1-${lookup[query.book][ch[0]]}` : ''
      };
      // }

      setQuery(queryStr);
    }
  };

  const [bible, setBible] = useState(passage.bible || 'ESV');

  const handleSearch = () => {
    console.log('search query ···', { bible: bible, ...query });
    setShowFlyout(false);
    isToggled && dispatch(hideVerseControls());
    dispatch(getDiffPassage({ bible: bible, ...query }));
  };

  return (
    <div className="search">
      <div className="box">
        <input
          type="text"
          id="search"
          name="search"
          value={typed}
          // onFocus={() => setShowFlyout(true)}
          // onBlur={() => setShowFlyout(false)}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
        {showFlyout && !query.book && (
          <div className="flyout">
            {filteredResults.length > 0 ? (
              filteredResults.map((el, idx) => (
                <div
                  onClick={handleClick}
                  className={activeFlyout === idx ? 'dd active' : 'dd'}
                  key={idx}
                >
                  <p>{el}</p>
                </div>
              ))
            ) : (
              <div className="dd disabled">
                <p>No matches. Did you spell everything correctly?</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="swapper">
        <Swapper bible={bible} setBible={setBible} />
        <button onClick={handleSearch} disabled={!query.chapter}>
          Go
        </button>
      </div>
    </div>
  );
};

export default Search;
