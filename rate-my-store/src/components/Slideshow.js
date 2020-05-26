import React from 'react';
import { Slide } from 'react-slideshow-image';

import page1Img from '../assets/shopping_experience.jpg';
import page2Img from '../assets/dining_experience..jpg';
import page3Img from '../assets/customer_experience.jpg';

const slideImages = [
  page1Img,
  page2Img,
  page3Img
];
 
const properties = {
  duration: 3000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,

}

export default function Slideshow() {

    return (  
      <div className="slide-container" id="slide-box">
        <Slide {...properties}>

          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
              <span>Help Us to Build an Awesome Customer Experience that You would Enjoy</span>
            </div>
          </div>

          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
              <span>Tell Us About Your Last Visit At Our Store</span>
            </div>
          </div>

          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
              <span>Win A Gift Voucher For Your Next Visit</span>
            </div>
          </div>
          
        </Slide>
      </div>
    )
}
