import Image from "next/image";
import React, { ReactElement } from "react";

// credit: https://github.com/Nutlope/roomGPT/blob/main/components/Testimonials.tsx

type Props = {};
const testimonials = [
  [
    {
      author: {
        name: "Perspective",
        img: "/_static/testimonial-headshots/perspective.webp",
        title: "Software engineer",
      },
      quote:
        "The UI is great and has an enjoyable feel to it. I'd definitely use this.",
      srcUrl:
        "https://twitter.com/iamthebuilder__/status/1648968287961722880?s=20",
      src: "Twitter",
    },
    {
      author: {
        name: "Konadu Akwasi 👨‍💻",
        img: "/_static/testimonial-headshots/konadu-akwasi.webp",
        title: "Full-Stack Web Developer",
      },
      quote: "This looks cool, uncle BJay  🚀",
      srcUrl:
        "https://twitter.com/akuoko_konadu/status/1648982207170596864?s=20",
      src: "Twitter",
    },
  ],
  [
    {
      author: {
        name: "Pyman",
        title: "Python developer",
        img: "/_static/testimonial-headshots/pyman.webp",
      },
      quote: "This amazing! The UI feel is lovely",
      srcUrl:
        "https://twitter.com/CodeShagbaor/status/1648994290893299713?s=20",
      src: "Twitter",
    },
    {
      author: {
        name: "Chinenye Anikwenze",
        title: "Technical Writer",
        img: "/_static/testimonial-headshots/chinenye-anikwenze.jpeg",
      },
      quote: `Omg! This is really good!! I really love that you added analogy feature and also real world application of the concept.
      Cos I have a bit of challenge with understanding how to implement concepts in real world projects`,
      srcUrl:
        "https://www.linkedin.com/feed/update/urn:li:activity:7054719570867011584?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7054719570867011584%2C7054737745067294720%29",
      src: "LinkedIn",
    },
  ],
  [
    {
      author: {
        name: "Andrew Baisden ♐️",
        title: "Software engineer",
        img: "/_static/testimonial-headshots/andrew-baisden.webp",
      },
      quote: "Another worthwhile addition to my list.",
      srcUrl:
        "https://twitter.com/andrewbaisden/status/1647205352511885313?s=20",
      src: "Twitter",
    },
    {
      author: {
        name: "LEO",
        title: "Web developer",
        img: "/_static/testimonial-headshots/leo.webp",
      },
      quote: "UncleBigBay, this is good 🔥",
      srcUrl: "https://twitter.com/Omaebije/status/1649362907107414017?s=20",
      src: "Twitter",
    },
  ],
];

const srcIcon: { [key: string]: ReactElement } = {
  LinkedIn: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={16}
      height={16}
      fill='currentColor'
      className='inline-block ml-1 group-hover:text-green-600 bi bi-linkedin'
      viewBox='0 0 16 16'
    >
      <path d='M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z' />
    </svg>
  ),

  Twitter: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={16}
      height={16}
      fill='currentColor'
      className='inline-block ml-1 group-hover:text-green-600 bi bi-twitter'
      viewBox='0 0 16 16'
    >
      <path d='M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z' />
    </svg>
  ),
};

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
                  {column.map((testimonial, testimonialIndex) => (
                    <li
                      key={testimonialIndex}
                      className='transition duration-300 ease-in-out hover:scale-105 '
                    >
                      <a
                        href={testimonial.srcUrl}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <figure className='relative p-6 shadow-xl group rounded-2xl bg-gray-50 shadow-slate-900/10'>
                          <blockquote className='relative'>
                            <p className='text-lg tracking-tight text-gray-600'>
                              &quot;{testimonial.quote}&quot;
                              {srcIcon[testimonial.src]}
                            </p>
                          </blockquote>
                          <figcaption className='relative flex items-center justify-between pt-6 mt-6 border-t border-slate-100'>
                            <div>
                              <div className='justify-start text-base text-green-600 items- font-display'>
                                {testimonial.author.name}
                              </div>
                              <div className='mt-1 text-sm text-gray-400 capitalize'>
                                {testimonial.author.title}
                              </div>
                            </div>
                            <section className='flex items-end'>
                              <div className='p-1 overflow-hidden border border-green-400 rounded-full bg-green-50'>
                                <Image
                                  className='object-cover rounded-full h-14 w-14'
                                  src={testimonial.author.img}
                                  alt='picture of the testimonial author'
                                  width={56}
                                  height={56}
                                />
                              </div>
                              {/* {srcIcon[testimonial.src]} */}
                            </section>
                          </figcaption>
                        </figure>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
