import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

const TitleBar = () => {
  const { book, chapter, translation } = useSelector(state => ({
    book: state.passage.book,
    chapter: state.passage.chapter,
    translation: state.passage.translation
  }), shallowEqual)
  return(
    <>
      <h2>{book} {chapter} ({translation})</h2>
    </>
  );
}


export default TitleBar