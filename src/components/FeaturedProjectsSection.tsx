import React, { useEffect } from 'react';
import Button from './ui/Button';
import Badge from './ui/Badge';
import Card from './ui/Card';
import { SkeletonCard } from './ui/Skeleton';
import { useRepoStore } from '@/store/repoStore';
import { LANGUAGE_COLORS } from './ProjectsSection';
import { useTranslations, useTranslatedPath, type SupportedLanguage } from '@/i18n/utils';
import { IconFolder } from '@tabler/icons-react';

interface FeaturedProjectsSectionProps {
  lang?: SupportedLanguage;
}

const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({ lang = 'en' }) => {
  const { repos, isLoading, fetchRepos } = useRepoStore();
  const t = useTranslations(lang);
  const buildUrl = useTranslatedPath(lang);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  const featuredRepos = repos
    .filter(
      (r) =>
        r.fullName.toLowerCase() === 'nookure/nooktheme' ||
        r.fullName.toLowerCase() === 'lunna5/daiana' ||
        r.fullName.toLowerCase() === 'nookure/nookurestaff' ||
        r.isFeatured,
    )
    .slice(0, 3);

  return (
    <section id='featured' className='border-b-retro border-ink bg-paper w-full'>
      <div className='border-b-retro border-ink bg-paper p-8 sm:p-12 md:p-16'>
        <div className='mx-auto flex max-w-6xl flex-col justify-between gap-6 md:flex-row md:items-end'>
          <div>
            <h2 className='text-ink font-serif text-4xl leading-tight font-normal sm:text-5xl md:text-6xl'>
              {t('featured.title')}
            </h2>
            <p className='text-ink-muted mt-3 max-w-xl text-sm sm:text-base'>{t('featured.subtitle')}</p>
          </div>

          <div>
            <Button variant='primary' size='md' href={buildUrl('/projects')}>
              {t('featured.btnMore')}
            </Button>
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-7xl p-6 sm:p-10 md:p-12'>
        <div className='mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {isLoading
            ? Array.from({ length: 3 }).map((_, idx) => <SkeletonCard key={`feat-skel-${idx}`} />)
            : featuredRepos.map((repo) => {
                const highlightTag = repo.tagTlKey ? t(repo.tagTlKey) : repo.highlightTag || t('featured.defaultTag');
                const description = repo.tlKey ? t(repo.tlKey) : repo.description;

                return (
                  <Card
                    key={repo.id}
                    className='group relative flex h-full flex-col justify-between overflow-hidden bg-white'
                  >
                    {/* Top Accent Strip */}
                    <div className='bg-primary border-ink h-2 w-full border-b' />

                    <div className='flex flex-1 flex-col justify-between p-6 sm:p-8'>
                      <div>
                        <div className='mb-4 flex items-center justify-between gap-2'>
                          <Badge variant='accent' size='sm'>
                            {highlightTag}
                          </Badge>
                          <span className='bg-paper border-ink shadow-retro-xs rounded border px-2 py-0.5 font-mono text-xs font-bold'>
                            ★ {repo.stars}
                          </span>
                        </div>

                        <div className='text-ink-muted mb-1 font-mono text-xs'>{repo.owner} /</div>
                        <h3 className='text-ink group-hover:text-accent mb-3 font-serif text-3xl font-bold transition-colors'>
                          {repo.name}
                        </h3>

                        <p className='text-ink-light mb-6 text-sm leading-relaxed'>{description}</p>
                      </div>

                      <div>
                        <div className='border-ink/10 mb-6 flex flex-wrap gap-1.5 border-t pt-4'>
                          {repo.languages.map((l) => (
                            <Badge key={l} variant='default' dotColor={LANGUAGE_COLORS[l] || '#cfa7e8'} size='sm'>
                              {l}
                            </Badge>
                          ))}
                        </div>

                        <Button
                          variant='primary'
                          size='md'
                          href={repo.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='w-full text-xs font-bold'
                        >
                          {t('featured.card.viewGithub')}
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
        </div>

        <div className='border-retro border-ink shadow-retro flex flex-col items-center justify-between gap-6 rounded-sm bg-white p-6 sm:p-8 md:flex-row'>
          <div className='flex items-center gap-4'>
            <div className='border-ink bg-primary shadow-retro-sm flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-lg font-bold'>
              <IconFolder size={24} />
            </div>
            <div>
              <h4 className='text-ink font-serif text-2xl font-bold'>{t('featured.banner.title')}</h4>
              <p className='text-ink-muted mt-0.5 text-xs sm:text-sm'>{t('featured.banner.desc')}</p>
            </div>
          </div>

          <Button variant='primary' size='lg' href={buildUrl('/projects')} className='w-full shrink-0 md:w-auto'>
            {t('featured.banner.btn')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
