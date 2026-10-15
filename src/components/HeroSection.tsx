import { useEffect, useState } from 'react';
import Button from './ui/Button';
import CircleArrow from './ui/CircleArrow';
import { useTranslations, useTranslatedPath, type SupportedLanguage } from '@/i18n/utils';
import {
  IconBrandKotlin,
  IconBrandReact,
  IconBrandRust,
  IconBuilding,
  IconClock,
  IconLink,
  IconLock,
  IconMail,
  IconMapPin,
  IconSchool,
} from '@tabler/icons-react';

interface HeroSectionProps {
  lang?: SupportedLanguage;
}

const HeroSection: React.FC<HeroSectionProps> = ({ lang = 'en' }) => {
  const [time, setTime] = useState(new Date());
  const t = useTranslations(lang);
  const buildUrl = useTranslatedPath(lang);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id='hero' className='border-b-retro border-ink bg-paper w-full'>
      <div className='border-b-retro border-ink grid grid-cols-1 lg:grid-cols-12'>
        <div className='border-b-retro lg:border-r-retro border-ink from-primary/25 via-paper to-paper relative flex flex-col justify-between overflow-hidden bg-linear-to-br p-8 sm:p-12 md:p-16 lg:col-span-6 lg:border-b-0 lg:p-20 xl:col-span-7'>
          <div className='bg-primary/40 pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl' />

          <div className='relative z-10 max-w-xl'>
            <h1 className='text-ink mb-8 font-serif text-5xl leading-[1.02] font-normal tracking-tight sm:text-6xl md:text-7xl lg:text-8xl'>
              {t('hero.greeting')}
              <br />
              <span className='font-normal italic'>{t('hero.name')}</span>
            </h1>

            <p className='text-ink-light mb-10 max-w-lg text-base leading-relaxed sm:text-lg'>
              {lang === 'es' ? (
                <>
                  Desarrolladora de software. Quizás me conozcas por <strong>NookTheme</strong> o{' '}
                  <strong>NookureStaff</strong>, pero también disfruto creando utilidades para mi día a día, trasteando
                  con <em>homebrew</em> para Nintendo DS y Wii, y siempre buscando aprender algo nuevo.
                </>
              ) : (
                <>
                  Software developer. You might know me from <strong>NookTheme</strong> or <strong>NookureStaff</strong>
                  , but I also enjoy building daily tools, tinkering with <em>homebrew</em> for Nintendo DS and Wii, and
                  always looking to learn something new.
                </>
              )}
            </p>

            <div className='flex flex-wrap items-center gap-4'>
              <Button variant='primary' size='lg' href='#featured'>
                {t('hero.btnFeatured')}
              </Button>

              <Button
                variant='secondary'
                size='lg'
                href='https://github.com/Lunna5'
                target='_blank'
                rel='noopener noreferrer'
              >
                {t('hero.btnGithub')}
              </Button>

              <Button
                variant='secondary'
                size='lg'
                href='https://discord.nookure.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                {t('hero.btnDiscord')}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className='bg-paper-alt relative flex min-h-120 items-center justify-center overflow-hidden p-6 sm:p-10 md:p-12 lg:col-span-6 lg:min-h-145 xl:col-span-5'>
          <svg
            className='pointer-events-none absolute inset-0 h-full w-full text-[#dacdbd] opacity-60'
            viewBox='0 0 500 500'
            fill='none'
          >
            <path
              d='M50 120 C 150 70, 200 200, 350 140 C 450 100, 480 220, 520 180'
              stroke='currentColor'
              strokeWidth='2.5'
              strokeDasharray='6 6'
            />
            <path
              d='M30 240 C 130 190, 180 320, 330 260 C 430 220, 460 340, 500 300'
              stroke='currentColor'
              strokeWidth='2.5'
            />
            <path
              d='M80 380 C 180 330, 230 460, 380 400 C 480 360, 510 480, 550 440'
              stroke='currentColor'
              strokeWidth='2'
              strokeDasharray='4 4'
            />
          </svg>

          <div className='relative z-10 w-full max-w-md'>
            <div className='absolute -top-6 -left-4 z-0 grid grid-cols-2 gap-3 opacity-95 sm:-top-8 sm:-left-8'>
              <div className='border-retro border-ink shadow-retro-md flex h-16 w-16 -rotate-3 transform flex-col items-center justify-center rounded-xl bg-white p-2 transition-transform hover:rotate-0 sm:h-20 sm:w-20'>
                <IconBrandKotlin size={24} className='text-[#7c3aed]' />
                <span className='text-2xs text-ink-muted font-medium'>Kotlin</span>
              </div>
              <div className='border-retro border-ink shadow-retro-md flex h-16 w-16 rotate-2 transform flex-col items-center justify-center rounded-xl bg-white p-2 transition-transform hover:rotate-0 sm:h-20 sm:w-20'>
                <span className='text-sm font-black text-[#b07219] sm:text-base'>☕</span>
                <span className='text-2xs text-ink-muted font-medium'>Java</span>
              </div>
              <div className='border-retro border-ink shadow-retro-md flex h-16 w-16 rotate-1 transform flex-col items-center justify-center rounded-xl bg-white p-2 transition-transform hover:rotate-0 sm:h-20 sm:w-20'>
                <IconBrandReact size={24} className='text-[#61dafb]' />
                <span className='text-2xs text-ink-muted font-medium'>React / TS</span>
              </div>
              <div className='border-retro border-ink shadow-retro-md flex h-16 w-16 -rotate-2 transform flex-col items-center justify-center rounded-xl bg-white p-2 transition-transform hover:rotate-0 sm:h-20 sm:w-20'>
                <IconBrandRust size={24} className='text-[#dea584]' />
                <span className='text-2xs text-ink-muted font-medium'>Rust</span>
              </div>
            </div>

            <div className='border-ink shadow-retro-lg relative z-10 ml-auto w-11/12 border-2 bg-white p-5 transition-transform hover:-translate-y-1 sm:w-4/5 sm:p-6'>
              <div className='text-2xs text-ink-muted border-ink/15 mb-4 flex items-center justify-between border-b pb-2.5 font-mono tracking-wider uppercase'>
                <span>{t('hero.profile.badge')}</span>
                <span>@Lunna</span>
              </div>

              <div className='mb-3'>
                <h3 className='text-ink font-serif text-xl leading-tight font-bold sm:text-2xl'>Lunna</h3>
                <p className='text-ink-muted mt-0.5 font-mono text-sm'>she/her</p>
              </div>

              <p className='text-ink-muted mb-4 text-xs leading-relaxed'>{t('hero.profile.tagline')}</p>

              <div className='text-ink-muted mb-5 flex flex-col gap-2.5 text-xs'>
                <div className='flex items-center gap-2'>
                  <IconBuilding size={16} />
                  <a href='https://nookure.com' target='_blank' rel='noopener noreferrer'>
                    <span className='text-ink font-medium'>@Nookure</span>
                  </a>
                </div>

                <div className='flex items-center gap-2'>
                  <IconMapPin size={16} />
                  <span>{t('hero.profile.location')}</span>
                </div>

                <div className='flex items-center gap-2'>
                  <IconClock size={16} />
                  <span>
                    {time.toLocaleTimeString(lang === 'es' ? 'es-ES' : 'en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                      timeZone: 'Europe/Madrid',
                    })}
                  </span>
                  <span>(UTC +02:00)</span>
                </div>

                <div className='flex items-center gap-2'>
                  <IconMail size={16} />
                  <a href='mailto:git@lunna.dev' className='hover:text-ink transition-colors'>
                    git@lunna.dev
                  </a>
                </div>

                <div className='flex items-center gap-2'>
                  <IconSchool size={16} />
                  <a
                    href='https://uoc.edu'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:text-ink transition-colors'
                  >
                    UOC
                  </a>
                </div>
              </div>

              <Button
                variant='dark'
                size='sm'
                href='https://github.com/Lunna5'
                target='_blank'
                rel='noopener noreferrer'
                className='w-full'
              >
                {t('hero.profile.btnGithub')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='divide-ink divide-y-retro md:divide-x-retro grid grid-cols-1 md:grid-cols-2 md:divide-y-0 lg:grid-cols-4'>
        <div className='hover:bg-primary/10 flex flex-col justify-between p-6 transition-colors sm:p-8'>
          <div>
            <CircleArrow
              bgColor='#cfa7e8'
              href='#featured'
              ariaLabel={t('hero.card1.aria')}
              className='mb-6 inline-flex'
            />
            <h2 className='text-ink mb-2.5 font-serif text-xl font-bold sm:text-2xl'>{t('hero.card1.title')}</h2>
            <p className='text-ink-muted text-xs leading-relaxed sm:text-sm'>
              {lang === 'es' ? (
                <>
                  Descubre <strong>NookureStaff</strong>, <strong>NookTheme</strong> y <strong>daiana</strong>: tres
                  proyectos que reflejan las diferentes areas por las que me gusta moverme
                </>
              ) : (
                <>
                  Discover <strong>NookureStaff</strong>, <strong>NookTheme</strong> and <strong>daiana</strong>: three
                  projects that reflect the different areas I love exploring
                </>
              )}
            </p>
          </div>
        </div>

        <div className='hover:bg-primary/10 flex flex-col justify-between p-6 transition-colors sm:p-8'>
          <div>
            <CircleArrow
              bgColor='#bfdbfe'
              href={buildUrl('/projects#contributions')}
              ariaLabel={t('hero.card2.aria')}
              className='mb-6 inline-flex'
            />
            <h2 className='text-ink mb-2.5 font-serif text-xl font-bold sm:text-2xl'>{t('hero.card2.title')}</h2>
            <p className='text-ink-muted text-xs leading-relaxed sm:text-sm'>
              {lang === 'es' ? (
                <>
                  Contribuciones a grandes ecosistemas como <strong>Velocity</strong>, o <strong>EssentialsX</strong>.
                </>
              ) : (
                <>
                  Contributions to major ecosystems like <strong>Velocity</strong>, or <strong>EssentialsX</strong>.
                </>
              )}
            </p>
          </div>
        </div>

        <div className='hover:bg-primary/10 flex flex-col justify-between p-6 transition-colors sm:p-8'>
          <div>
            <CircleArrow
              bgColor='#bbf7d0'
              href='https://discord.nookure.com'
              target='_blank'
              rel='noopener noreferrer'
              ariaLabel={t('hero.card3.aria')}
              className='mb-6 inline-flex'
            />
            <h2 className='text-ink mb-2.5 font-serif text-xl font-bold sm:text-2xl'>{t('hero.card3.title')}</h2>
            <p className='text-ink-muted text-xs leading-relaxed sm:text-sm'>{t('hero.card3.desc')}</p>
          </div>
        </div>

        <div className='bg-paper flex flex-col justify-center gap-3.5 p-6 sm:p-8'>
          <div>
            <span className='circle-arrow group mb-6 inline-flex bg-amber-100'>
              <IconLock size={24} />
            </span>
            <h2 className='text-ink mb-2.5 font-serif text-xl font-bold sm:text-2xl'>{t('hero.card4.title')}</h2>
            <p className='text-ink-muted text-xs leading-relaxed sm:text-sm'>{t('hero.card4.desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
