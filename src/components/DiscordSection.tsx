import React from 'react';
import Button from './ui/Button';
import Card from './ui/Card';
import { useTranslations, type SupportedLanguage } from '../i18n/utils';
import { IconBrandDiscordFilled } from '@tabler/icons-react';

interface DiscordSectionProps {
  lang?: SupportedLanguage;
}

const DiscordSection: React.FC<DiscordSectionProps> = ({ lang = 'en' }) => {
  const t = useTranslations(lang);

  return (
    <section id='discord' className='border-b-retro border-ink bg-paper relative w-full overflow-hidden'>
      <div className='relative z-10 mx-auto max-w-5xl p-8 sm:p-14 md:p-20'>
        <Card className='relative overflow-hidden bg-white p-8 text-center sm:p-12 md:p-16'>
          <div className='bg-primary/30 pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full blur-3xl' />
          <div className='bg-primary/20 pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full blur-3xl' />

          <h2 className='text-ink mx-auto mb-5 max-w-2xl font-serif text-4xl leading-tight font-normal sm:text-5xl md:text-6xl'>
            {t('discord.title')}
          </h2>

          <p className='text-ink-muted mx-auto mb-8 max-w-xl text-sm leading-relaxed sm:text-base'>
            {t('discord.subtitle')}
          </p>

          <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Button
              variant='primary'
              size='lg'
              href='https://discord.nookure.com'
              target='_blank'
              rel='noopener noreferrer'
              className='flex w-full items-center justify-center gap-3 px-8 py-4 text-sm sm:w-auto sm:px-10 sm:text-lg'
            >
              <span className='flex items-center gap-2'>
                {' '}
                <IconBrandDiscordFilled size={24} /> {t('discord.btnJoin')}
              </span>
            </Button>

            <Button
              variant='secondary'
              size='lg'
              href='https://github.com/Lunna5'
              target='_blank'
              rel='noopener noreferrer'
              className='w-full text-base sm:w-auto sm:text-lg'
            >
              {t('discord.btnGithub')}
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default DiscordSection;
