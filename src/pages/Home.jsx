import React from 'react'

import Banner from '../components/Banner'


const home = () => {
  return (
    <div className="mx-auto max-w-7xl">
      {/* <Head>
        <title>Medium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      
      <Banner />
      <div className="sm:gird-cols-2 grid grid-cols-1 gap-3 p-2 md:gap-6 md:p-6 lg:grid-cols-3 ">
      {/* {posts.map((post) => (   */}
          <div >
            <div className="group cursor-pointer overflow-hidden rounded-lg border">
              <img
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                // src={urlFor(post.mainImage).url()!}
                alt="Post Image"
              />
              <div className="flex justify-between bg-white p-5 ">
                <div>
                  <p className="text-lg font-bold">
                    {/* {post.title} */}
                  </p>
                  <p className="tex-xs">
                    {/* {post.description} by {post.author.name} */}
                  </p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  // src={urlFor(post.author.image).url()!}
                  alt="author's Image"
                />
              </div>
            </div>
          </div>
        {/* ))} */}
      </div>
    </div>
  )
}

export default home