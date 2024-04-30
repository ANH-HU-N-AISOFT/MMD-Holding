import { Location } from 'react-router-dom';

export const getTabActiveWithLocation = (location: Location) => {
  const secondSlashIndex = location.pathname.indexOf('/', 1);
  if (secondSlashIndex !== -1) {
    return location.pathname.substring(0, secondSlashIndex);
  } else {
    return location.pathname;
  }
};
