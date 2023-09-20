import BarLineChart from '@/icons/BarLineChart';
import Coin from '@/icons/Coin';
import PieChart from '@/icons/PieChart';
import React from 'react';

const NavAnalytics = () => {
  return (
    <div className="">
      <div>
        <div className="flex gap-8 items-center my-4 cursor-pointer">
          <BarLineChart />
          <div>Overview</div>
        </div>
        <div className="flex gap-8 items-center my-4 cursor-pointer">
          <Coin />
          <div className="-ml-[8px]">Tokens</div>
        </div>
        <div className="flex gap-8 items-center my-4 cursor-pointer">
          <PieChart />
          <div>Pairs</div>
        </div>
      </div>
      <div>
        <div>App</div>
        <div>Github</div>
        <div>Docs</div>
        <div>Discord</div>
        <div>Telegram</div>
        <div>Twitter</div>
      </div>
    </div>
  );
};
export default NavAnalytics;
