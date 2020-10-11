import React from 'react';
import Card from '../../components/card/card';
import './listingPage.scss';
const ListingPage = (props) => {
  const items = [
  {imgUrl: 'picsum.photos/200/300', name: 'Movie-'}
]
  return (
    <div className="listingPage">
      <div className="listings">
        {new Array(20).fill('').map((item, i) => <Card imgUrl={`http://picsum.photos/200/300?p=${i}`} name={`Movie-${i + 1}`} key={i}/>)}
      </div>
    </div>
  )
}
export default ListingPage;