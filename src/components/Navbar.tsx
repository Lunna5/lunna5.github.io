import React, { useState, useRef, useEffect } from 'react';
import NavItem from './ui/NavItem';
import Button from './ui/Button';
import { useTranslations, useTranslatedPath, type SupportedLanguage } from '@/i18n/utils';
import { IconSun, IconMoon, IconDeviceDesktop, IconWorld } from '@tabler/icons-react';

interface NavbarProps {
  lang?: SupportedLanguage;
  currentPath?: string;
}

const Navbar: React.FC<NavbarProps> = ({ lang = 'en', currentPath = '/' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const langMenuRef = useRef<HTMLDivElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations(lang);
  const buildUrl = useTranslatedPath(lang);

  // Initialize theme and close menus on outside click
  useEffect(() => {
    const saved = (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system';
    setTheme(saved);

    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Listen for system theme changes when in 'system' mode
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      const saved = localStorage.getItem('theme');
      if (!saved || saved === 'system') {
        if (mediaQuery.matches) {
          document.documentElement.classList.add('dark');
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.setAttribute('data-theme', 'light');
        }
      }
    };
    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setThemeMenuOpen(false);
    localStorage.setItem('theme', newTheme);

    const isDark =
      newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  const enHref = buildUrl(currentPath, 'en');
  const esHref = buildUrl(currentPath, 'es');

  return (
    <nav className='border-b-retro border-ink bg-paper relative z-40 w-full'>
      <div className='flex h-16 w-full items-stretch justify-between sm:h-20'>
        {/* Brand Logo Box (Column 1) */}
        <div className='border-r-retro border-ink bg-paper flex shrink-0 items-center px-6 md:px-8'>
          <a href={buildUrl('/')} className='flex items-center gap-3 transition-opacity hover:opacity-85'>
            <img src='/lunna_logo_light.svg' alt='Lunna Logo' className='h-7 w-auto object-contain md:h-8' />
          </a>
        </div>

        {/* Center Navigation: Columns with Vertical Divider Borders on Desktop */}
        <div className='divide-x-retro divide-ink hidden h-full flex-1 grid-cols-6 items-stretch lg:grid'>
          <NavItem href={buildUrl('/')} className='w-full justify-center'>
            {t('nav.home')}
          </NavItem>
          <NavItem href={buildUrl('/projects')} className='w-full justify-center'>
            {t('nav.projects')}
          </NavItem>
          <NavItem
            href='https://github.com/Lunna5'
            isExternal
            className='border-r-retro border-ink w-full justify-center'
          >
            {t('nav.github')}
          </NavItem>
        </div>

        {/* Language Selector & Actions (Rightmost Columns) */}
        <div className='divide-x-retro divide-ink flex shrink-0 items-stretch'>
          {/* Language Selector (Replaces Search) */}
          <div className='relative flex items-stretch' ref={langMenuRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className='hover:bg-primary/20 text-ink flex h-full cursor-pointer items-center gap-2 px-4 text-xs font-bold tracking-wider transition-colors sm:px-5 sm:text-sm'
              aria-label={t('nav.switchLanguage')}
              aria-expanded={langMenuOpen}
            >
              <IconWorld size={18} className='text-ink' />
              <span className='font-mono font-bold uppercase'>{lang.toUpperCase()}</span>
              <span className={`text-3xs transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {langMenuOpen && (
              <div className='border-retro border-ink shadow-retro divide-ink/10 absolute top-full right-0 z-50 mt-1 flex w-36 flex-col divide-y bg-white py-1'>
                <a
                  href={enHref}
                  onClick={() => setLangMenuOpen(false)}
                  className={`hover:bg-primary/25 flex items-center justify-between px-3 py-2 text-xs font-bold transition-colors ${
                    lang === 'en' ? 'bg-primary/20 text-accent' : 'text-ink'
                  }`}
                >
                  <span className='flex items-center gap-1.5'>
                    <span>🇬🇧</span> English
                  </span>
                  {lang === 'en' && <span className='font-bold'>✓</span>}
                </a>
                <a
                  href={esHref}
                  onClick={() => setLangMenuOpen(false)}
                  className={`hover:bg-primary/25 flex items-center justify-between px-3 py-2 text-xs font-bold transition-colors ${
                    lang === 'es' ? 'bg-primary/20 text-accent' : 'text-ink'
                  }`}
                >
                  <span className='flex items-center gap-1.5'>
                    <span>🇪🇸</span> Español
                  </span>
                  {lang === 'es' && <span className='font-bold'>✓</span>}
                </a>
              </div>
            )}
          </div>

          {/* Theme Selector */}
          <div className='relative flex items-stretch' ref={themeMenuRef}>
            <button
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              className='hover:bg-primary/20 text-ink flex h-full cursor-pointer items-center gap-1.5 px-3.5 text-xs font-bold tracking-wider transition-colors sm:px-4 sm:text-sm'
              aria-label={t('nav.switchTheme')}
              aria-expanded={themeMenuOpen}
              title={t('nav.theme')}
            >
              {theme === 'dark' ? (
                <IconMoon size={18} className='text-ink' />
              ) : theme === 'light' ? (
                <IconSun size={18} className='text-ink' />
              ) : (
                <IconDeviceDesktop size={18} className='text-ink' />
              )}
              <span className={`text-3xs transition-transform duration-200 ${themeMenuOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {themeMenuOpen && (
              <div className='border-retro border-ink shadow-retro divide-ink/10 absolute top-full right-0 z-50 mt-1 flex w-36 flex-col divide-y bg-white py-1'>
                <button
                  type='button'
                  onClick={() => handleThemeChange('light')}
                  className={`hover:bg-primary/25 flex w-full cursor-pointer items-center justify-between px-3 py-2 text-xs font-bold transition-colors ${
                    theme === 'light' ? 'bg-primary/20 text-accent' : 'text-ink'
                  }`}
                >
                  <span className='flex items-center gap-2'>
                    <IconSun size={15} /> {t('nav.themeLight')}
                  </span>
                  {theme === 'light' && <span className='font-bold'>✓</span>}
                </button>
                <button
                  type='button'
                  onClick={() => handleThemeChange('dark')}
                  className={`hover:bg-primary/25 flex w-full cursor-pointer items-center justify-between px-3 py-2 text-xs font-bold transition-colors ${
                    theme === 'dark' ? 'bg-primary/20 text-accent' : 'text-ink'
                  }`}
                >
                  <span className='flex items-center gap-2'>
                    <IconMoon size={15} /> {t('nav.themeDark')}
                  </span>
                  {theme === 'dark' && <span className='font-bold'>✓</span>}
                </button>
                <button
                  type='button'
                  onClick={() => handleThemeChange('system')}
                  className={`hover:bg-primary/25 flex w-full cursor-pointer items-center justify-between px-3 py-2 text-xs font-bold transition-colors ${
                    theme === 'system' ? 'bg-primary/20 text-accent' : 'text-ink'
                  }`}
                >
                  <span className='flex items-center gap-2'>
                    <IconDeviceDesktop size={15} /> {t('nav.themeSystem')}
                  </span>
                  {theme === 'system' && <span className='font-bold'>✓</span>}
                </button>
              </div>
            )}
          </div>

          <div className='bg-paper hidden items-center px-4 sm:flex md:px-5'>
            <Button
              variant='primary'
              size='sm'
              href='https://discord.nookure.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              {t('nav.discord')}
            </Button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='hover:bg-primary/30 flex h-full cursor-pointer items-center justify-center px-5 transition-colors lg:hidden'
            aria-label='Toggle Menu'
          >
            <div className='flex w-5 flex-col gap-1.5'>
              <span
                className={`bg-ink block h-0.5 transition-transform ${mobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`}
              />
              <span className={`bg-ink block h-0.5 transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span
                className={`bg-ink block h-0.5 transition-transform ${
                  mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className='border-t-retro border-ink bg-paper divide-y-retro divide-ink flex w-full flex-col lg:hidden'>
          <NavItem href={buildUrl('/')} onClick={() => setMobileMenuOpen(false)}>
            {t('nav.home')}
          </NavItem>
          <NavItem href={buildUrl('/projects')} onClick={() => setMobileMenuOpen(false)}>
            {t('nav.allProjects')}
          </NavItem>
          <NavItem href='https://github.com/Lunna5' isExternal>
            {t('nav.github')}
          </NavItem>
          <NavItem href='https://discord.nookure.com' isExternal className='bg-primary/20' badge='discord.nookure.com'>
            {t('nav.joinDiscord')}
          </NavItem>

          {/* Mobile Language Switcher */}
          <div className='bg-paper-alt/40 flex items-center justify-between p-3.5'>
            <span className='text-ink-muted font-mono text-xs font-bold uppercase'>{t('nav.language')}:</span>
            <div className='flex gap-2'>
              <a
                href={enHref}
                className={`border-ink rounded-sm border px-3 py-1 text-xs font-bold transition-all ${
                  lang === 'en' ? 'bg-primary text-ink shadow-retro-sm' : 'text-ink hover:bg-surface-hover bg-white'
                }`}
              >
                English
              </a>
              <a
                href={esHref}
                className={`border-ink rounded-sm border px-3 py-1 text-xs font-bold transition-all ${
                  lang === 'es' ? 'bg-primary text-ink shadow-retro-sm' : 'text-ink hover:bg-surface-hover bg-white'
                }`}
              >
                Español
              </a>
            </div>
          </div>

          {/* Mobile Theme Switcher */}
          <div className='bg-paper-alt/40 flex items-center justify-between p-3.5'>
            <span className='text-ink-muted font-mono text-xs font-bold uppercase'>{t('nav.theme')}:</span>
            <div className='flex gap-1.5'>
              <button
                type='button'
                onClick={() => handleThemeChange('light')}
                className={`border-ink flex cursor-pointer items-center gap-1 rounded-sm border px-2.5 py-1 text-xs font-bold transition-all ${
                  theme === 'light' ? 'bg-primary text-ink shadow-retro-sm' : 'text-ink hover:bg-surface-hover bg-white'
                }`}
              >
                <IconSun size={13} /> {t('nav.themeLight')}
              </button>
              <button
                type='button'
                onClick={() => handleThemeChange('dark')}
                className={`border-ink flex cursor-pointer items-center gap-1 rounded-sm border px-2.5 py-1 text-xs font-bold transition-all ${
                  theme === 'dark' ? 'bg-primary text-ink shadow-retro-sm' : 'text-ink hover:bg-surface-hover bg-white'
                }`}
              >
                <IconMoon size={13} /> {t('nav.themeDark')}
              </button>
              <button
                type='button'
                onClick={() => handleThemeChange('system')}
                className={`border-ink flex cursor-pointer items-center gap-1 rounded-sm border px-2.5 py-1 text-xs font-bold transition-all ${
                  theme === 'system'
                    ? 'bg-primary text-ink shadow-retro-sm'
                    : 'text-ink hover:bg-surface-hover bg-white'
                }`}
              >
                <IconDeviceDesktop size={13} /> {t('nav.themeSystem')}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
