import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import lookup from '../helpers/lookup';
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

  const [typed, setTyped] = useState('');
  const [query, setQuery] = useState({
    book: '',
    chapter: '',
    verseRange: ''
  });

  const handleInput = e => {
    const str = e.target.value;
    setTyped(str);

    const bk = str.match(/(^.+)(?=\s\d)/i);
    const ch = str.match(/(?<=\s)\d+|\d+(?=:)/i);
    const vr = str.match(/(?<=:)(\d+-?\d+|\d+)/i);

    let queryStr;
    if (vr) {
      queryStr = {
        book: bk && bk[0],
        chapter: ch && ch[0],
        verseRange: vr && vr[0]
      };
    } else {
      queryStr = {
        book: bk && bk[0],
        chapter: ch && ch[0],
        verseRange: ''
      };
    }

    setQuery(queryStr);
  };

  const [bible, setBible] = useState(passage.bible || 'ESV');

  const handleSearch = () => {
    console.log('whole query •••', { bible: bible, ...query });
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
          onChange={handleInput}
        />
      </div>
      <div className="swapper">
        <Swapper bible={bible} setBible={setBible} />
        <button onClick={handleSearch} disabled={!query.book && !query.chapter}>
          Go
        </button>
      </div>
    </div>
  );
};

export default Search;
