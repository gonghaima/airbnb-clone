import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Inter } from '@next/font/google';
import Header from '../components/Header';
import Banner from '../components/Banner';
import { ILiveAnywhere, IExplore } from '../types';
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';
import LargeCard from '../components/LargeCard';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  exploreData: IExplore[];
  cardData: ILiveAnywhere[];
};

export default function Home({ exploreData, cardData }: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>Airbnb clone</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      {/* main section*/}
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Expore Nearby</h2>
          {/* Pull some data from a server - A
          PI endpoint */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(({ img, distance, location }) => (
              <SmallCard
                key={img}
                img={img}
                distance={distance}
                location={location}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardData?.map(({ img, title }) => (
              <MediumCard key={img} img={img} title={title} />
            ))}
          </div>
        </section>
        <LargeCard
          description="Wishlists curated by Airbnb."
          buttonText="Get Inspired"
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
        />
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  exploreData: IExplore[];
}> = async () => {
  // must be async
  // const exploreDataMock = await fetch('https://links.papareact.com/pyp').then(
  //   (res) => res.json()
  // );
  // [{"img":"https://links.papareact.com/5j2","location":"London","distance":"45-minute drive"},{"img":"https://links.papareact.com/1to","location":"Manchester","distance":"4.5-hour drive"},{"img":"https://links.papareact.com/40m","location":"Liverpool","distance":"4.5-hour drive"},{"img":"https://links.papareact.com/msp","location":"York","distance":"4-hour drive"},{"img":"https://links.papareact.com/2k3","location":"Cardiff","distance":"45-minute drive"},{"img":"https://links.papareact.com/ynx","location":"Birkenhead","distance":"4.5-hour drive"},{"img":"https://links.papareact.com/kji","location":"Newquay","distance":"6-hour drive"},{"img":"https://links.papareact.com/41m","location":"Hove","distance":"2-hour drive"}]
  const exploreData = await fetch('https://www.jsonkeeper.com/b/32SI').then(
    (res) => res.json()
  );

  // const cardData = await fetch('https://links.papareact.com/zp1').then(
  // [{"img":"https://links.papareact.com/2io","title":"Outdoor getaways"},{"img":"https://links.papareact.com/q7j","title":"Unique stays"},{"img":"https://links.papareact.com/s03","title":"Entire homes"},{"img":"https://links.papareact.com/8ix","title":"Pet allowed"}]
  const cardData = await fetch('https://www.jsonkeeper.com/b/VHHT').then(
    (res) => res.json()
  );
  return {
    props: {
      exploreData,
      cardData,
    },
  };
};
