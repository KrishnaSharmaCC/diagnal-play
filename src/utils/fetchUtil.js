import { API_ENDPOINT } from '../constants';

export const fetchMoreItems = (_page = 1) => {
  // Could be replaced by a API endpoint..
  return fetchUtil(`${API_ENDPOINT}/diagnal-list-${_page}.json`).then(res => res?.page);
}

const fetchUtil = (url, otherOptions) => {
  return fetch(url, otherOptions).then(res => res.json());
}