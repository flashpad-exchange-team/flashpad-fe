import BarLineChart from '@/icons/BarLineChart';
import Coin from '@/icons/Coin';
import PieChart from '@/icons/PieChart';
import React from 'react';

const NavAnalytics = ({ tab, setTab }: any) => {
  return (
    <div className="flex flex-col">
      <div>
        <div
          className="flex gap-4 items-center my-4 cursor-pointer"
          onClick={() => setTab('overview')}
        >
          <BarLineChart stroke={tab === 'overview' ? '#FFAF1D' : ''} />
          <div className={tab === 'overview' ? 'text-[#FFAF1D]' : ''}>
            Overview
          </div>
        </div>
        <div
          className="flex gap-4 items-center my-4 cursor-pointer"
          onClick={() => setTab('tokens')}
        >
          <Coin stroke={tab === 'tokens' ? '#FFAF1D' : ''} />
          <div
            className={`-ml-[8px] ${tab === 'tokens' ? 'text-[#FFAF1D]' : ''}`}
          >
            Tokens
          </div>
        </div>
        <div
          className="flex gap-4 items-center my-4 cursor-pointer"
          onClick={() => setTab('pairs')}
        >
          <PieChart stroke={tab === 'pairs' ? '#FFAF1D' : ''} />
          <div className={tab === 'pairs' ? 'text-[#FFAF1D]' : ''}>Pairs</div>
        </div>
      </div>
      <div className="flex flex-col mt-[200px]">
        <a className="cursor-pointer">App</a>
        <a className="cursor-pointer">Github</a>
        <a className="cursor-pointer">Docs</a>
        <a className="cursor-pointer">Discord</a>
        <a className="cursor-pointer">Telegram</a>
        <a className="cursor-pointer">Twitter</a>
      </div>
    </div>
  );
};
export default NavAnalytics;
