import React, { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/card/card';
import { ASSETS_PREFIX } from '../../constants';
import { fetchMoreItems } from '../../utils/fetchUtil';
import './listingPage.scss';

const ListingPage = () => {
  // !TODO: - Fix font,
  // !TODO: - Check font sizes,
  // !TODO: - Check virtual loading,
  // !TODO: - Check layout,
  // !TODO: - Add comments,
  // !TODO: - Remove comments,
  // !TODO: - Remove unused CSS,
  // !TODO: - Fix reducer name,
  // !TODO: - Remove first counter page,

  const assets = useSelector(({ reducer1 }) => reducer1?.['assets']);
  const dispatch = useDispatch();
  const [page, setCurrentPage] = useState(1);
  const searchKey = useSelector(({ reducer1 }) => reducer1?.searchText);

  // Fetch the movies list for the first load..
  useEffect(() => {
    fetchMovieList(page);
  }, []);

  // Filter results for subsequent searches (whenever the search key changes)...
  useEffect(() => {
    if (searchKey) {
      // If search key present, update redux state containing only search results from all the list..
      filterAndDispatchIfSearching(assets?.list);
    }
  }, [searchKey]);

  /**
   * @description: Fetch movie lists using pages.
   * @param _page: page number to be fetched.
   * */
  const fetchMovieList = async (_page) => {
    const movies = await fetchMoreItems(_page);
    const title = movies?.title;
    // const page_size_request = movies?.['page-size-requested'];
    // const page_size_rcvd = movies?.['page-size-returned'];
    const total = movies?.['total-content-items'];
    if (movies) {
      const newList = movies?.['content-items']?.content;
      if (searchKey) {
        // If search key present, update redux state containing only search results..
        filterAndDispatchIfSearching([...assets.list, ...newList]);
      }
      // Update redux state containing actual all the results..
      dispatch({
        type: 'FEED_ITEMS',
        data: {
          currentPage: _page,
          total: total,
          list: newList,
          currentPageTitle: title,
        },
      });
    }
  };

  /**
   * @description: Filter the results based on the search query and store into redux state..
   * @param _arr: Actual array to be iterated on to find the results..
   * */
  const filterAndDispatchIfSearching = (_arr) => {
    const filteredData = filterList(_arr, searchKey);
    dispatch({
      type: 'SEARCH_RESULTS',
      data: {
        currentPage: page,
        searchResults: filteredData,
      },
    });
  };

  /**
   * @description: Filter the results based on the search query and return a new array..
   * @param _arr: Actual array to be iterated on to find the results..
   * @param _searchKey: Search key represented the search string
   * */
  const filterList = (_arr, _searchKey) => {
    return _arr?.filter((item) =>
      String(item.name).toLowerCase().includes(String(_searchKey).toLowerCase())
    );
  };

  // Actual iterable to be rendered on to the UI.
  const iterableItems = useMemo(() => {
    /* Re-assigning iterable is an expensive op, so we do it only when the searchKey changes and not on every render. */
    return assets?.[searchKey ? 'searchResults' : 'list'];
  }, [assets?.searchResults, assets?.list, searchKey]);

  return (
    <div className="listingPage">
      {!!iterableItems?.length ? (
        <InfiniteScroll
          dataLength={iterableItems?.length}
          next={() => {
            if (page + 1 < 4) {
              setCurrentPage((p) => p + 1);
              fetchMovieList(page + 1);
            }
          }}
          // Will be true when search key is present so that user can keep
          // scrolling for more data..
          hasMore={searchKey ? true : +assets.total > assets.list.length}
          scrollableTarget="scrollable"
        >
          <div
            className="listings"
            id="scrollable"
            // Height is the total height - navbar/search bar height..
            style={{ height: 'calc(100vh - 140px)', overflow: 'auto' }}
          >
            {iterableItems?.map((item, i) => (
              <Card
                imgUrl={`${ASSETS_PREFIX}/slices/${item['poster-image']}`}
                name={item.name}
                key={i}
              />
            ))}
          </div>
        </InfiniteScroll>
      ) : searchKey && <h1 className="noResults">No results found..</h1>}
    </div>
  );
};
export default ListingPage;
