import { useState } from 'react';
import NavAnalytics from './components/NavAnalytics';
import TableAnalyticsOverview from './components/TableAnalyticsOverView';
import TableAnalyticsPair from './components/TableAnalyticsPair';
import TableAnalyticsToken from './components/TableAnalyticsToken';

const data = [1, 2, 3, 4, 5, 6];

const Analytics = () => {
  const [tab, setTab] = useState('overview');
  return (
    <div className="max-w-[1300px] w-full mx-auto bg-dark flex gap-10 p-4 my-4">
      <NavAnalytics tab={tab} setTab={setTab} />
      {tab === 'overview' && <TableAnalyticsOverview data={data} />}
      {tab === 'tokens' && <TableAnalyticsToken data={data} />}
      {tab === 'pairs' && <TableAnalyticsPair data={data} />}
    </div>
  );
};

export default Analytics;
