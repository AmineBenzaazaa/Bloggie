import React from 'react'
import { useParams } from 'react-router-dom'

const Article = () => {
    const {id} = useParams();
    return ( <div> {id} </div>)

    return (
        <main>
            <img
                className="h-60 w-full object-cover"
                src={urlFor(post.mainImage).url()!}
                alt="Post Banner"
            />
            <article className="mx-auto max-w-3xl p-5">
                <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
                <h2 className="mb-2 text-xl font-light text-gray-500">
                {post.description}
                </h2>
                <div className="flex items-center space-x-2">
                <img
                    className="h-10 w-10 rounded-full"
                    src={urlFor(post.author.image).url()!}
                    alt="author Image"
                />
                <p className="text-sm font-extralight">
                    Blog post by{' '}
                    <span className="text-green-600">{post.author.name}</span> -
                    Published at {new Date(post._createdAt).toLocaleString('en-us')}
                </p>
                </div>
                <div className="mt-10">
                <PortableText
                    className=""
                    dataset="production"
                    projectId="1bt1t52i"
                    content={post.body}
                    serializers={{
                    h1: (props: any) => {
                        <h1 className="my-5 text-2xl font-bold" {...props} />
                    },
                    h2: (props: any) => {
                        <h2 className="my-5 text-xl font-bold" {...props} />
                    },
                    li: ({ children }: any) => (
                        <li className="ml-4 list-disc"> {children}</li>
                    ),
                    link: ({ href, children }: any) => (
                        <a href={href} className="text-blue-500 hover:underline">
                        {children}
                        </a>
                    ),
                    }}
                />
                </div>
            </article>
            <hr className="center my-5 mx-auto max-w-lg border border-yellow-500" />
            {submitted ? (
                <div className="my-10 mx-auto flex max-w-2xl flex-col bg-yellow-500 px-10 py-10 text-white">
                <h3 className="text-3xl font-bold ">
                    Thank you for Submitting your comment!
                </h3>
                <p>Once it has been approved, it will appear below!</p>
                </div>
            ) : (
                <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto mb-10 flex max-w-2xl flex-col p-5"
                >
                <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
                <h4 className="text-3xl font-bold">Leave a comment below!</h4>
                <hr className="mt-2 py-3" />
        
                <input
                    {...register('_id')}
                    type="hidden"
                    name="_id"
                    value={post._id}
                />
        
                <label className="mb-5 block">
                    <span className="text-gray-700">Name</span>
                    <input
                    {...register('name', { required: true })}
                    className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
                    type="text"
                    placeholder="Enter Name"
                    />
                </label>
                <label className="mb-5 block">
                    <span className="text-gray-700">Email</span>
                    <input
                    {...register('email', { required: true })}
                    className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
                    type="email"
                    placeholder="Enter your email"
                    />
                </label>
                <label className="mb-5 block">
                    <span className="text-gray-700">Comment</span>
                    <textarea
                    {...register('comment', { required: true })}
                    className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
                    placeholder="Share your thoughts : )"
                    rows={8}
                    />
                </label>
        
                {/* errors will return when field validation fails */}
                <div className="flex flex-col p-5 ">
                    {errors.name && (
                    <span className="text-red-500">- The Name field is REQUIRED</span>
                    )}
                    {errors.comment && (
                    <span className="text-red-500">
                        - The Comment field is REQUIRED
                    </span>
                    )}
                    {errors.email && (
                    <span className="text-red-500">
                        - The Email field is REQUIRED
                    </span>
                    )}
                </div>
                <input
                    type="submit"
                    className="focus:shadow-outline cursor-pointer rounded bg-yellow-500 py-2 px-4 font-bold text-white shadow hover:bg-yellow-400 focus:outline-none"
                />
                </form>
            )};
            {/* Comments */}
            <div className="my-10 mx-auto flex max-w-2xl flex-col space-y-2 p-10 shadow shadow-yellow-500">
                <h3 className="text-4xl">Comments</h3>
                <hr className="pb-2" />
        
                {post.comments.map((comment) => (
                <div key={comment._id}>
                    <p>
                    <span className="text-yellow-500">{comment.name}: </span>
                    {comment.comment}
                    </p>
                </div>
                ))}
            </div>
       </main>
     )
}

export default Article