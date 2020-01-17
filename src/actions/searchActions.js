import { fetchPassage, fetchESVPassage, fetchNETPassage } from './passageActions'

export const searchPassage = (bible, location) => dispatch => {
  switch (bible) {
    case 'NET':
      dispatch(
        fetchNETPassage(location)
      );
      break;
    case 'ESV':
      dispatch(
        fetchESVPassage(location)
      );
      break;
    default:
      dispatch(
        fetchPassage(bible, location)
      );
      break;
  }
}