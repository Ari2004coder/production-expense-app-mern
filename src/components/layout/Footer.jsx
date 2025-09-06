import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-gray-800 text-white py-6 text-center'>
      <div className='container mx-auto px-4'>
        <p className='text-sm'>
          &copy; {currentYear} Roy&company. All rights reserved.
        </p>
        {/* Optional: Add social media links or other content here */}
      </div>
    </footer>
  );
}

export default Footer;