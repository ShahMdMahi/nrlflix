/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BannerHome = () => {

  const [currentImage, setCurrentImage] = useState(0);

  const bannerData = useSelector(state => state.nrlflixData.bannerData);
  const imageURL = useSelector(state => state.nrlflixData.imageURL);

  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage(preve => preve + 1)
    }
  };

  const handlePrev = () => {
    if (currentImage > 0) {
      setCurrentImage(preve => preve - 1)
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }

    }, 5000);

    return () => clearInterval(interval);

  }, [bannerData, imageURL, currentImage]);

  return (
    <section className='w-full h-full'>
      <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
        {
          bannerData.map((data, index) => {
            return (
              <div key={data + "bannerHome" + index} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all' style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                <div className='h-full w-full'>
                  <img
                    src={imageURL + data.backdrop_path}
                    alt={imageURL + data.backdrop_path}
                    className='h-full w-full object-cover'
                  />
                </div>

                {/* Next & Prev Button */}
                <div className='absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex'>
                  <button onClick={handlePrev} className='bg-white p-1 rounded-full text-2xl z-10 text-black'>
                    <FaAngleLeft />
                  </button>
                  <button onClick={handleNext} className='bg-white p-1 rounded-full text-2xl z-10 text-black'>
                    <FaAngleRight />
                  </button>
                </div>

                <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>

                <div className='container mx-auto'>
                  <div className=' w-full absolute bottom-0 max-w-md px-3'>
                    <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>{data?.title || data?.name}</h2>
                    <p className='text-ellipsis line-clamp-3 my-2'>{data.overview}</p>
                    <div className='flex items-center gap-4'>
                      <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                      <span>|</span>
                      <p>View: {Number(data.popularity).toFixed(0)}+</p>
                    </div>
                    <Link to={"/" + data?.media_type + "/" + data?.id} >
                      <button className='bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'>Play Now</button>
                    </Link>
                  </div>
                </div>

              </div>
            )
          })
        }



      </div>
    </section>
  );
}

export default BannerHome;