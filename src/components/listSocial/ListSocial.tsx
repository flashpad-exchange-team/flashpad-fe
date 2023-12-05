import DiscordIcon from '@/icons/DiscordIcon';
import DocsIcon from '@/icons/DocsIcon';
import MediumIcon from '@/icons/MediumIcon';
import TelegramIcon from '@/icons/TelegramIcon';
import TwitterIcon from '@/icons/TwitterIcon';

const ListSocial = () => {
  return (
    <div className="flex items-center gap-3 mt-2 lg:mt-0 mx-auto lg:mx-0 w-[180px] ">
      {/* <a href="https://docs.flashpad.io/" target="_blank"> */}
      <a href="https://docs.flashpad.io/" target="_blank">
        <DocsIcon />
      </a>
      {/* <a href="https://discord.com/invite/arthurexchange" target="_blank"> */}
      <a href="#">
        <DiscordIcon />
      </a>
      {/* <a href="https://twitter.com/ArthurExchange" target="_blank"> */}
      <a href="#">
        <TwitterIcon />
      </a>
      {/* <a href="https://t.me/Arthurexchange" target="_blank"> */}
      <a href="#">
        <TelegramIcon />
      </a>
      <MediumIcon />
    </div>
  );
};

export default ListSocial;
