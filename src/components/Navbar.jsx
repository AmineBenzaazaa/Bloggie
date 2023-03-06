
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import notification from '../assets/notification.svg'
import ReactCountryFlag from 'react-country-flag'
import { useTranslation } from 'react-i18next'
import settings from '../assets/settings.svg'
import policies from '../assets/policies.svg'
import logout from '../assets/logout.svg'
import avatar from '../assets/avatar.svg'

const navigation = [
  { name: 'Dashboard', href: 'dashboard', current: false, children: false },
  { name: 'Trainings', href: 'trainings', current: true, children: false, },
  { name: 'Users', href: 'users', current: false, children: false, },
  { name: 'More', href: 'more', current: false, children: true },
]

const profileNavigation = [
  { name: 'Profile settings', link: 'profile', icon: settings },
  { name: 'Our policies', link: 'privacy-policy', icon: policies },
  { name: 'Log out', link: 'login', icon: logout }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const languages = [
  { code: 'us', name: 'English (EN)' },
  { code: 'fr', name: 'Français (FR)' },
  { code: 'nl', name: 'Nederlands (NL)' },
  { code: 'es', name: 'Español (ES)' },
  { code: 'de', name: 'Deutsch (DE)' },
]

const Navbar = () => {
  const { i18n } = useTranslation()

  return (
    <Disclosure as="nav" className="shadow-md mb-5 bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black hover:text-black focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                    </svg>
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    src="logo.svg"
                    alt="logo"
                    className="object-cover block h-10 w-auto lg:hidden"
                  />
                  <img
                    src="logo.svg"
                    alt="logo"
                    className="object-cover hidden h-10 w-auto lg:block"
                  />
                </div>
                <div className="hidden sm:ml-6 lg:flex items-center">
                  <div className="flex space-x-4">
                    <div className='text-xs p-2 bg-gray-350 rounded-md lg:w-72 xl:w-96 flex flex-row justify-start items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5  text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                      <input type="search" placeholder='Quick search...' className='outline-none bg-transparent w-full' />
                    </div>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'text-blue-500' : 'text-gray-700',
                          'rounded-md xl:px-3 py-2 text-sm font-[600] flex flex-row xl:gap-2 items-center'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                        {item.children && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 font-medium">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Notifications */}
                <button
                  type="button"
                  className="rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hidden md:block lg:hidden xl:block"
                >
                  <img src={notification} alt="notification icon" className='w-6 h-6' />
                  <span className="sr-only">View notifications</span>
                </button>

                {/* Languages dropdown */}
                <Menu as="div" className="relative ml-3 hidden md:block lg:hidden xl:block">
                  <div>
                    <Menu.Button className="flex rounded-full">
                      <ReactCountryFlag
                        svg
                        className='country-flag flag-icon rounded-full object-cover p-0 m-0'
                        countryCode={i18n.language === 'en' ? 'us' : i18n.language}
                      />
                      <span className="sr-only">Switch language</span>
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-start">
                      {languages.map((ln, idx) => <Menu.Item key={idx}>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(((i18n.language === 'en' ? 'us' : i18n.language) === ln.code) ? 'text-black' : 'text-gray-400', 'flex flex-row justify-start items-center gap-2 px-4 py-2 text-sm w-max')}
                          >
                            <ReactCountryFlag
                              svg
                              className='country-flag flag-icon rounded-full object-cover'
                              countryCode={ln.code}
                            />
                            <span>{ln.name}</span>
                          </a>
                        )}
                      </Menu.Item>)}
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="flex flex-row gap-2 justify-center items-center rounded-full">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={avatar}
                        alt="profile"
                      />
                      <div className='hidden lg:block text-start'>
                        <span className='block text-sm font-semibold text-gray-800'>Blaise Defloo</span>
                        <span className='block text-xs text-gray-400'>Administrator</span>
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
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm')}
                          >
                            <span className='font-semibold'>
                              BESIX Group
                            </span>
                            <br />
                            <span className='text-xs text-gray-600'>
                              besix.group@besix.be
                            </span>
                          </a>
                        )}
                      </Menu.Item>
                      {profileNavigation.map((nav, idx) => <Menu.Item key={idx}>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'px-4 py-2 text-sm flex flex-row justify-start items-center gap-2', (nav.link === 'login' && 'border-t py-3'))}
                          >
                            <img src={nav.icon} alt={nav.name} className='object-cover' />
                            {nav.name}
                          </a>
                        )}
                      </Menu.Item>)}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <div className='text-xs p-2 bg-gray-350 rounded-md w-full flex flex-row justify-start items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5  text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input type="search" placeholder='Quick search...' className='outline-none bg-transparent w-full' />
              </div>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'text-blue-500' : '',
                    'rounded-md px-3 py-2 text-sm font-[600] flex flex-row gap-2 items-center'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                  {item.children && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 font-medium">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar