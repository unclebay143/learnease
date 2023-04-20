import React from "react";

type Props = {};
const testimonials = [
  {
    name: "Perspective",
    quote:
      "The UI is great and has an enjoyable feel to it. I'd definitely use this.",
    img: "https://pbs.twimg.com/profile_images/1258799781213876230/hA3y0KEP_400x400.jpg",
    srcUrl:
      "https://twitter.com/iamthebuilder__/status/1648968287961722880?s=20",
    title: "Software engineer",
  },
  {
    name: "Konadu Akwasi 👨‍💻",
    quote: "This looks cool, uncle BJay  🚀",
    img: "https://pbs.twimg.com/profile_images/1608992040917913600/fve1EMPZ_400x400.jpg",
    srcUrl: "https://twitter.com/akuoko_konadu/status/1648982207170596864?s=20",
    title: "Full Stack Web Developer",
  },
  {
    name: "Perspective",
    quote:
      "The UI is great and has an enjoyable feel to it. I'd definitely                use this.",
    img: "https://pbs.twimg.com/profile_images/1258799781213876230/hA3y0KEP_400x400.jpg",
    srcUrl:
      "https://twitter.com/iamthebuilder__/status/1648968287961722880?s=20",
    title: "Software engineer",
  },
];

const Testimonials = (props: Props) => {
  return (
    <div>
      <ul>
        {testimonials.map(({ name, quote, img, srcUrl }, i) => {
          return (
            <li key={i}>
              <a href={srcUrl} target='_blank' rel='noopener noreferrer'>
                <figure>
                  <blockquote>{quote}</blockquote>
                  <hr />
                  <figcaption>
                    <img src={img} alt='' className='rounded w-14 h-14' />
                    <p>{name}</p>
                  </figcaption>
                </figure>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Testimonials;
