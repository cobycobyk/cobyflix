import React from 'react';
import Banner from '../../components/Nav/Banner';
import Nav from '../../components/Nav/Nav';
import './HomeScreen.css';

function HomeScreen() {
  return (
    <div className='homeScreen'>
      <Nav />
      <Banner />
      {/* row */}
    </div>
  )
}

export default HomeScreen