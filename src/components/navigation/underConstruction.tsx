import { Emoji } from '../ui/emoji';

export const UnderConstruction = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-5xl font-bold mb-4'>
        <Emoji name='fence' size={[48, 48]} /> Under Construction <Emoji name='fence' size={[48, 48]} />
      </h1>
      <p className='text-xl text-gray-700'>This page is currently being worked on. Please check back later!</p>
    </div>
  );
};
