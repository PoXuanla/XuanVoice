import { Carousel } from 'react-responsive-carousel'
import Carousel1 from '../../static/CarouselImg/Carousel1.jpg'
import Carousel2 from '../../static/CarouselImg/Carousel2.jpg'
import Carousel3 from '../../static/CarouselImg/Carousel3.jpg'

const MainCarousel = () => {
  return (
    <Carousel autoPlay showThumbs={false} showStatus={false}>
      <div>
        <img style={{ width: '100%' }} alt='' src={Carousel1} />
      </div>
      <div>
        <img alt='' style={{ width: '100%' }} src={Carousel2} />
      </div>
      <div>
        <img alt='' style={{ width: '100%' }} src={Carousel3} />
      </div>
    </Carousel>
  )
}
export default MainCarousel
