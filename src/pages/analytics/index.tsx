import { NavAnalytics } from './components/NavAnalytics';
import TableAnalyticsOverview from './components/TableAnalyticsOverView';

const Analytics = () => {
  return (
    <div className="max-w-[1300px] w-full mx-auto bg-dark flex p-4">
      <NavAnalytics />
      <TableAnalyticsOverview data={[]} />
    </div>
  );
};

export default Analytics;
