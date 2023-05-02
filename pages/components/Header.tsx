import React from 'react';
interface HeaderProp {
  title: string;
}
const HeaderComponent: React.FC<HeaderProp> = ({ title }) => {
  return (
    <h1 className='mb-8 text-gray-300 first-letter:text-5xl first-letter:font-bold first-letter:text-white first-line:uppercase first-line:tracking-widest dark:text-gray-400 dark:first-letter:text-gray-100 md:first-letter:text-7xl'>
      {title}
    </h1>
  );
};

export default HeaderComponent;
