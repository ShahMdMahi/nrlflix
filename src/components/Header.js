/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import userIcon from '../assets/user.png';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { navigation } from '../constants/navigation';


const Header = () => {

    const location = useLocation();
    const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
    const [searchInput, setSearchInput] = useState(removeSpace);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        if (searchInput) {
            navigate(`/search?q=${searchInput}`);
        }
    }, [searchInput]);

    return (
        <header className='fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40'>
            <div className='container mx-auto px-4 flex items-center h-full'>
                <NavLink key={"Home"} to={"/"}>
                    <img
                        src={logo}
                        alt='NRLFLIX'
                        width={120}
                    />
                </NavLink>

                <nav className='hidden lg:flex items-center gap-1 ml-5'>
                    {
                        navigation.map((nav, index) => {
                            return (
                                <div>
                                    <NavLink key={nav.label} to={nav.href} className={({ isActive }) => `px-2 hover:text-neutral-100 ${isActive && 'text-neutral-100'}`}>
                                        {nav.label}
                                    </NavLink>
                                </div>
                            )
                        })
                    }
                </nav>

                <div className='ml-auto flex items-center gap-5'>
                    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
                        <input
                            type='text'
                            placeholder='Search here...'
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                            className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block'
                        />
                        <button className='text-2xl text-white'>
                            <IoSearchOutline />
                        </button>
                    </form>
                    <div className='h-8 w-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all'>
                        <img
                            src={userIcon}
                            alt='user'
                            className='h-full w-full'
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;