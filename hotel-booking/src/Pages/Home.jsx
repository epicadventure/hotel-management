import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOfferSection from '../components/ExclusiveOfferSection'
import Testimonial from '../components/Testimonial'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <>
     <Hero /> 
     <FeaturedDestination />
     <ExclusiveOfferSection />
     <Testimonial/>
     <NewsLetter/>
    </>
  )
}

export default Home
