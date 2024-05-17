import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchDetails from '../hooks/useFetchDetails';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Divider from '../components/Divider';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import useFetch from '../hooks/useFetch';

const DetailsPage = () => {

  const params = useParams();
  const imageURL = useSelector(state => state.nrlflixData.imageURL);

  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetails(`/${params?.explore}/${params?.id}/credits`);
  const { data: similar } = useFetch(`/${params?.explore}/${params?.id}/similar`);
  const { data: recommendations } = useFetch(`/${params?.explore}/${params?.id}/recommendations`);

  const duration = `${Math.floor(data?.runtime / 60)}h ${data?.runtime % 60}m`;
  const director = castData?.crew?.filter(el => el.job === "Director").map(el => el?.name)?.join(", ");
  const writer = castData?.crew?.filter(el => el.job === "Writer").map(el => el?.name)?.join(", ");

  return (
    <div>
      <div className='w-full h-[280px] relative'>
        <div className='w-full h-full'>
          <img
            src={imageURL + data?.backdrop_path}
            alt={imageURL + data?.backdrop_path}
            className='h-full w-full object-cover'
          />
        </div>
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900 to-transparent'></div>
      </div>

      <div className='container mx-auto px-3 flex flex-col lg:flex-row gap-5 lg:gap-10'>
        <div className='relative mx-auto -mt-36 lg:-mt-28 lg:mx-0 w-fit min-w-60'>
          <img
            src={imageURL + data?.poster_path}
            alt={imageURL + data?.poster_path}
            className='h-80 w-60 object-cover rounded'
          />
        </div>

        <div>
          <h2 className='text-2xl lg:text-4xl font-bold text-white'>{data?.title || data?.name}</h2>

          <p className='text-neutral-400'>{data?.tagline}</p>

          <Divider />

          <div className='flex items-center my-3 gap-3'>
            <p>
              Rating : {Number(data?.vote_average).toFixed(1)}+
            </p>
            <span>|</span>
            <p>
              View : {data?.vote_count}+
            </p>
            <span>|</span>
            <p>
              Duration : {duration}
            </p>
          </div>

          <Divider />

          <div>
            <h3 className='text-xl font-bold text-white nb-1'>Overiew : </h3>
            <p>{data?.overview}</p>

            <Divider />

            <div className='flex items-center gap-3 my-3 text-center'>
              <p>
                Status : {data?.status}
              </p>
              <span>|</span>
              <p>
                Release Date : {moment(data?.release_date).format("MMMM Do YYYY")}
              </p>
            </div>

            <Divider />

            <div className='flex items-center gap-3 my-3 text-center'>
              <p>
                Budget : ${Number(data?.budget)}
              </p>
              <span>|</span>
              <p>
                Revenue : ${Number(data?.revenue)}
              </p>
            </div>

            <Divider />

          </div>

          <div>
            <p>
              <span className='text-white'>Director</span> : {director}
            </p>

            <Divider />

            <p>
              <span className='text-white'>Writer</span> : {writer}
            </p>
          </div>

          <Divider />

          <h2 className='font-bold text-lg mb-4'>Star Cast : </h2>
          <div className='grid grid-cols-[repeat(auto-fit,96px)] justify-center gap-5'>
            {
              castData?.cast?.filter(el => el?.profile_path).map((starCast, index) => {
                return (
                  <div>
                    <div>
                      <img
                        src={imageURL + starCast?.profile_path}
                        alt={imageURL + starCast?.profile_path}
                        className='w-24 h-24 object-cover rounded-full'
                      />
                    </div>
                    <p className='font-bold text-center text-sm text-neutral-400'>{starCast?.name}</p>
                  </div>
                )
              })
            }
          </div>

        </div>

      </div>

      <div>
        <HorizontalScrollCard data={similar} heading={`Similar ${params?.explore}`} media_type={params?.explore} />
        <HorizontalScrollCard data={recommendations} heading={`Recommended ${params?.explore}`} media_type={params?.explore} />
      </div>

    </div>
  );
}

export default DetailsPage;