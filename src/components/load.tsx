import { useEffect, useState } from 'react'

export default function Load() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timeout1 = setTimeout(() => {
      document.body.style.overflow = 'auto';
      const loader = document.querySelector('#Loader');
      if (!loader) return;
      loader.classList.add('desaparecer');
    }, 500);
    const timeout2 = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <div className='fixed flex flex-col w-screen h-screen bg-linear-60 from-primary to-blue-800 z-9999 items-center justify-center' id='Loader'>
      <div className='flex flex-col justify-start items-start w-fit'>
        <h1 className='text-6xl font-bold text-white'>DANDA</h1>
        <div className='loading h-2 bg-white' />
      </div>
    </div>
  )
}
