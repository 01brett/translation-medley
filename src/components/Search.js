import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { changeBible } from '../actions/actions';
import BibleSwapper from './BibleSwapper';

const Search = props => {
  const { isToggled, passage } = useSelector(
    state => ({
      isToggled: state.isToggled,
      passage: state.passage
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const [query, setQuery] = useState({});
  const [input, setInput] = useState('');

  const handleChanges = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // dispatch(addSmurf(formData));
    // setFormData(initForm);
  };

  return (
    <div className="search">
      <div className="box">
        <label htmlFor="search">Find</label>
        <input
          type="text"
          id="search"
          name="search"
          value={input}
          onChange={handleChanges}
        />
      </div>
      <BibleSwapper
        isBadQuery={true}
        buttonText="Go"
        buttonOnClick={handleSubmit}
      />
    </div>
  );
};

export default Search;
