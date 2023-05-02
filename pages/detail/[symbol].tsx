import { faLineChart } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ViewList from '@/components/Detail';
import Layout from '@/components/Layout';

import { IDetail } from '@/types/detail';

const Detail = () => {
  const [overview, setOverview] = useState<IDetail>();

  const router = useRouter();
  const { symbol } = router.query;

  const fetchDetail = async (symbol: string) => {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const jsonData = await res.json();
    console.log(jsonData.Note);
    setOverview(jsonData);
  };

  useEffect(() => {
    fetchDetail(symbol as string);
  }, [symbol]);

  return (
    <Layout>
      {overview &&
        (overview.Note ? (
          <>
            <h1 className='mx-10 text-center text-white'>{overview.Note}</h1>
          </>
        ) : (
          <div className='relative m-auto rounded-lg bg-white p-6 shadow-lg  shadow-cyan-500/70 dark:bg-neutral-700 md:w-9/12'>
            <div className='mb-8 text-slate-800'>
              <span className=' pb-6 text-4xl font-medium'>
                {overview?.Name}
              </span>
              <p className='pt-6'>{overview?.Description}</p>
            </div>
            <div className='grid grid-cols-1 gap-6 shadow-zinc-200 md:grid-cols-2'>
              <ViewList title='Symbol' value={overview?.Symbol} />
              <ViewList title='Sector' value={overview?.Sector} />
              <ViewList title='Country' value={overview?.Country} />
              <ViewList title='Industry' value={overview?.Industry} />
              <ViewList
                title='52WeekHigh/Low'
                value={`${overview?.['52WeekHigh']}/${overview?.['52WeekLow']}${overview?.Currency}`}
              />
              <ViewList title='PEGRatio' value={overview?.PEGRatio} />
              <ViewList
                title='SharesOutstanding'
                value={overview?.SharesOutstanding}
              />
              <ViewList
                title='MarketCapitalization'
                value={overview?.MarketCapitalization}
              />
              <ViewList title='ForwardPE' value={overview?.ForwardPE} />
              <ViewList
                title='ExDividendDate'
                value={overview?.ExDividendDate}
              />
              <ViewList title='DividendDate' value={overview?.DividendDate} />
              <ViewList
                title='Address'
                addClass='ml-5'
                value={overview?.Address}
              />
            </div>
          </div>
        ))}
      <div className='absolute bottom-0 left-0 px-3 py-2 text-white'>
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => router.back()}
          className='cursor-pointer rounded-full bg-cyan-500 p-[1.22rem] text-white shadow-lg shadow-cyan-500/50 focus:md:p-5'
        />
      </div>
    </Layout>
  );
};

export default Detail;
