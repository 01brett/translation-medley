import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import lookup from '../helpers/lookup';
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
    const filtered = books.filter(book =>
      book.toLowerCase().includes(typed.toLowerCase())
    );
    setFilteredResults(filtered);
    if (passage.book && passage.chapter && passage.verseRange)
      setTyped(`${passage.book} ${passage.chapter}:${passage.verseRange}`);
  }, [typed, passage]);

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
      (typed.length > 1 && !query.book && e.keyCode === 13) ||
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
    // User pressed enter key and query is all good
    if (query.book && query.chapter && e.keyCode === 13) {
      handleSearch();
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
      const ch = str.match(/[^\d\w]([1-9]\d{1,2}|[1-9])/i);
      const chap = ch ? ch[0].replace(/\s/, '') : '';
      const chapterList = Object.keys(lookup[query.book]);
      const vr = str.match(/^.*:(.*)$/i);
      const vers = vr ? vr[1].replace(/[^0-9-]*/g, '') : '';

      let queryStr;
      if (!ch || chap === '0') {
        queryStr = {
          ...query,
          chapter: '',
          verseRange: ''
        };
      } else {
        let chapt;

        if (chap && lookup[query.book].hasOwnProperty(chap)) {
          chapt = chap;
        } else {
          chapt = chapterList[chapterList.length - 1];
        }

        if (vers) {
          let vSplit = vers.split('-');
          let maxChVerse = lookup[query.book][chap];
          // console.log('maxChVerse ···', maxChVerse);
          // console.log('vSplit ···', vSplit);
          if (vSplit && vSplit[1] === undefined) {
            let onlyVerse;
            if (vSplit[0] > maxChVerse) {
              onlyVerse = maxChVerse;
            } else if (vSplit[0] < 1) {
              onlyVerse = '1';
            } else {
              onlyVerse = vSplit[0];
            }
            queryStr = {
              ...query,
              verseRange: onlyVerse
            };
          } else {
            let firstRange;
            let lastRange;

            if (vSplit[0] < 1 || vSplit[0] > maxChVerse) {
              firstRange = '1';
            } else {
              firstRange = vSplit[0];
            }

            if (vSplit[1] < 1 || vSplit[1] > maxChVerse) {
              lastRange = maxChVerse;
            } else {
              lastRange = vSplit[1];
            }

            queryStr = {
              ...query,
              verseRange: `${firstRange}-${lastRange}`
            };
          }
        } else {
          queryStr = {
            ...query,
            chapter: chapt,
            verseRange:
              query.book && ch && lookup[query.book].hasOwnProperty(chap)
                ? `1-${lookup[query.book][chap]}`
                : `1-${lookup[query.book][chapterList[chapterList.length - 1]]}`
          };
        }
      }
      setQuery(queryStr);
    }
  };

  // console.log('typed ···', typed);
  // console.log('query ···', query);

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
