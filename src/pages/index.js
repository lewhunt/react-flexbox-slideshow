import React from 'react'
import { createGlobalStyle } from 'styled-components'

import Slideshow from '../components/Slideshow.js'

import IMAGE_1 from '../assets/winter-4551699_1920.jpg'
import IMAGE_2 from '../assets/snow-4668099_1920.jpg'
import IMAGE_3 from '../assets/panda-4418773_1920.jpg'
import IMAGE_4 from '../assets/snow-4066640_1920.jpg'
import IMAGE_5 from '../assets/nature-3437545_1920.jpg'
import IMAGE_6 from '../assets/mountain-hut-4664186_1920.jpg'
import IMAGE_7 from '../assets/hamburg-4667427_1920.jpg'

const GlobalStyle = createGlobalStyle`
    font: "open-sans", sans-serif;
    overflow: hidden;
    body {
      margin:0;
      padding:0;
      background:black;
    }
`
const IndexPage = () => {
  return (
    <div>
    <GlobalStyle />
    <Slideshow>
      <img src={IMAGE_1} alt="image1" />
      <img src={IMAGE_2} alt="image2" />
      <img src={IMAGE_3} alt="image3" />
      <img src={IMAGE_4} alt="image4" />
      <img src={IMAGE_5} alt="image5" />
      <img src={IMAGE_6} alt="image6" />
      <img src={IMAGE_7} alt="image7" />
    </Slideshow>
  </div>
  )
}

export default IndexPage