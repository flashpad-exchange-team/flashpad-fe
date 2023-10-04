import { IMerlinPoolSettings } from '@/utils/merlinPoolContract';

export default interface MerlinPoolDetailProps {
  tvl: string;
  apr: string;
  // token1?: string;
  // token2?: string;
  // token1Logo?: string;
  // token2Logo?: string;
  rewardsToken1Info: any;
  rewardsToken2Info: any;
  rewardsToken1Symbol: string;
  rewardsToken2Symbol: string;
  rewardsToken1Decimals: number;
  rewardsToken2Decimals: number;
  // rewardsToken1Logo?: string;
  // rewardsToken2Logo?: string;
  totalDeposited: string;
  settings: IMerlinPoolSettings;
}
