import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
// import { Footer } from './Footer';
import { Hero } from './Hero';
import Bg from 'public/assets/images/landing-pg.png'; // Import your image

const Base = () => {
  return (
    <div className={`text-white-600 antialiased h-[100vh]`} style={{ backgroundImage: `url(${Bg.src})`, backgroundSize: 'cover' }}>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Hero />
    </div>
  )
}


export { Base };
