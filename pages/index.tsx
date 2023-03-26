import { useState } from "react";
import HomeLayout from "@/components/layouts/home";
import PlaceholderSections from "@/components/home/PlaceholderSections";
import Header from "@/components/home/header";
import OSS from "@/components/home/oss";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";

export default function Home() {
  const [isIDle, setIsIDle] = useState<boolean>(true);
  const [isBusy, setIsBusy] = useState<boolean>(false);

  // setTimeout(() => {
  //   setIsBusy(true);
  // }, 2000);

  // setTimeout(() => {
  //   setIsIDle(false);
  // }, 4000);
  return (
    <HomeLayout>
      <Header />

      <div className='relative max-w-screen-md mx-auto w-full mt-20'>
        <section className='z-20 relative'>
          <section className='rounded-md border mx-auto border-gray-200 bg-white p-8 shadow-lg'>
            {/* <p className='text-gray-400'>
              Unlock the Power of Learning with AI
            </p> */}

            {isIDle ? (
              <AnimatePresence>
                <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
                  <PlaceholderSections loading={isBusy} />
                </motion.div>
              </AnimatePresence>
            ) : (
              <section>
                <section>
                  <h1 className='text-3xl font-bold'>
                    Explain JavaScript Currying to me like I&apos;m 5
                  </h1>
                </section>
                <h2 className='text-2xl font-bold mt-8 mb-3'>Definition 🤔</h2>
                <p>
                  Web3 is the next generation of internet technology that allows
                  for a more secure, efficient, and decentralized way of
                  transferring data and value. It is a collection of protocols
                  and tools that allow developers to build applications that are
                  more secure, reliable, and efficient. Web3 is built on top of
                  blockchain technology and is an open source project that
                  anyone can contribute to and use. const web3 = new Web3(new
                  Web3.providers.HttpProvider(&apos;http://localhost:8545&apos;))
                </p>
                <h2 className='text-2xl font-bold mt-8 mb-3'>Analogy 🤓</h2>
                <p>
                  {" "}
                  Web3 is like a bridge between the traditional internet and the
                  new blockchain-based internet. It allows users to securely
                  send and receive data, and store value securely without the
                  need for a third party. It also allows developers to build
                  applications that are more secure and efficient.
                </p>
                <h2 className='text-2xl font-bold mt-8 mb-3'>
                  Practical usecase in real world 🤩
                </h2>
                <p>
                  {" "}
                  Web3 has a wide range of practical applications, such as:
                  Decentralized finance (DeFi) applications, which allow users
                  to borrow, lend, and trade digital assets without the need for
                  middlemen. Decentralized exchanges (DEXs), which allow users
                  to trade digital assets without the need for a third party.
                  Non-fungible tokens (NFTs), which are digital assets that are
                  unique and can be used to represent real-world assets such as
                  art, music, and collectibles. Decentralized autonomous
                  organizations (DAOs), which are organizations that are run by
                  a set of rules that are programmed onto the blockchain. Smart
                  contracts, which are computer programs that are programmed
                  onto the blockchain and can be used to automate processes.
                </p>
                <h2 className='text-2xl font-bold mt-8 mb-3'>
                  Friendly projects to build with the concept 🤗
                </h2>
                <p>
                  {" "}
                  Here are some friendly projects you can build with Web3: Build
                  a decentralized exchange (DEX) Create a DeFi application
                  Create an NFT marketplace Create a DAO Create a smart contract
                </p>
                <code>
                  {/* contract MyContract {
  function doSomething() public {
    // Your code here
  }
} */}
                </code>
                <h2 className='text-2xl font-bold mt-8 mb-3'>
                  What to learn next? 🤔
                </h2>
                <p>
                  To further your understanding of Web3, you can learn more
                  about the technologies it is built on, such as: Blockchain
                  Ethereum Solidity Cryptography Smart contract development
                  Decentralized application development
                </p>
                <h2 className='text-2xl font-bold mt-8 mb-3'>
                  Learn more about I want to learn web3? 🤓
                </h2>
                <p>
                  {" "}
                  Here are some great resources to learn more about Web3: What
                  is Web3? What is Web3 and How Does it Work? An Introduction to
                  Web3 Development Introduction to Web3.js YouTube: Introduction
                  to Web3.js
                </p>
              </section>
            )}
          </section>

          <OSS stars={2000} />
        </section>
      </div>
    </HomeLayout>
  );
}
