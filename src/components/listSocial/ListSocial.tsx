import DiscordIcon from '@/icons/DiscordIcon';
import DocsIcon from '@/icons/DocsIcon';
import MediumIcon from '@/icons/MediumIcon';
import TelegramIcon from '@/icons/TelegramIcon';
import TwitterIcon from '@/icons/TwitterIcon';

const ListSocial = () => {
  return (
    <div className="flex items-center gap-3 mt-2 lg:mt-0 mx-auto lg:mx-0 w-[171px] ">
      <DiscordIcon />
      <TwitterIcon />
      <TelegramIcon />
      <MediumIcon />
      <DocsIcon />
    </div>
  );
};

export default ListSocial;
