const Footer = () => {
  return (
    <footer>
      <hr className='border-t border-gray-300 mx-4' />
      <p className='text-center text-sm text-gray-600 py-4'>
        &copy; {new Date().getFullYear()} Lunna. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
