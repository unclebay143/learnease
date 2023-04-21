import { ReactElement } from "react-markdown/lib/react-markdown";

export const srcIcon: { [key: string]: ReactElement } = {
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

  Whatsapp: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={16}
      height={16}
      fill='currentColor'
      className='inline-block ml-1 group-hover:text-green-600 bi bi-whatsapp'
      viewBox='0 0 16 16'
    >
      <path d='M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z' />
    </svg>
  ),
};

export const testimonials = [
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
    {
      author: {
        name: "Rapture Chijioke Godson",
        title: "Web3 frontend engineer",
        img: "/_static/testimonial-headshots/rapture-chijioke-godson.webp",
      },
      quote:
        "LearnEase not only teaches me new skills, but also helps me understand the practical applications of those skills. The personalized learning experience with a sleek user interface is something that I really enjoy.",
      srcUrl: "",
      src: "Whatsapp",
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
