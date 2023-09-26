import DiscordIcon from '@/icons/DiscordIcon';
import DocsIcon from '@/icons/DocsIcon';
import MediumIcon from '@/icons/MediumIcon';
import TelegramIcon from '@/icons/TelegramIcon';
import TwitterIcon from '@/icons/TwitterIcon';

const ListSocial = () => {
  return (
    <div className="flex items-center gap-3 mt-2 lg:mt-0 mx-auto lg:mx-0 w-[210px] ">
      <a href="https://docs.arthur.exchange/" target="_blank">
        <DocsIcon />
      </a>
      <a href="https://discord.gg/yaenZHbd" target="_blank">
        <DiscordIcon />
      </a>
      <a href="https://twitter.com/AthurExchange" target="_blank">
        <TwitterIcon />
      </a>
      <a href="https://t.me/Athurexchange" target="_blank">
        <TelegramIcon />
      </a>
      <MediumIcon />
    </div>
  );
};

export default ListSocial;
