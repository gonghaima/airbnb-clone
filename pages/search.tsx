import { NextRouter, useRouter } from 'next/router';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { format } from 'date-fns';
import { GetServerSideProps } from 'next';
import { SearchResult } from '../types';
import InfoCard from '../components/infoCard';

type Props = {
  searchResults: SearchResult[];
};

export default function Search({ searchResults }: Props) {
  const router: NextRouter = useRouter();

  const { location, startDate, endDate, noOfGuests } = router.query;

  const formattedStartDate = format(
    new Date(startDate as string),
    'dd MMMM yy'
  );
  const formattedEndDate = format(new Date(endDate as string), 'dd MMMM yy');
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p>
            300+ Stays - {range} for {noOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
          <div className="flex flex-col">
            {searchResults.map((item) => (
              <InfoCard key={item.img} {...item} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const searchResults = await fetch('https://links.papareact.com/isz');
  const jsonRes = await fetch('https://www.jsonkeeper.com/b/5NPS');
  const searchResults = await jsonRes.json();
  return {
    props: {
      searchResults,
    },
  };
};
