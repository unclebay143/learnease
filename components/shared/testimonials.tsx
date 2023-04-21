import { srcIcon, testimonials } from "@/lib/constants/testimonials";
import Image from "next/image";
import React, { ReactElement } from "react";

// credit: https://github.com/Nutlope/roomGPT/blob/main/components/Testimonials.tsx

type Props = {};

const Testimonials = (props: Props) => {
  return (
    <div>
      <section
        id='testimonials'
        aria-label='What our customers are saying'
        className='mx-auto mt-20 max-w-7xl'
      >
        <div className='px-5 mx-auto sm:px-6 lg:px-8 md:px-7'>
          <div className='mx-auto md:text-center'>
            <h1 className='text-4xl font-medium leading-10 text-center text-gray-900'>
              Loved by many
              <span className='relative mx-2 text-green-600 whitespace-nowrap'>
                worldwide.
                <svg
                  aria-hidden='true'
                  viewBox='0 0 418 42'
                  className='absolute top-3/4 left-0 h-[0.6em] w-full fill-green-500/60'
                  preserveAspectRatio='none'
                >
                  <path d='M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z' />
                </svg>
              </span>
            </h1>
            {/* <p className='max-w-xl mx-auto mt-6 text-lg leading-7 text-gray-500 sm:text-gray-400'> */}
            <p className='mt-6 text-center text-gray-600 sm:text-lg'>
              {/* See what our early users are saying about the product. */}
              Don&apos;t just take our word for it. Hear from people who loves
              using LearnEase!
            </p>
          </div>
          <ul
            role='list'
            className='grid grid-cols-1 gap-6 mx-auto mt-16 md:grid-cols-2 sm:gap-8 lg:mt-16 lg:max-w-7xl lg:grid-cols-3'
          >
            {testimonials.map((column, columnIndex) => (
              <li key={columnIndex}>
                <ul role='list' className='flex flex-col gap-y-6 sm:gap-y-8'>
                  {column.map(
                    ({ quote, author, src, srcUrl }, testimonialIndex) => (
                      <li
                        key={testimonialIndex}
                        className='transition duration-300 ease-in-out hover:scale-105 '
                      >
                        {srcUrl ? (
                          <a href={srcUrl} target={"_blank"} rel='noreferrer'>
                            <TestimonialCard
                              quote={quote}
                              author={author}
                              src={src}
                            />
                          </a>
                        ) : (
                          <TestimonialCard
                            quote={quote}
                            author={author}
                            src={src}
                          />
                        )}
                      </li>
                    )
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

const TestimonialCard = ({
  quote,
  author,
  src,
}: {
  quote: string;
  author: { name: string; title: string; img: string };
  src: string;
}) => {
  return (
    <figure className='relative p-6 shadow-xl group rounded-2xl bg-gray-50 shadow-slate-900/10'>
      <blockquote className='relative'>
        <p className='text-lg tracking-tight text-gray-600'>
          &quot;{quote}&quot;
          {srcIcon[src]}
        </p>
      </blockquote>
      <figcaption className='relative flex items-center justify-between pt-6 mt-6 border-t border-slate-100'>
        <div>
          <div className='justify-start text-base text-green-600 items- font-display'>
            {author.name}
          </div>
          <div className='mt-1 text-sm text-gray-400 capitalize'>
            {author.title}
          </div>
        </div>
        <section className='flex items-end'>
          <div className='p-1 overflow-hidden border border-green-400 rounded-full bg-green-50'>
            <Image
              className='object-cover rounded-full h-14 w-14'
              src={author.img}
              alt='picture of the testimonial author'
              width={56}
              height={56}
            />
          </div>
          {/* {srcIcon[testimonial.src]} */}
        </section>
      </figcaption>
    </figure>
  );
};

export default Testimonials;
