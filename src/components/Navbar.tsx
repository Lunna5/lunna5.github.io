import React, { useState, useEffect } from 'react';
import NavItem from './ui/NavItem';
import Button from './ui/Button';
import Dropdown, { type DropdownItem } from './ui/Dropdown';
import { useTranslations, useTranslatedPath, type SupportedLanguage } from '@/i18n/utils';
import { IconSun, IconMoon, IconDeviceDesktop, IconWorld } from '@tabler/icons-react';

type ThemeMode = 'light' | 'dark' | 'system';

interface LanguageSelectorProps {
  lang: SupportedLanguage;
  currentPath: string;
  mobile?: boolean;
  onSelect?: () => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ lang, currentPath, mobile = false, onSelect }) => {
  const t = useTranslations(lang);
  const buildUrl = useTranslatedPath(lang);

  const items: DropdownItem[] = [
    {
      id: 'en',
      icon: <span>🇬🇧</span>,
      label: 'English',
      mobileLabel: 'English',
      href: buildUrl(currentPath, 'en'),
      active: lang === 'en',
      onClick: onSelect,
    },
    {
      id: 'es',
      icon: <span>🇪🇸</span>,
      label: 'Español',
      mobileLabel: 'Español',
      href: buildUrl(currentPath, 'es'),
      active: lang === 'es',
      onClick: onSelect,
    },
  ];

  return (
    <Dropdown
      mobile={mobile}
      mobileLabel={t('nav.language')}
      items={items}
      ariaLabel={t('nav.switchLanguage')}
      triggerClassName='px-4 sm:px-5'
      trigger={
        <>
          <IconWorld size={18} className='text-ink' />
          <span className='font-mono font-bold uppercase'>{lang.toUpperCase()}</span>
        </>
      }
    />
  );
};

interface ThemeSelectorProps {
  lang: SupportedLanguage;
  mobile?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ lang, mobile = false }) => {
  const [theme, setTheme] = useState<ThemeMode>('system');
  const t = useTranslations(lang);

  useEffect(() => {
    const saved = (localStorage.getItem('theme') as ThemeMode) || 'system';
    setTheme(saved);

    const handleThemeEvent = (e: Event) => {
      const customEvent = e as CustomEvent<ThemeMode>;
      if (customEvent.detail) {
        setTheme(customEvent.detail);
      }
    };
    window.addEventListener('theme-changed', handleThemeEvent);
    return () => window.removeEventListener('theme-changed', handleThemeEvent);
  }, []);

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

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
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

    window.dispatchEvent(new CustomEvent('theme-changed', { detail: newTheme }));
  };

  const themeIcon =
    theme === 'dark' ? (
      <IconMoon size={18} className='text-ink' />
    ) : theme === 'light' ? (
      <IconSun size={18} className='text-ink' />
    ) : (
      <IconDeviceDesktop size={18} className='text-ink' />
    );

  const items: DropdownItem[] = [
    {
      id: 'light',
      icon: <IconSun size={15} />,
      mobileIcon: <IconSun size={13} />,
      label: t('nav.themeLight'),
      active: theme === 'light',
      onClick: () => handleThemeChange('light'),
    },
    {
      id: 'dark',
      icon: <IconMoon size={15} />,
      mobileIcon: <IconMoon size={13} />,
      label: t('nav.themeDark'),
      active: theme === 'dark',
      onClick: () => handleThemeChange('dark'),
    },
    {
      id: 'system',
      icon: <IconDeviceDesktop size={15} />,
      mobileIcon: <IconDeviceDesktop size={13} />,
      label: t('nav.themeSystem'),
      active: theme === 'system',
      onClick: () => handleThemeChange('system'),
    },
  ];

  return (
    <Dropdown
      mobile={mobile}
      mobileLabel={t('nav.theme')}
      items={items}
      trigger={themeIcon}
      ariaLabel={t('nav.switchTheme')}
      title={t('nav.theme')}
    />
  );
};

interface NavbarProps {
  lang?: SupportedLanguage;
  currentPath?: string;
}

const Navbar: React.FC<NavbarProps> = ({ lang = 'en', currentPath = '/' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations(lang);
  const buildUrl = useTranslatedPath(lang);

  return (
    <nav className='border-b-retro border-ink bg-paper relative z-40 w-full'>
      <div className='flex h-16 w-full items-stretch justify-between sm:h-20'>
        <div className='border-r-retro border-ink bg-paper flex shrink-0 items-center px-6 md:px-8'>
          <a href={buildUrl('/')} className='flex items-center gap-3 transition-opacity hover:opacity-85'>
            <img src='/lunna_logo_light.svg' alt='Lunna Logo' className='h-7 w-auto object-contain md:h-8' />
          </a>
        </div>

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

        <div className='divide-x-retro divide-ink flex shrink-0 items-stretch'>
          <LanguageSelector lang={lang} currentPath={currentPath} />

          <ThemeSelector lang={lang} />

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

          <LanguageSelector lang={lang} currentPath={currentPath} mobile onSelect={() => setMobileMenuOpen(false)} />

          <ThemeSelector lang={lang} mobile />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
