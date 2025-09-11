import transFlag from '@/assets/img/emoji/flags/trans.png';
import lgbtiqFlag from '@/assets/img/emoji/flags/lgbtiq.png';
import heart from '@/assets/img/emoji/heart.png';
import crescentMoon from '@/assets/img/emoji/moon/crescent.png';
import cherryBlossom from '@/assets/img/emoji/cherry_blossom.png';
import fence from '@/assets/img/emoji/fence.png';

export interface EmojiResource {
  [key: string]: { symbol: string; label: string };
}

export const emojiMap: EmojiResource = {
  transFlag: { symbol: transFlag.src, label: 'Transgender Flag' },
  lgbtiqFlag: { symbol: lgbtiqFlag.src, label: 'LGBTIQ+ Flag' },
  heart: { symbol: heart.src, label: 'Heart' },
  crescentMoon: { symbol: crescentMoon.src, label: 'Crescent Moon' },
  cherryBlossom: { symbol: cherryBlossom.src, label: 'Cherry Blossom' },
  fence: { symbol: fence.src, label: 'Construction Fence' },
};

export const Emoji = ({ name, size = [20, 20] }: { name: keyof EmojiResource; size?: [number, number] }) => {
  const { symbol, label } = emojiMap[name];
  return <img src={symbol} alt={label} width={size[0]} height={size[1]} className='inline-block' />;
};

export const EmojiShowcase = () => {
  return (
    <div className='flex gap-4'>
      {Object.keys(emojiMap).map((key) => (
        <Emoji key={key} name={key as keyof EmojiResource} size={[32, 32]} />
      ))}
    </div>
  );
};
