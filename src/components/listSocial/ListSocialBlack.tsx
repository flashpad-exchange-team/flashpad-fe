import DiscordIcon from '@/icons/DiscordIcon';
import DocsIcon from '@/icons/DocsIcon';
import MediumIcon from '@/icons/MediumIcon';
import TelegramIcon from '@/icons/TelegramIcon';
import TwitterIcon from '@/icons/TwitterIcon';

const ListSocialBlack = () => {
  return (
    <div className="flex items-center gap-3 mt-2 lg:mt-0 mx-auto lg:mx-0 w-[260px] text-[#0A071E]">
      <a href="https://docs.arthur.exchange/" target="_blank">
        <DocsIcon xl />
      </a>
      <a href="https://discord.com/invite/arthurexchange" target="_blank">
        <DiscordIcon xl />
      </a>
      <a href="https://twitter.com/ArthurExchange" target="_blank">
        <TwitterIcon xl />
      </a>
      <a href="https://t.me/Arthurexchange" target="_blank">
        <TelegramIcon xl />
      </a>
      <a href="" target="_blank">
        <MediumIcon xl />
      </a>
    </div>
  );
};

export default ListSocialBlack;
