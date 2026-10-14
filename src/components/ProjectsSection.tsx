import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import Badge from './ui/Badge';
import Card from './ui/Card';
import { SkeletonCard } from './ui/Skeleton';
import { useRepoStore, type RepoItem } from '@/store/repoStore';
import { useTranslations, type SupportedLanguage } from '@/i18n/utils';
import { IconGitFork } from '@tabler/icons-react';

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#eab308',
  React: '#0284c7',
  'Tailwind CSS': '#38bdf8',
  Astro: '#ff5d01',
  Kotlin: '#7f52ff',
  Java: '#b07219',
  Rust: '#dea584',
  Go: '#00add8',
  Python: '#3572a5',
  C: '#555555',
  Assembly: '#6e4c13',
  CSS: '#563d7c',
  HTML: '#e34c26',
};

interface ProjectsSectionProps {
  lang?: SupportedLanguage;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang = 'en' }) => {
  const { repos, isLoading, fetchRepos, addRepo, selectedLanguage, setSelectedLanguage, searchQuery, setSearchQuery } =
    useRepoStore();

  const [manualSkeleton, setManualSkeleton] = useState(false);
  const t = useTranslations(lang);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  // Filtrado de repos
  const filterRepoList = (list: RepoItem[]) => {
    return list.filter((repo) => {
      const matchesLang =
        selectedLanguage === 'all' || repo.languages.some((l) => l.toLowerCase() === selectedLanguage.toLowerCase());
      const matchesSearch =
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.fullName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLang && matchesSearch;
    });
  };

  const otherRepos = filterRepoList(repos.filter((r) => !r.isContrib));
  const contribRepos = filterRepoList(repos.filter((r) => r.isContrib));

  const showSkeletons = isLoading || manualSkeleton;

  return (
    <div className='w-full'>
      <section id='projects' className='border-b-retro border-ink bg-paper w-full'>
        <div className='border-b-retro border-ink bg-paper p-8 sm:p-12 md:p-16'>
          <div className='mx-auto flex max-w-6xl flex-col justify-between gap-6 md:flex-row md:items-end'>
            <div>
              <h2 className='text-ink font-serif text-4xl leading-tight font-normal sm:text-5xl'>
                {t('projects.header.title')}
              </h2>
              <p className='text-ink-muted mt-3 max-w-xl text-sm sm:text-base'>{t('projects.header.desc')}</p>
            </div>

            <div className='flex flex-wrap items-center gap-3'>
              <Button variant='primary' size='md'>
                {t('projects.header.btnAdd')}
              </Button>
            </div>
          </div>
        </div>

        <div className='border-b-retro border-ink flex flex-col items-center justify-between gap-4 bg-white px-6 py-4 sm:flex-row md:px-12'>
          <div className='flex w-full items-center gap-2 overflow-x-auto pb-2 sm:w-auto sm:pb-0'>
            <span className='text-ink-muted mr-1 text-xs font-bold uppercase'>{t('projects.filter.label')}</span>
            {['all', 'Java', 'TypeScript', 'Rust', 'C'].map((filterLang) => (
              <button
                key={filterLang}
                onClick={() => setSelectedLanguage(filterLang)}
                className={`border-ink cursor-pointer rounded-sm border px-3 py-1 text-xs font-bold transition-all ${
                  selectedLanguage === filterLang
                    ? 'bg-primary text-ink shadow-retro-sm'
                    : 'text-ink hover:bg-surface-hover bg-white'
                }`}
              >
                {filterLang === 'all' ? t('projects.filter.all') : filterLang}
              </button>
            ))}
          </div>

          <div className='w-full sm:w-64'>
            <input
              type='text'
              placeholder={t('projects.filter.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='border-ink bg-paper focus:ring-primary w-full rounded-sm border px-3 py-1.5 text-xs focus:ring-1 focus:outline-none'
            />
          </div>
        </div>

        <div className='mx-auto max-w-7xl p-6 sm:p-10 md:p-12'>
          <div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {showSkeletons
              ? Array.from({ length: 3 }).map((_, idx) => <SkeletonCard key={`skel-repo-${idx}`} />)
              : otherRepos.map((repo) => (
                  <Card
                    key={repo.id}
                    className='group flex h-auto min-h-75 flex-col justify-between bg-white p-6 sm:p-7'
                  >
                    <div>
                      <div className='border-ink/10 mb-3 flex items-center justify-between border-b pb-2.5'>
                        <span className='text-xxs text-ink-muted font-mono'>{repo.owner} /</span>
                        <span className='text-xxs bg-paper border-ink shadow-retro-xs rounded border px-1.5 py-0.5 font-mono font-bold'>
                          ★ {repo.stars}
                        </span>
                      </div>

                      <h4 className='text-ink group-hover:text-accent mb-2 font-serif text-2xl font-bold transition-colors'>
                        {repo.name}
                      </h4>

                      <p className='text-ink-muted mb-6 text-xs leading-relaxed sm:text-sm'>
                        {repo.tlKey ? t(repo.tlKey) : repo.description}
                      </p>
                    </div>

                    <div>
                      <div className='mb-5 flex flex-wrap gap-1.5'>
                        {repo.languages.map((l) => (
                          <Badge key={l} variant='default' dotColor={LANGUAGE_COLORS[l] || '#cfa7e8'} size='sm'>
                            {l}
                          </Badge>
                        ))}
                      </div>

                      <div className='border-ink/10 flex items-center justify-between border-t pt-3'>
                        <span className='text-ink-muted flex items-center font-mono text-xs'>
                          <IconGitFork size={16} /> {repo.forks} {t('projects.card.forks')}
                        </span>
                        <Button variant='secondary' size='sm' href={repo.url} target='_blank' rel='noopener noreferrer'>
                          {t('projects.card.viewGithub')}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
          </div>
        </div>
      </section>

      <section id='contributions' className='border-b-retro border-ink bg-paper w-full'>
        <div className='border-b-retro border-ink bg-paper p-8 sm:p-12 md:p-16'>
          <div className='mx-auto max-w-6xl'>
            <div className='mb-3'>
              <Badge variant='accent' dotColor='#241c15'>
                {t('projects.contrib.badge')}
              </Badge>
            </div>
            <h2 className='text-ink font-serif text-4xl leading-tight font-normal sm:text-5xl'>
              {t('projects.contrib.title')}
            </h2>
            <p className='text-ink-muted mt-3 max-w-2xl text-sm sm:text-base'>{t('projects.contrib.desc')}</p>
          </div>
        </div>

        <div className='mx-auto max-w-7xl p-6 sm:p-10 md:p-12'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            {showSkeletons
              ? Array.from({ length: 2 }).map((_, idx) => <SkeletonCard key={`skel-contrib-${idx}`} />)
              : contribRepos.map((contrib) => (
                  <Card
                    key={contrib.id}
                    className='group relative flex flex-col justify-between overflow-hidden bg-white p-6 sm:p-8'
                  >
                    <div>
                      <div className='mb-4 flex items-center justify-between gap-2'>
                        <Badge variant='dark' size='sm'>
                          {contrib.owner}
                        </Badge>
                        <span className='bg-paper border-ink shadow-retro-xs rounded border px-2 py-0.5 font-mono text-xs font-bold'>
                          ★ {contrib.stars}
                        </span>
                      </div>

                      <h3 className='text-ink group-hover:text-accent mb-2 font-serif text-2xl font-bold transition-colors sm:text-3xl'>
                        {contrib.name}
                      </h3>

                      {contrib.role && (
                        <div className='text-accent mb-3 flex items-center gap-1.5 font-mono text-xs font-bold'>
                          <span>⚡</span> {contrib.roleTlKey ? t(contrib.roleTlKey) : contrib.role}
                        </div>
                      )}

                      <p className='text-ink-muted mb-6 text-xs leading-relaxed sm:text-sm'>
                        {contrib.tlKey ? t(contrib.tlKey) : contrib.description}
                      </p>
                    </div>

                    <div>
                      <div className='border-ink/10 mb-6 flex flex-wrap gap-1.5 border-t pt-4'>
                        {contrib.languages.map((l) => (
                          <Badge key={l} variant='default' dotColor={LANGUAGE_COLORS[l] || '#b07219'} size='sm'>
                            {l}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        variant='secondary'
                        size='md'
                        href={contrib.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='w-full'
                      >
                        {t('projects.card.viewGithub')}
                      </Button>
                    </div>
                  </Card>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsSection;
