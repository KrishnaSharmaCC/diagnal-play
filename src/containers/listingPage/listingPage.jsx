import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/card/card';
import { ASSETS_PREFIX } from '../../constants';
import { fetchMoreItems } from '../../utils/fetchUtil';
import './listingPage.scss';

const ListingPage = (props) => {
  const items = useSelector((reducers) => reducers.reducer1?.['assets']);
  const dispatch = useDispatch();
  const [page, setCurrentPage] = useState(1);
  useEffect(() => {
    fetchMovieList(page);
  }, [page]);

  const fetchMovieList = async (_page) => {
    const movies = await fetchMoreItems(_page);
    const title = movies?.title;
    const page_size_request = movies?.['page-size-requested'];
    const page_size_rcvd = movies?.['page-size-returned'];
    const total = movies?.['total-content-items'];
    if (movies) {
      // setItems(movies?.['content-items']?.content);
      dispatch({
        type: 'FEED_ITEMS',
        data: {
          currentPage: _page,
          total: total,
          list: movies?.['content-items']?.content,
          searchText: title,
        },
      });
    }
  };

  return (
    <div className="listingPage">
      {!!items.list?.length && (
        <InfiniteScroll
          dataLength={items.list?.length} //This is important field to render the next data
          next={() => page + 1 < 4 && setCurrentPage((p) => p + 1)}
          hasMore={+items.total > items.list.length}
          scrollableTarget="scrollable"
        >
          <div
            className="listings"
            id="scrollable"
            style={{ height: 'calc(100vh - 140px)', overflow: 'auto' }}
          >
            {items.list.map((item, i) => (
              <Card
                imgUrl={`${ASSETS_PREFIX}/slices/${item['poster-image']}`}
                name={item.name}
                key={i}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};
export default ListingPage;
