import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
let t = 0;

const Sample = () => {
  const logCount = useSelector(st => st.reducer1.logCount);
  const dispatch = useDispatch();
  useEffect(() => {
    if (document.querySelector('.test')) {
      document.querySelector('.test').innerHTML = `Rendered: ${++t}`;
    }
  })
  
  return (
    <div className="container">
      <button onClick={() => dispatch({type: 'LOG', data: null})}>Click to increment</button>
      <p>{logCount}</p>
      <p className="test"></p>
    </div>
  );
}
export default Sample;