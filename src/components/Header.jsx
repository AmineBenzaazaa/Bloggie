import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react'

// ** media
import Logo from '../assets/_logo';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const store = useSelector(state => state.auth);
    const [user, setUser] = useState(store.user);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true)
            setUser(store.user);
        }
    }, [localStorage.getItem('token'), Object.keys(store.user).length])
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setIsAuthenticated(false)
    }
    return (
        <nav className="flex justify-between p-5 max-w-7xl mx-auto whitespace-nowrap">
            <div className="flex items-center space-x-5">
                <Link to='/'>
                    <img className="w-44 object-contain cursor-pointer" src={Logo} alt="Blogie logo" />
                </Link>
                <div className="hidden md:inline-flex items-center space-x-5">
                    <Link className='cursor-pointer' to="/NewsAPI">NewsAPI</Link>
                    {/* <Link className='cursor-pointer' to="/OpenNews">OpenNews</Link> */}
                    {/* <Link className='cursor-pointer' to="/NewsCred">NewsCred</Link> */}
                    <Link className='cursor-pointer' to="/TheGuardian">The Guardian</Link>
                    <Link className='cursor-pointer' to="/NewYorkTimes">New York Times</Link>
                    <Link className='cursor-pointer' to="/BBCNews">BBC News</Link>
                </div>
            </div>
            {!isAuthenticated ? <div className="flex items-center space-x-5 text-blue-600 ">
                <h3> <Link to="/sign-in"> Sign In</Link></h3>
                <h3 className="border px-4 py-1 rounded-full border-blue-600 hover:bg-blue-600 hover:text-white duration-300"><Link to="/sign-up"> Get Started</Link></h3>
            </div> : <Menu as="div" className="relative">
                <div>
                    <Menu.Button className="flex flex-row gap-2 justify-center items-center rounded-full">
                      <span className="sr-only">Open user menu</span>
                      <div className='w-8 h-8 bg-gray-200 rounded-full text-xs flex justify-center items-center uppercase'>{user?.name?.slice(0, 2)}</div>
                      <div className='hidden lg:block text-start'>
                        <span className='block text-sm font-semibold text-gray-800 capitalize'>{user?.name}</span>
                        <span className='block text-xs text-gray-400'>{user?.email}</span>
                      </div>
                    </Menu.Button>

                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-start">
                        <Menu.Item className='border-b'>
                            {({ active }) => (
                                <Link
                                    to="/sign-in"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm')}
                                    onClick={logout}
                                >
                                    <span className='font-semibold'>
                                        Logout
                                    </span>
                                </Link>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>}
        </nav>
    )
}

export default Header