import { create } from 'zustand';

export interface RepoItem {
  id: string;
  fullName: string;
  name: string;
  owner: string;
  description: string;
  languages: string[];
  url: string;
  stars: number;
  forks: number;
  isContrib?: boolean;
  isFeatured?: boolean;
  role?: string;
  roleTlKey?: string;
  highlightTag?: string;
  tagTlKey?: string;
  tlKey?: string;
}

export interface RepoConfig {
  fullName: string;
  isContrib?: boolean;
  isFeatured?: boolean;
  role?: string;
  roleTlKey?: string;
  highlightTag?: string;
  tagTlKey?: string;
  defaultDescription?: string;
  defaultLanguages?: string[];
  defaultStars?: number;
  tlKey?: string;
}

export const INITIAL_REPO_CONFIGS: RepoConfig[] = [
  {
    fullName: 'Nookure/NookTheme',
    isFeatured: true,
    highlightTag: '✦ Pterodactyl Theme',
    tagTlKey: 'featured.tag.nooktheme',
    tlKey: 'repo.desc.nooktheme',
    defaultDescription:
      'Ecosistema de temas modernos, interfaces de usuario y componentes web altamente personalizables para plataformas y tiendas de Nookure.',
    defaultLanguages: ['TypeScript', 'React', 'Tailwind CSS'],
    defaultStars: 256,
  },
  {
    fullName: 'Nookure/NookureStaff',
    isFeatured: true,
    highlightTag: '✦ PaperMC Plugin',
    tagTlKey: 'featured.tag.nookurestaff',
    tlKey: 'repo.desc.nookurestaff',
    defaultDescription: 'NookureStaff is the most advanced staff utilities plugin for Minecraft servers.',
    defaultLanguages: ['Java'],
    defaultStars: 14,
  },
  {
    fullName: 'Lunna5/daiana',
    isFeatured: true,
    highlightTag: '✦ Websocket Relay Server',
    tagTlKey: 'featured.tag.daiana',
    tlKey: 'repo.desc.daiana',
    defaultDescription:
      'A fast, lightweight, and concurrent room-based binary WebSocket relay server built with Rust and Actix Web. ',
    defaultLanguages: ['Rust', 'TypeScript', 'Java'],
    defaultStars: 0,
  },
  {
    fullName: 'PaperMC/Velocity',
    isContrib: true,
    role: 'Contributed to the creation of the /send command',
    roleTlKey: 'contrib.role.velocity',
    tlKey: 'repo.desc.velocity',
    defaultDescription: 'The modern, next-generation Minecraft server proxy.',
    defaultLanguages: ['Java'],
    defaultStars: 2800,
  },
  {
    fullName: 'EssentialsX/Essentials',
    isContrib: true,
    role: 'Little patches and bug fixes',
    roleTlKey: 'contrib.role.essentials',
    tlKey: 'repo.desc.essentials',
    defaultDescription: 'The modern Essentials suite for Spigot and Paper.',
    defaultLanguages: ['Java'],
    defaultStars: 4500,
  },
  {
    fullName: 'Lunna5/lv220c',
    isFeatured: false,
    isContrib: false,
    defaultDescription:
      'A tool which compiles standard Valve 220 .map files (the brush-based geometry format commonly used in level editors like TrenchBroom, Hammer, or Radiant) into a custom, highly optimized binary map format named .lun',
    defaultLanguages: ['C'],
    defaultStars: 34,
  },
];

const CACHE_STORAGE_KEY = 'lunna_portfolio_repos_cache_v3';
const CACHE_TTL_MS = 1000 * 60 * 60 * 2; // 2 horas de caché

function loadLocalCache(): { repos: RepoItem[]; timestamp: number } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp < CACHE_TTL_MS && Array.isArray(parsed.repos)) {
      return parsed;
    }
  } catch (err) {
    console.warn('Error leyendo caché de repositorios:', err);
  }
  return null;
}

function saveLocalCache(repos: RepoItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(
      CACHE_STORAGE_KEY,
      JSON.stringify({
        repos,
        timestamp: Date.now(),
      }),
    );
  } catch (err) {
    console.warn('Error guardando caché de repositorios:', err);
  }
}

