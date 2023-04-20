import MaxWidthWrapper from "../shared/max-width-wrapper";

export default function AppFeatures() {
  return (
    <MaxWidthWrapper>
      <p className='mt-20 text-4xl font-medium leading-10 text-center text-gray-900'>
        Unlock the Power of
        <span className='relative mx-2 text-green-600 whitespace-nowrap'>
          Learning with
          <svg
            aria-hidden='true'
            viewBox='0 0 418 42'
            className='absolute top-3/4 left-0 h-[0.6em] w-full fill-green-500/60'
            preserveAspectRatio='none'
          >
            <path d='M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z' />
          </svg>
        </span>
        AI
      </p>

      <div className='mt-10'>
        <section className='grid grid-cols-1 gap-5 md:grid-cols-3'>
          <article className='w-full p-4 border border-gray-300 rounded-lg'>
            <section>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 text-green-500'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5'
                  />
                </svg>

                <h3 className='my-2 text-2xl font-medium text-gray-black'>
                  Learn with Analogies
                </h3>
              </span>
            </section>
            <p className='text-gray-500'>
              Our AI-powered platform uses analogies to explain complex tech
              concepts in a way that is easy to understand and remember.
            </p>
          </article>
          <article className='w-full p-4 border border-gray-300 rounded-lg'>
            <section>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 text-green-500'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z'
                  />
                </svg>
                <h3 className='my-2 text-2xl font-medium text-gray-black'>
                  Real-World Examples
                </h3>
              </span>
            </section>
            <p className='text-gray-500'>
              LearnEase AI provide real-world use cases for every concept, so
              you can see how it is applied in practice and gain a deeper
              understanding of how it works.
            </p>
          </article>
          <article className='w-full p-4 border border-gray-300 rounded-lg'>
            <section>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 text-green-500'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002'
                  />
                </svg>

                <h3 className='my-2 text-2xl font-medium text-gray-black'>
                  Hands-On Learning
                </h3>
              </span>
            </section>
            <p className='text-gray-500'>
              Learn by doing! LearnEase AI offer a variety of projects and
              ready-to-run code samples that allow you to put your new knowledge
              into practice and gain valuable experience.
            </p>
          </article>

          {/* Fade */}
          <article className='w-full p-4 border border-gray-300 rounded-lg'>
            <section>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 text-green-500'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802'
                  />
                </svg>

                <h3 className='my-2 text-2xl font-medium text-gray-black'>
                  Personalized Language Learning
                </h3>
              </span>
            </section>
            <p className='text-gray-500'>
              Choose your preferred language for learning, making it easier to
              understand and retain information. Whether you&apos;re a native
              speaker or learning a new language, we&apos;ve got you covered.
            </p>
          </article>

          <article className='w-full p-4 border border-gray-300 rounded-lg'>
            <section>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 text-green-500'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125'
                  />
                </svg>

                <h3 className='my-2 text-2xl font-medium text-gray-black'>
                  Career Level Personalization
                </h3>
              </span>
            </section>
            <p className='text-gray-500'>
              We understand that everyone&apos;s learning needs are different.
              That&apos;s why we offer professional-level personalization,
              allowing you to customize your learning experience according to
              your skill level.
            </p>
          </article>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://github.com/unclebay143/learnease/issues/new'
            className='flex items-center justify-center w-full p-4 border border-gray-300 rounded-lg group'
          >
            <p className='flex flex-col items-center justify-center text-gray-500 capitalize group-hover:underline'>
              <span>Suggest feature request</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-32 h-32'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 4.5v15m7.5-7.5h-15'
                />
              </svg>
            </p>
          </a>
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
