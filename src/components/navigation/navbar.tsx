import logo from '@/assets/img/svg/logo.svg';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Dialog, DialogClose, DialogCloseButton, DialogContent, DialogTrigger } from '@/components/ui/dialog/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

const pages = [
  { name: '/home', path: '/' },
  { name: '/blog', path: '/blog' },
  { name: '/projects', path: '/projects' },
  { name: '/contact', path: '/contact' },
];
const isActive = (page: string, currentPage: string) =>
  page === currentPage ? 'decoration-wavy decoration-1 underline' : '';

export const NavBar = ({ currentPage }: { currentPage: string }) => {
  return (
    <div className='px-8 py-4 flex items-center sm:items-end justify-between align-middle'>
      <a href='/'>
        <img src={logo.src} alt='Lunna Logo' className='w-48' />
      </a>

      <nav>
        <ul className='gap-4 font-serif text-3xl hidden sm:flex'>
          {pages.map((page) => (
            <li key={page.name} className={`${isActive(page.name, currentPage)} decoration-wavy decoration-1 `}>
              <a href={page.path} className='hover:underline transition-[text-decoration] duration-300'>
                {page.name}
              </a>
            </li>
          ))}
        </ul>
        <NavBarMobileDialog currentPage={currentPage} />
      </nav>
    </div>
  );
};

export const NavBarMobileDialog = ({ currentPage }: { currentPage: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <HamburgerMenuIcon className='w-8 h-8 sm:hidden cursor-pointer' />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Where are we going today?</DialogTitle>
        <DialogClose asChild>
          <ul className='flex flex-col gap-4 font-serif text-3xl mt-4'>
            {pages.map((page) => (
              <li key={page.name} className={`${isActive(page.name, currentPage)} decoration-wavy decoration-1 `}>
                <a href={page.path} className='hover:underline transition-[text-decoration] duration-300'>
                  {page.name}
                </a>
              </li>
            ))}
          </ul>
        </DialogClose>
        <DialogCloseButton />
      </DialogContent>
    </Dialog>
  );
};
