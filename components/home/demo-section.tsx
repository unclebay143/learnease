import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Github from "../shared/icons/github";
import MaxWidthWrapper from "../shared/max-width-wrapper";

export default function AppDemo() {
  return (
    <MaxWidthWrapper>
      <section className='flex flex-col justify-center px-5 pt-10 mt-20 overflow-hidden border rounded-lg xl:pl-10 xl:flex-row xl:justify-between'>
        <div className='flex-col items-center justify-center xl:flex xl:mb-32'>
          <div className='text-center xl:pr-10'>
            <h3 className='text-4xl font-semibold leading-snug text-gray-900'>
              <span className='relative mx-2 text-green-600 whitespace-nowrap'>
                Experience
                <svg
                  aria-hidden='true'
                  viewBox='0 0 418 42'
                  className='absolute top-3/4 left-0 h-[0.6em] w-full fill-green-500/60'
                  preserveAspectRatio='none'
                >
                  <path d='M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z' />
                </svg>
              </span>
              LearnEase AI in Action
            </h3>
            <p className='mt-2 text-sm font-medium text-green-500'>
              Learn Complex Concepts with Lightning Speed.
            </p>
            <div className='w-9/12 mx-auto my-4 mt-3  xl:text-left'>
              <ul className='hidden text-gray-700 xl:block xl:list-inside xl:list-disc'>
                <li className='mb-2'>Open Source</li>
                <li className='mb-2'>Easy-to-understand language</li>
                <li className='mb-2'>Streamlined response</li>
                <li className='mb-2'>Real-world use cases</li>
                <li className='mb-2'>Sample code blocks</li>
                <li className='mb-2'>Pointer to what to learn next</li>
              </ul>
            </div>
          </div>
          <div className='w-9/12 mx-auto my-4 mt-3 justify-self-end'>
            <div className='flex justify-center xl:justify-start'>
              <a
                target={"_blank"}
                rel='noreferrer'
                href='https://dub.sh/learnease-github'
                className='flex items-center gap-1 bg-black text-sm text-white rounded-lg px-2.5 py-2 hover:bg-white border hover:text-black hover:border hover:border-black'
              >
                <Github />
                Star on Github
              </a>
            </div>
          </div>
        </div>

        <div className='relative flex justify-center w-full mt-5 -mb-5 shadow-lg group xl:-mr-5 xl:mt-0 xl:w-auto xl:shadow-none'>
          <Link
            as='video'
            href={
              "https://res.cloudinary.com/drk2xigke/video/upload/v1680005499/learnease-ai/learn-ease-ai-demo_mnmxd9.mov"
            }
            rel='preload'
          />

          <AnimatePresence mode='wait'>
            <motion.div
              initial={{
                y: 10,
                opacity: 0,
              }}
              animate={{ y: 0, opacity: 1 }}
              exit={{
                y: -10,
                opacity: 0,
              }}
              transition={{
                duration: 0.15,
                stiffness: 300,
                damping: 30,
              }}
              className='relative m-h-[200px] sm:min-h-[600px] w-full overflow-hidden whitespace-nowrap rounded-2xl rounded-bl-none xl:rounded-tr-none bg-white shadow-2xl lg:w-[800px]'
            >
              <video autoPlay muted loop width={800} height={600}>
                <source
                  src={
                    "https://res.cloudinary.com/drk2xigke/video/upload/v1680005499/learnease-ai/learn-ease-ai-demo_mnmxd9.mov"
                  }
                  type='video/mp4'
                />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </AnimatePresence>
          <div className='absolute w-full h-full transition-all bg-black rounded-bl-none group-hover:bg-transparent bg-opacity-10 rounded-2xl xl:rounded-tr-none'></div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}
