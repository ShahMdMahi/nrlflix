import React, { useRef } from 'react';
import Card from './Card';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

const HorizontalScrollCard = ({ data = [], heading, trending, media_type }) => {

    const containerRef = useRef();

    const handleNext = () => {
        containerRef.current.scrollLeft += 300
    };

    const handlePrevious = () => {
        containerRef.current.scrollLeft -= 300
    };

    return (
        <div className='container mx-auto px-3 my-10'>
            <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>{heading}</h2>

            <div className='relative'>
                <div ref={containerRef} className='grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col overflow-hidden overflow-x-scroll gap-6 relative z-10 scroll-smooth transition-all scrollbar-none'>
                    {
                        data.map((data, index) => {
                            return (
                                <Card key={data.id + "heading" + index} data={data} index={index + 1} trending={trending} media_type={media_type} />
                            )
                        })
                    }
                </div>

                <div className='absolute top-0 hidden lg:flex justify-between w-full h-full items-center'>
                    <button onClick={handlePrevious} className='bg-white p-1 text-black rounded-full -ml-2 z-10'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleNext} className='bg-white p-1 text-black rounded-full -mr-2 z-10'>
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HorizontalScrollCard;