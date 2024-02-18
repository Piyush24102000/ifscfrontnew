import React from 'react'
import Link from 'next/link'
const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <div className="w-80 md:w-96 mb-8">
          {/* Inline SVG example */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 250 250"
            className="w-full h-full"
          >
            <path
              fill="#F9FAFB"
              d="M125 250c69.035 0 125-55.965 125-125S194.035 0 125 0 0 55.965 0 125s55.965 125 125 125z"
            />
            <path
              fill="#D1D5DB"
              d="M103.193 67.677c-1.528-1.528-4.004-1.528-5.532 0L67.677 97.661c-1.528 1.528-1.528 4.004 0 5.532l29.984 29.984c1.528 1.528 4.004 1.528 5.532 0l29.984-29.984c1.528-1.528 1.528-4.004 0-5.532L103.193 67.677z"
            />
            <path
              fill="#9CA3AF"
              d="M182.323 67.677c-1.528-1.528-4.004-1.528-5.532 0L146.807 97.661c-1.528 1.528-1.528 4.004 0 5.532l29.984 29.984c1.528 1.528 4.004 1.528 5.532 0l29.984-29.984c1.528-1.528 1.528-4.004 0-5.532L182.323 67.677z"
            />
            <path
              fill="#374151"
              d="M125 153.226c-15.464 0-28-12.536-28-28s12.536-28 28-28 28 12.536 28 28-12.536 28-28 28zm0-48c-11.046 0-20 8.954-20 20s8.954 20 20 20 20-8.954 20-20-8.954-20-20-20z"
            />
            <path
              fill="#374151"
              d="M125 0C55.965 0 0 55.965 0 125s55.965 125 125 125 125-55.965 125-125S194.035 0 125 0zm0 240C62.393 240 10 187.607 10 125S62.393 10 125 10s115 52.393 115 115-52.393 115-115 115z"
            />
          </svg>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Oops! Page not found.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          The page you're looking for doesn't seem to exist.
        </p>
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Go back home
          </button>
        </Link>
      </div>
    )
}

export default NotFound