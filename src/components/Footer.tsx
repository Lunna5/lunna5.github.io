import React from 'react';
import Button from './ui/Button';
import { useTranslations, useTranslatedPath, type SupportedLanguage } from '@/i18n/utils';

interface FooterProps {
  lang?: SupportedLanguage;
}

const Footer: React.FC<FooterProps> = ({ lang = 'en' }) => {
  const t = useTranslations(lang);
  const buildUrl = useTranslatedPath(lang);

  return (
    <footer className='bg-paper border-t-retro border-ink w-full'>
      <div className='divide-y-retro md:divide-x-retro divide-ink border-b-retro border-ink grid grid-cols-1 md:grid-cols-2 md:divide-y-0 lg:grid-cols-4'>
        <div className='flex flex-col justify-between p-8 sm:p-10'>
          <div>
            <a href={buildUrl('/')} className='mb-4 inline-block'>
              <img src='/lunna_logo_light.svg' alt='Lunna Logo' className='h-8 w-auto object-contain' loading='lazy' />
            </a>
            <p className='text-ink-muted max-w-xs text-xs leading-relaxed sm:text-sm'>
              {lang === 'es' ? (
                <>
                  Portfolio personal de <strong>Lunna</strong> (Lunna Martín González). Software developer y fundadora
                  de Nookure.
                </>
              ) : (
                <>
                  Personal portfolio of <strong>Lunna</strong> (Lunna Martín González). Software developer and founder
                  of Nookure.
                </>
              )}
            </p>
          </div>
        </div>

        <div className='p-8 sm:p-10'>
          <h4 className='text-ink mb-4 font-mono text-xs font-bold tracking-widest uppercase'>
            {t('footer.portfolio')}
          </h4>
          <ul className='text-ink-light space-y-2.5 text-xs sm:text-sm'>
            <li>
              <a href={buildUrl('/#hero')} className='hover:text-accent transition-colors hover:underline'>
                {t('footer.home')}
              </a>
            </li>
            <li>
              <a href={buildUrl('/#featured')} className='hover:text-accent transition-colors hover:underline'>
                {t('footer.featured')}
              </a>
            </li>
            <li>
              <a href={buildUrl('/projects')} className='hover:text-accent transition-colors hover:underline'>
                {t('footer.allProjects')}
              </a>
            </li>
            <li>
              <a
                href={buildUrl('/projects#contributions')}
                className='hover:text-accent transition-colors hover:underline'
              >
                {t('footer.contrib')}
              </a>
            </li>
          </ul>
        </div>

        <div className='p-8 sm:p-10'>
          <h4 className='text-ink mb-4 font-mono text-xs font-bold tracking-widest uppercase'>
            {t('footer.profiles')}
          </h4>
          <ul className='text-ink-light space-y-2.5 text-xs sm:text-sm'>
            <li>
              <a
                href='https://github.com/Lunna5'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-accent flex items-center gap-1.5 transition-colors hover:underline'
              >
                <span>{t('footer.githubPersonal')}</span>
                <span>↗</span>
              </a>
            </li>
            <li>
              <a
                href='https://github.com/nookure'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-accent flex items-center gap-1.5 transition-colors hover:underline'
              >
                <span>{t('footer.githubOrg')}</span>
                <span>↗</span>
              </a>
            </li>
            <li>
              <a
                href='https://discord.nookure.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-accent flex items-center gap-1.5 transition-colors hover:underline'
              >
                <span>{t('footer.discordOfficial')}</span>
                <span>↗</span>
              </a>
            </li>
          </ul>
        </div>

        <div className='bg-primary-light/60 flex flex-col justify-between p-8 sm:p-10'>
          <div>
            <h4 className='text-ink mb-2 font-mono text-xs font-bold tracking-widest uppercase'>
              {t('footer.community')}
            </h4>
            <p className='text-ink-muted mb-4 text-xs'>{t('footer.communityDesc')}</p>
          </div>

          <Button
            variant='primary'
            size='sm'
            href='https://discord.nookure.com'
            target='_blank'
            rel='noopener noreferrer'
            className='w-full text-center'
          >
            {t('footer.discordBtn')}
          </Button>
        </div>
      </div>

      <div className='text-xxs text-ink-muted flex flex-col items-center justify-between gap-2 p-4 px-6 font-mono sm:flex-row md:px-12'>
        <div>
          © {new Date().getFullYear()} {t('footer.copyright')}
        </div>
        <div className='flex gap-4'>
          <a href='https://github.com/Lunna5' target='_blank' rel='noopener noreferrer' className='hover:underline'>
            GitHub
          </a>
          <a
            href='https://discord.nookure.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-ink font-bold hover:underline'
          >
            Discord Nookure
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
