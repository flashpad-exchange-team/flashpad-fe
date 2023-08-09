
import { Header } from '@/layout/header/Header';
import LiquidityForm from '@/modules/LiquidityForm';
import { Logo } from '@/templates/Logo';
import Bg from 'public/assets/images/app-bg.png'; // Import your image


const Liquidity = () => {

    return <div style={{ backgroundImage: `url(${Bg.src})`, backgroundSize: 'cover' }}
        className=' min-h-[100vh]'
    >
        <Header logo={<Logo xl />} mode='app' />

        <LiquidityForm />
    </div>
}

export default Liquidity