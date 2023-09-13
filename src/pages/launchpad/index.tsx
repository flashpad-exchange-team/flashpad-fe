import TableLaunchpad from './components/TableLaunchpad';
const data = [
  {
    token: 'Token A',
    incentivesToken: 'Token B',
    hardcap: true,
    wlState: true,
    totalRaise: 10000000,
    about: 0,
  },
  {
    token: 'Token A',
    incentivesToken: 'Token B',
    hardcap: true,
    wlState: true,
    totalRaise: 10000000,
    about: 0,
  },
  {
    token: 'Token A',
    incentivesToken: 'Token B',
    hardcap: true,
    wlState: false,
    totalRaise: 10000000,
    about: 0,
  },
  {
    token: 'Token A',
    incentivesToken: 'Token B',
    hardcap: false,
    wlState: false,
    totalRaise: 10000000,
    about: 0,
  },
  {
    token: 'Token A',
    incentivesToken: 'Token B',
    hardcap: false,
    wlState: false,
    totalRaise: 10000000,
    about: 0,
  },
];

const Launchpad = () => {
  return (
    <div className="max-w-[1096px] w-full mx-auto ">
      <TableLaunchpad data={data} />
    </div>
  );
};

export default Launchpad;
