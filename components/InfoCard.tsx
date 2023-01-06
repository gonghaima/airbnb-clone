import React from 'react';
import Image from 'next/legacy/image';
import { IGreatestOutdoors, SearchResult } from '../types';
import { HeartIcon, StarIcon } from '@heroicons/react/solid';

const InfoCard = (props: SearchResult) => {
  const { img, location, title, description, star, price, total } = props;
  console.log({ img, location });
  return (
    <div className="flex py-7 px-2 pr-4 border-b cursor-pointer 
    hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
        <Image
          src={img}
          alt="info card image"
          layout="fill"
          objectFit="cover"
          className='rounded-2xl'
        />
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex">
          <p>{location}</p>
          <HeartIcon className="h-7 cursor-pointer" />
        </div>
        <h4 className="text-xl">{title}</h4>
        <div className="border-b w-10 pt-3" />
        <p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>
        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" />
            {star}
          </p>
          <div>
            <p className='text-lg lg:text-2xl font-semibold pb-2'>{price}</p>
            <p className='text-right font-extralight'>{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
