import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

const TitleBar = () => {
  const { book, chapter, currentTranslation, translations } = useSelector(state => ({
    book: state.passage.book,
    chapter: state.passage.chapter,
    currentTranslation: state.passage.translation.shortName,
    translations: state.translations
  }), shallowEqual)
  return(
    <div className="title-bar">
      <h2>{book} {chapter} </h2>
      <select>
        {translations.map(el => (
          <option
            key={el.shortName}
            value={el.shortName}
            defaultValue={el.shortName === currentTranslation}
          >
            {el.longName} ({el.shortName})
          </option>
        ))}
      </select>
    </div>
  );
}


export default TitleBar