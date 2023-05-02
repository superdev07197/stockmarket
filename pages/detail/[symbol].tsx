
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

const Detail = () => {
  const [overview, setOverview] = useState();
  const router = useRouter();
  const { symbol } = router.query;

  const fetchDetail = async (symbol: string) => {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const jsonData = await res.json();
    setOverview(jsonData);
  };

  useEffect(() => {
    fetchDetail(symbol as string);
  }, [symbol]);

  return (
    <Layout>
        <div className='border-gray-350 flex justify-between border-b-2 pb-2'>
            <span className='font-bold'>{overview.title}</span>
            <span className={`text-gray-400`}>{overview.value}</span>
        </div>        
    </Layout>
  );
};

export default Detail;