async function fetchRepoFromGitHub(config: RepoConfig): Promise<RepoItem> {
  const [owner, repo] = config.fullName.split('/');
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!res.ok) {
      throw new Error(`GitHub API error ${res.status}`);
    }

    const data = await res.json();

    // Intentar traer los lenguajes detallados
    let languages = config.defaultLanguages || [];
    try {
      const langRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
      if (langRes.ok) {
        const langData = await langRes.json();
        const topLangs = Object.keys(langData).slice(0, 4);
        if (topLangs.length > 0) {
          languages = topLangs;
        }
      }
    } catch {
      // Ignorar fallo de lenguajes secundarios
    }

    if (languages.length === 0 && data.language) {
      languages = [data.language];
    }

    return {
      id: config.fullName.toLowerCase(),
      fullName: config.fullName,
      name: data.name || repo,
      owner: data.owner?.login || owner,
      description: data.description || config.defaultDescription || 'Sin descripción disponible.',
      languages: languages.length > 0 ? languages : ['TypeScript'],
      url: data.html_url || `https://github.com/${owner}/${repo}`,
      stars: typeof data.stargazers_count === 'number' ? data.stargazers_count : config.defaultStars || 0,
      forks: typeof data.forks_count === 'number' ? data.forks_count : 0,
      isContrib: config.isContrib,
      isFeatured: config.isFeatured,
      role: config.role,
      roleTlKey: config.roleTlKey,
      highlightTag: config.highlightTag,
      tagTlKey: config.tagTlKey,
      tlKey: config.tlKey,
    };
  } catch (e) {
    // Retornar fallback con datos configurados en caso de rate-limit o sin conexión
    return {
      id: config.fullName.toLowerCase(),
      fullName: config.fullName,
      name: repo,
      owner: owner,
      description: config.defaultDescription || 'Proyecto de código abierto.',
      languages: config.defaultLanguages || ['Java'],
      url: `https://github.com/${owner}/${repo}`,
      stars: config.defaultStars || 25,
      forks: 5,
      isContrib: config.isContrib,
      isFeatured: config.isFeatured,
      role: config.role,
      roleTlKey: config.roleTlKey,
      highlightTag: config.highlightTag,
      tagTlKey: config.tagTlKey,
      tlKey: config.tlKey,
    };
  }
}

// Convertir configs iniciales en items iniciales para SSR
const INITIAL_FALLBACK_REPOS: RepoItem[] = INITIAL_REPO_CONFIGS.map((cfg) => {
  const [owner, repo] = cfg.fullName.split('/');
  return {
    id: cfg.fullName.toLowerCase(),
    fullName: cfg.fullName,
    name: repo,
    owner,
    description: cfg.defaultDescription || '',
    languages: cfg.defaultLanguages || ['TypeScript'],
    url: `https://github.com/${cfg.fullName}`,
    stars: cfg.defaultStars || 0,
    forks: 10,
    isContrib: cfg.isContrib,
    isFeatured: cfg.isFeatured,
    role: cfg.role,
    roleTlKey: cfg.roleTlKey,
    highlightTag: cfg.highlightTag,
    tagTlKey: cfg.tagTlKey,
    tlKey: cfg.tlKey,
  };
});

interface RepoStore {
  repos: RepoItem[];
  configs: RepoConfig[];
  isLoading: boolean;
  isInitialLoad: boolean;
  selectedLanguage: string;
  searchQuery: string;
  fetchRepos: (forceRefresh?: boolean) => Promise<void>;
  addRepo: (fullName: string, isContrib?: boolean) => Promise<boolean>;
  setSelectedLanguage: (lang: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useRepoStore = create<RepoStore>((set, get) => ({
  repos: INITIAL_FALLBACK_REPOS,
  configs: INITIAL_REPO_CONFIGS,
  isLoading: false,
  isInitialLoad: true,
  selectedLanguage: 'all',
  searchQuery: '',

  setSelectedLanguage: (lang: string) => set({ selectedLanguage: lang }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),

  fetchRepos: async (forceRefresh = false) => {
    // 1. Revisar caché en localStorage
    if (!forceRefresh) {
      const cached = loadLocalCache();
      if (cached && cached.repos.length > 0) {
        set({
          repos: cached.repos,
          isLoading: false,
          isInitialLoad: false,
        });
        return;
      }
    }

    set({ isLoading: true });

    // Simular un delay mínimo de 400ms para mostrar suavemente el skeleton
    const configs = get().configs;
    const fetchPromises = configs.map((cfg) => fetchRepoFromGitHub(cfg));

    try {
      const [results] = await Promise.all([
        Promise.all(fetchPromises),
        new Promise((resolve) => setTimeout(resolve, 500)),
      ]);

      saveLocalCache(results);
      set({
        repos: results,
        isLoading: false,
        isInitialLoad: false,
      });
    } catch (err) {
      console.error('Error fetching repos from GitHub:', err);
      set({ isLoading: false, isInitialLoad: false });
    }
  },

  addRepo: async (rawFullName: string, isContrib = false) => {
    const trimmed = rawFullName.trim().replace(/^https?:\/\/github\.com\//, '');
    const parts = trimmed.split('/');
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      return false;
    }

    const formattedFullName = `${parts[0]}/${parts[1]}`;
    const currentRepos = get().repos;

    // Verificar si ya existe
    if (currentRepos.some((r) => r.fullName.toLowerCase() === formattedFullName.toLowerCase())) {
      return true;
    }

    const newConfig: RepoConfig = {
      fullName: formattedFullName,
      isContrib,
      defaultDescription: 'Repositorio agregado dinámicamente.',
      defaultLanguages: ['TypeScript'],
    };

    set({ isLoading: true });

    const newRepoItem = await fetchRepoFromGitHub(newConfig);
    const updated = [newRepoItem, ...currentRepos];
    const updatedConfigs = [newConfig, ...get().configs];

    saveLocalCache(updated);

    set({
      repos: updated,
      configs: updatedConfigs,
      isLoading: false,
    });

    return true;
  },
}));
