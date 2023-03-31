import React from "react";
import HomeLayout from "@/components/layouts/home";
import Header from "@/components/home/header";
import AppFeatures from "@/components/home/features-section";
import AppDemo from "@/components/home/demo-section";
import OSS from "@/components/home/oss";

function Discover({}: {}) {
  //   const [showSharer, setShowSharer] = useLocalStorage("show-sharer", false);
  //   const [usedAppCount, setUsedAppCount] = useLocalStorage("used-app-count", 0); // consider tracking with db

  return (
    <HomeLayout>
      <Header setOpenSiderbar={() => false}>
        <div className='px-5 md:px-20 flex justify-center items-center flex-col py-10'>
          <div className='max-w-screen-md'>
            <section className='text-center mb-10'>
              <h3 className='text-4xl text-white mb-3'>
                Learn with Ease, Master with Confidence.
              </h3>
            </section>
            <div className='flex justify-center'>
              <button className='bg-white hover:bg-gray-200 text-black font-semibold py-3 px-6 rounded-2xl flex items-center space-x-2'>
                <img
                  alt="google's logo"
                  src='/_static/icons/google.webp'
                  width={20}
                  height={20}
                  decoding='async'
                  loading='lazy'
                  style={{ color: "transparent" }}
                />
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </Header>
      <AppFeatures />
      <AppDemo />

      <OSS stars={2000} />
    </HomeLayout>
  );
}

export default Discover;
