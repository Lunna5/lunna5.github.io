import React, { useEffect, useState } from 'react';
import Button from './ui/Button';
import Badge from './ui/Badge';
import Card from './ui/Card';
import CircleArrow from './ui/CircleArrow';
import { useTranslations, useTranslatedPath, type SupportedLanguage } from '@/i18n/utils';
import {
  IconArrowLeft,
  IconBrandDiscordFilled,
  IconBrandGithub,
  IconCompass,
  IconFolder,
  IconHome,
  IconTerminal2,
} from '@tabler/icons-react';

interface NotFoundSectionProps {
  lang?: SupportedLanguage;
}

const NotFoundSection: React.FC<NotFoundSectionProps> = ({ lang = 'en' }) => {
  const [currentPath, setCurrentPath] = useState('');
  const [resolvedLang, setResolvedLang] = useState<SupportedLanguage>(lang);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
      if (window.location.pathname.startsWith('/es') && lang === 'en') {
        setResolvedLang('es');
      }
    }
  }, [lang]);

  const t = useTranslations(resolvedLang);
  const buildUrl = useTranslatedPath(resolvedLang);

  return (
    <div className='w-full'>
      <section id='not-found' className='border-b-retro border-ink bg-paper w-full'>
        <div className='border-b-retro border-ink'>
          <div className='border-b-retro border-ink from-primary/20 via-paper to-paper lg:border-r-retro relative flex flex-col justify-between overflow-hidden bg-linear-to-br p-8 sm:p-12 md:p-16 lg:col-span-7 lg:border-b-0 lg:p-20'>
            <div className='bg-primary/30 pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl' />
            <div className='relative z-10 max-w-xl'>
              <div className='mb-4 flex items-baseline gap-4'>
                <span className='text-ink font-serif text-sm font-bold tracking-tight text-base-300 sm:text-base'>
                  404
                </span>
                <span className='text-accent font-mono text-sm font-bold tracking-widest uppercase'>
                  // Page Missing
                </span>
              </div>

              <h1 className='text-ink mb-4 font-serif text-3xl font-normal sm:text-4xl md:text-5xl'>
                {t('404.heading')}
              </h1>

              <p className='text-ink-muted mb-8 max-w-lg text-sm leading-relaxed sm:text-base'>{t('404.message')}</p>

              <div className='flex flex-wrap items-center gap-3.5'>
                <Button variant='primary' size='md' href={buildUrl('/')}>
                  <IconHome size={18} />
                  <span>{t('404.btnHome')}</span>
                </Button>

                <Button variant='secondary' size='md' href={buildUrl('/projects')}>
                  <IconFolder size={18} />
                  <span>{t('404.btnProjects')}</span>
                </Button>

                <Button
                  variant='outline'
                  size='md'
                  href='https://discord.nookure.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <IconBrandDiscordFilled size={18} />
                  <span>{t('404.btnDiscord')}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className='mx-auto max-w-7xl p-6 sm:p-10 md:p-12'>
          <div className='mb-6 flex items-center justify-between'>
            <div>
              <h2 className='text-ink font-serif text-2xl font-bold sm:text-3xl'>{t('404.quickLinks.title')}</h2>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
            <Card className='group flex flex-col justify-between bg-white p-6' hoverEffect>
              <div>
                <CircleArrow bgColor='#cfa7e8' href={buildUrl('/')} className='mb-4 inline-flex' />
                <h3 className='text-ink group-hover:text-accent mb-1 font-serif text-xl font-bold transition-colors'>
                  {t('nav.home')}
                </h3>
                <p className='text-ink-muted text-xs leading-relaxed'>
                  {resolvedLang === 'es'
                    ? 'Regresa a la página principal y conoce mi perfil y proyectos destacados.'
                    : 'Return to the main page to explore my biography and featured projects.'}
                </p>
              </div>
            </Card>

            <Card className='group flex flex-col justify-between bg-white p-6' hoverEffect>
              <div>
                <CircleArrow bgColor='#bfdbfe' href={buildUrl('/projects')} className='mb-4 inline-flex' />
                <h3 className='text-ink group-hover:text-accent mb-1 font-serif text-xl font-bold transition-colors'>
                  {t('nav.allProjects')}
                </h3>
                <p className='text-ink-muted text-xs leading-relaxed'>
                  {resolvedLang === 'es'
                    ? 'Explora la lista completa de repositorios, filtros por tecnología y código fuente.'
                    : 'Browse through all repositories, language filters, and source code.'}
                </p>
              </div>
            </Card>

            <Card className='group flex flex-col justify-between bg-white p-6' hoverEffect>
              <div>
                <CircleArrow
                  bgColor='#bbf7d0'
                  href='https://discord.nookure.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mb-4 inline-flex'
                />
                <h3 className='text-ink group-hover:text-accent mb-1 font-serif text-xl font-bold transition-colors'>
                  {t('nav.discord')}
                </h3>
                <p className='text-ink-muted text-xs leading-relaxed'>
                  {resolvedLang === 'es'
                    ? '¿Tienes alguna duda o encontraste un enlace roto? Únete a la comunidad de Discord.'
                    : 'Have questions or found a broken link? Let me know on the official Discord community.'}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundSection;
