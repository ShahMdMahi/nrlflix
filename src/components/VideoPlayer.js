/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import { IoClose } from 'react-icons/io5';
import useFetchDetails from '../hooks/useFetchDetails';

const VideoPlayer = ({ data, close, media_type }) => {

  const { data: videoData } = useFetchDetails(`/${media_type}/${data?.id}/videos`);

  return (
    <section className='fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-black w-full max-h-[90vh] max-w-screen-lg aspect-video rounded relative m-1'>
        <button onClick={close} className='absolute -right-1 -top-6 z-50 text-3xl'>
          <IoClose />
        </button>

        <iframe
          src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}?modestbranding=1&;showinfo=0&;autohide=1&;rel=0;&autoplay=1;&controls=0;`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowfullscreen
          frameBorder='0'
          className='w-full h-full rounded'
        />

      </div>

    </section>
  );
}

export default VideoPlayer;