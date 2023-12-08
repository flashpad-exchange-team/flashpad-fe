import { Button } from '@/components/button/Button';
import ArrowLeft from '@/icons/ArrowLeft';
import Bank from '@/icons/Bank';
import ChartLine from '@/icons/ChartLine';
import Coin from '@/icons/Coin';
import Error from '@/icons/Error';
import Safe from '@/icons/Safe';
import TokenMinter from '@/icons/TokenMinter';
import Wallet from '@/icons/Wallet';
import Image from 'next/image';
import Landing from 'public/assets/images/launchpad-landing.png';
import CopyIcon from '@/icons/CopyIcon';
import LaunchpadChart from 'public/assets/images/launchpad-chart.png';

const Launchpad = () => {
  return (
    <div className="max-w-[1096px] w-full mx-auto p-6 md:p-0 ">
      <header className="text-primary text-[36px] mt-28 font-bold">
        Flashpad Launchpad
      </header>
      <div className="text-[#FCFCFD] text-base">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32.
      </div>
      <Button
        className="justify-center my-8 h-[52px] text-base px-[42px]"
        disabled
      >
        <ArrowLeft /> Back to Sales list
      </Button>
      <Image alt="logo" src={Landing.src} width={1096} height={740} />
      <div className="text-[#FCFCFD] text-base mt-8">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English.
      </div>
      <div className="text-xs py-3 px-4 border-b border-[#344054] text-left"></div>
      <div className="text-[#FCFCFD] text-base mt-8">
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
        randomised words which don't look even slightly believable. If you are
        going to use a passage of Lorem Ipsum, you need to be sure there isn't
        anything embarrassing hidden in the middle of text.
      </div>

      <div className="text-[#FCFCFD] text-base mt-2 flex">
        <div>
          <Error />
        </div>
        <div className="ml-2">
          No matter when you participate, everyone will get $FLASH tokens at the
          same final price.
        </div>
      </div>
      <div className="text-[#FCFCFD] text-base mt-2 flex">
        <div>
          <Error />
        </div>
        <div className="ml-2">
          Your allocation will be made up of $FLASH, a receipt token made up of
          30% $FLASH and 70% $xFLASH. $FLASH will be automatically converted to
          $FLASH and $xFLASH 24h after the claims open.
        </div>
      </div>

      <div className="w-full bg-darkBlue my-4 p-4 flex justify-between">
        <div className="flex gap-2 items-center">
          <Bank />
          <div className="">
            <div className="text-[#98A2B3] text-sm">Total raised / Hardcap</div>
            <div className="text-sm">1.061.115,56 / 1.200.000 USDC</div>
            <div className="text-[#98A2B3] text-sm">Total raised / Hardcap</div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Bank />
          <div className="">
            <div className="text-[#98A2B3] text-sm">Token B price</div>
            <div className="text-sm">$0,088</div>
            <div className="text-[#98A2B3] text-sm">Token B price</div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <TokenMinter />
          <div className="">
            <div className="text-[#98A2B3] text-sm">Circ. marketcap</div>
            <div className="text-sm">FDV</div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Safe />
          <div className="">
            <div className="text-[#98A2B3] text-sm">FDV</div>
            <div className="text-sm">$8,84M</div>
          </div>
        </div>
      </div>

      <div className="w-full my-4 flex justify-between">
        <div className="w-[50%] p-2 bg-darkBlue ">
          <div className="flex justify-between">
            <div className="text-[24px] font-bold">Buy</div>
            <div className="flex gap-2 items-center text-[#E6B300]">
              <CopyIcon stroke="#E6B300" />
              <div>Refferal Link</div>
            </div>
          </div>
          <div className="p-4 bg-blue-opacity-50 flex justify-between mt-2 rounded-sm">
            <div className="text-[#98A2B3] text-[12px]">Amount</div>
            <div className="text-[20px]">0.0025545554645465444665</div>
          </div>
          <div className="px-4 pb-4 bg-blue-opacity-50 flex justify-between mb-2">
            <div className="text-[#fff] text-[14px]">Balance: 0</div>
            <Button className="w-[50px] h-[10px] rounded-none flex justify-center items-center text-[12px]">
              Max
            </Button>
          </div>
          <div className="text-[14px] flex justify-between px-4 py-2">
            <div>Spent</div>
            <div className="flex gap-4">
              <div>0.000001</div>
              <div>TOKEN</div>
            </div>
          </div>
          <div className="text-[14px] flex justify-between px-4 py-2">
            <div>Wallet cap</div>
            <div className="flex gap-4">
              <div>0.000001</div>
              <div>TOKEN</div>
            </div>
          </div>
          <div className="text-[14px] flex justify-between px-4 py-2">
            <div>Your referral earning</div>
            <div className="flex gap-4">
              <div>0.000001</div>
              <div>TOKEN</div>
            </div>
          </div>
          <div className="text-[14px] flex justify-between px-4 py-2">
            <div>Pending referal earning</div>
            <div className="flex gap-4">
              <div>0.000001</div>
              <div>TOKEN</div>
            </div>
          </div>
          <div className="block lg:flex items-center gap-2">
            <Button
              className="w-full justify-center mt-2 mb-2 px-[42px]"
              type="secondary"
            >
              Approve
            </Button>
          </div>

          <div className="block lg:flex items-center gap-2">
            <Button
              className="w-full justify-center mt-2 mb-2 px-[42px]"
              type="secondary"
            >
              Claim
            </Button>
          </div>
        </div>
        <div className="w-[50%] ml-4">
          <Image
            className="h-[100%]"
            alt="logo"
            src={LaunchpadChart.src}
            width={700}
            height={700}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 my-5">
        <div className="w-full bg-darkBlue px-2 py-6">
          <div className="flex">
            <Coin />
            <div className="ml-2 font-bold text-2xl">
              How price is determined
            </div>
          </div>
          <div className="text-[#98A2B3]">
            You can contribute with USDC in exchange for $FLASH tokens, which
            are to be claimed 24h after the end of the sale. The tokens you will
            receive will have the exact same USDC value than your contribution.
            1,200,000 $FLASH, worth 360,000 $FLASH and 840,000 $xFLASH (out of a
            10,000,000 total supply) will be allocated to the sale. The final
            price will therefore be:
          </div>
          <Button
            className="justify-center w-full mt-4 h-[52px] text-base px-[42px]"
            disabled
          >
            Total $ raised / 1,200,000
          </Button>
        </div>
        <div className="w-full bg-darkBlue px-2 py-6">
          <div className="flex">
            <ChartLine />
            <div className="ml-2 font-bold text-2xl">
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
        <div className="w-full bg-darkBlue px-2 py-6">
          <div className="flex">
            <Wallet />
            <div className="ml-2 font-bold text-2xl">Claiming process</div>
          </div>
          <div className="text-[#98A2B3]">
            The public sale will last until July 3rd @ 12pm UTC. Shortly after
            (exact date TBA), the purchased tokens will be entirely and directly
            claimable from this same page. In order to align the long-term
            objectives of the protocol, the sale will be distributed in $FLASH ,
            worth 30% of $FLASH and 70% of $xFLASH. The claimed $FLASH will be
            automatically converted to $FLASH directly from your wallet on July
            4th @ 12pm UTC, at the same time as $FLASH liquidity is seeded and
            trading opens.
          </div>
        </div>
      </div>

      <div className="text-[#F04438]">
        The standard chunk of Lorem Ipsum used since the 1500s is reproduced
        below for those interested. Sections 1.10.32 and 1.10.33 from "de
        Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
        original form, accompanied by English versions from the 1914 translation
        by H. Rackham.
      </div>
    </div>
  );
};

export default Launchpad;
