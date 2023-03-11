import React from 'react'

function Header() {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
        <div className="flex items-center space-x-5">
            <a href='/'>
                <img className="w-44 object-contain cursor-pointer" src="https://links.papareact.com/yvf" alt="Medium logo" />
            </a>
            <div className="hidden md:inline-flex items-center space-x-5">
                <h3>About</h3>
                <h3>Contact</h3>
                <h3 className="text-white bg-blue-600 px-4 py-1 rounded-full">Follow</h3>
            </div>
        </div>
        <div className="flex items-center space-x-5 text-blue-600 ">
            <h3> <a href="/sign-in"> Sign In</a></h3>
            <h3 className="border px-4 py-1 rounded-full border-blue-600"><a href="/sign-up"> Get Started</a></h3>
        </div>
    </header>
  )
}

export default Header