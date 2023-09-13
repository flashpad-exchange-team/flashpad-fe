import { Button } from '@/components/button/Button';
import ArrowLeft from '@/icons/ArrowLeft';
import ArrowRight from '@/icons/ArrowRight';
import BNBICon from '@/icons/BNBIcon';
import Bank from '@/icons/Bank';
import ChartLine from '@/icons/ChartLine';
import Coin from '@/icons/Coin';
import Error from '@/icons/Error';
import Safe from '@/icons/Safe';
import TokenMinter from '@/icons/TokenMinter';
import Wallet from '@/icons/Wallet';
import Image from 'next/image';
import launchpadlanding from 'public/assets/images/launchpadlanding.png';

const Launchpad = () => {
  return (
    <div className="max-w-[1096px] w-full mx-auto p-6 md:p-0">
      <header className="text-[#ffaf1d] text-[36px] mt-20 font-bold">
        Rodeo auction
      </header>
      <div className="text-[#FCFCFD] text-[16px]">
        Rodeo Finance is the largest platform of leveraged DeFi products on
        Arbitrum, allowing users to earn yield on a diverse range of managed and
        passive investment strategies. The protocol utilizes undercollateralized
        leverage to enable users to increase their positions in top-tier vaults
        and strategies, resulting in higher returns for both yield farmers and
        passive lenders.At its core, Rodeo has two sides: passive liquidity
        providers (lenders) earning high, yet safe APR by providing single
        assets for use by leverage farmers, and leverage farmers who borrow up
        to 10x to farm real yield strategies. By building additional DeFi
        products on top of the core leverage Farms, Rodeo aims to become
        Arbitrium's hub for maximizing yield. Enabling users and protocols to
        become more capital efficient, generate higher yields, and onboard the
        next generation of DeFi users through a simplified, composable solution
      </div>
      <Button
        className="justify-center my-8 h-[52px] text-[16px] px-[42px]"
        disabled
      >
        <ArrowLeft /> Back to Sales list
      </Button>
      <Image alt="logo" src={launchpadlanding.src} width={1096} height={740} />
      <div className="text-[#FCFCFD] text-[16px] mt-8">
        Disclaimer: The $RDO token is not intended to constitute securities in
        any jurisdiction. This announcement is not an invitation to invest in
        securities or solicitations thereof in any jurisdiction. Please do your
        own due diligence.
      </div>
      <div className="text-[12px] py-3 px-4 border-b border-[#344054] text-left"></div>
      <div className="text-[#FCFCFD] text-[16px] mt-8">
        Please ensure you understand the public sale mechanics and terms before
        proceeding, deposited amounts CANNOT be withdrawn.Initially, the auction
        will start with a fully diluted valuation (FDV) of $830k, fixing a
        $0.0083 floor price for $RDO, and will increase after the first $100k
        have been raised. Once those $100k are reached, we'll enter a
        price-discovery phase, where the token price will continuously increase
        at every purchase.
      </div>

      <div className="text-[#FCFCFD] text-[16px] mt-2 flex">
        <div>
          <Error />
        </div>
        <div className="ml-2">
          No matter when you participate, everyone will get $RDO tokens at the
          same final price.
        </div>
      </div>
      <div className="text-[#FCFCFD] text-[16px] mt-2 flex">
        <div>
          <Error />
        </div>
        <div className="ml-2">
          Your allocation will be made up of $srRDO, a receipt token made up of
          30% $RDO and 70% $xRDO. $srRDO will be automatically converted to $RDO
          and $xRDO 24h after the claims open.
        </div>
      </div>

      <div className="w-full bg-[#150E3980] my-4 p-6">
        <div className="flex justify-around">
          <div>Whitelist stage</div>
          <div>
            <ArrowRight />
          </div>
          <div>Public stage</div>
          <div>
            <ArrowRight />
          </div>
          <div>End</div>
          <div>
            <ArrowRight />
          </div>
          <div className="text-[#FFAF1D]">Claims</div>
        </div>
        <div className="text-[12px] my-4 px-4 border-b border-[#344054] text-left"></div>
        <div className="text-[#FFAF1D] font-bold center flex justify-center">
          Public sale has ended - Contributions are now claimable
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full bg-[#150E3980] my-4 px-2 py-6">
          <div className="text-[#FFAF1D]">Claims</div>
          <div className="text-[12px] my-4 px-4 border-b border-[#344054] text-left"></div>
          <div className="flex text-[14px] font-bold gap-4 justify-center">
            <BNBICon size={40} />
            <div>
              <div className="">Token A - Token B</div>
              <div className="text-[#98A2B3]">Rising Token B</div>
            </div>
          </div>
          <div className="flex justify-between">
            <div>Contribution</div>
            <div>0 Token A</div>
          </div>
          <Button
            className="justify-center h-[52px] mt-4 w-full text-[16px] px-[42px]"
            disabled
          >
            Claim
          </Button>
        </div>
        <div className="w-full bg-[#150E3980] my-4 px-2 py-6">
          <div className="text-[#FFAF1D]">Summary</div>
          <div className="text-[12px] my-4 px-4 border-b border-[#344054] text-left"></div>
          <div className="mt-2 flex flex-wrap gap-12">
            <div className="flex w-full md:w-[250px]">
              <Bank />
              <div className="ml-2">
                <div className="text-[#98A2B3] text-[14px]">
                  Total raised / Hardcap
                </div>
                <div className="text-[14px]">1.061.115,56 / 1.200.000 USDC</div>
              </div>
            </div>
            <div className="flex w-full md:w-[200px]">
              <Bank />
              <div className="ml-2">
                <div className="text-[#98A2B3] text-[14px]">Token B price</div>
                <div className="text-[14px]">$0,088</div>
              </div>
            </div>
            <div className="flex w-full md:w-[250px]">
              <TokenMinter />
              <div className="ml-2">
                <div className="text-[#98A2B3] text-[14px]">
                  Circ. marketcap
                </div>
                <div className="text-[14px]">FDV</div>
              </div>
            </div>
            <div className="flex w-full md:w-[200px]">
              <Safe />
              <div className="ml-2">
                <div className="text-[#98A2B3] text-[14px]">FDV</div>
                <div className="text-[14px]">$8,84M</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 my-5">
        <div className="w-full bg-[#150E3980] px-2 py-6">
          <div className="flex">
            <Coin />
            <div className="ml-2 font-bold text-[24px]">
              How price is determined
            </div>
          </div>
          <div className="text-[#98A2B3]">
            You can contribute with USDC in exchange for $srRDO tokens, which
            are to be claimed 24h after the end of the sale. The tokens you will
            receive will have the exact same USDC value than your contribution.
            1,200,000 $srRDO, worth 360,000 $RDO and 840,000 $xRDO (out of a
            10,000,000 total supply) will be allocated to the sale. The final
            price will therefore be:
          </div>
          <Button
            className="justify-center w-full mt-4 h-[52px] text-[16px] px-[42px]"
            disabled
          >
            Total $ raised / 1,200,000
          </Button>
        </div>
        <div className="w-full bg-[#150E3980] px-2 py-6">
          <div className="flex">
            <ChartLine />
            <div className="ml-2 font-bold text-[24px]">
              How price is determined
            </div>
          </div>
          <div className="text-[#98A2B3]">
            This sale will take place in two different stages. STAGE 1: During
            the first 12h, only whitelisted addresses can participate with a
            guaranteed capped allocation. STAGE 2: During the following 12h,
            only whitelisted addresses can participate, with a 5x higher
            allocation cap. STAGE 3: Starting July 1st @ 12pm UTC, other
            participants can purchase the remaining tokens on a first-come,
            first-served basis. This stage will last for 48 hours.
          </div>
        </div>
        <div className="w-full bg-[#150E3980] px-2 py-6">
          <div className="flex">
            <Wallet />
            <div className="ml-2 font-bold text-[24px]">Claiming process</div>
          </div>
          <div className="text-[#98A2B3]">
            The public sale will last until July 3rd @ 12pm UTC. Shortly after
            (exact date TBA), the purchased tokens will be entirely and directly
            claimable from this same page. In order to align the long-term
            objectives of the protocol, the sale will be distributed in $srRDO ,
            worth 30% of $RDO and 70% of $xRDO. The claimed $srRDO will be
            automatically converted to $RDO directly from your wallet on July
            4th @ 12pm UTC, at the same time as $RDO liquidity is seeded and
            trading opens.
          </div>
        </div>
      </div>

      <div className="text-[#F04438]">
        Camelot is a suite of decentralized contracts built to support Arbitrum
        native builders. As a permissionless protocol, Camelot bears no
        responsibility for any tokens purchased using its contracts. All users
        are taking full responsibility that they are aware of the relevant risks
        involved, and that they are participating for a token that is completely
        independent and not associated with Camelot in any way. Social media
        posts and visible information on the Camelot app in no way counts as an
        endorsement of a protocol by the Camelot team, and nothing posted or
        shared in any Camelot media is a recommendation or financial advice.
      </div>
    </div>
  );
};

export default Launchpad;
