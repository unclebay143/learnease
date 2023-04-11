export const FAVICON_FOLDER = '/_static/favicons'

export const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
}

export const FRAMER_MOTION_LIST_ITEM_VARIANTS = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: 'spring' } },
}

export const SUPPORTED_LANGUAGES = [
  { label: 'English', value: 'English' },
  { label: 'Yoruba', value: 'Yoruba' },
  { label: 'Nigeria Pidgin', value: 'Nigeria Pidgin' },
  { label: 'French', value: 'French' },
  { label: 'Spanish', value: 'Spanish' },
]

export const SUPPORTED_LEVELS = [
  { label: 'Neutral', value: 'a 5 years old' },
  { label: 'Beginner', value: 'Beginner' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Advanced', value: 'Advanced' },
]

export const PROMPT_SUGGESTION = [
  'I want to learn about AI',
  'I want to learn JavaScript',
  "Explain JavaScript Currying to me like I'm 5",
  "Explain Recursion to me like I'm five",
]

export const PROMPT_IDEAS = [
  'How can I improve my JavaScript skills beyond basic syntax and programming concepts?',
  'What are some common design patterns used in JavaScript development and how can I apply them?',
  'What are the best practices for debugging and testing JavaScript applications?',
  'How can I integrate JavaScript with other technologies such as APIs, databases, or frameworks?',
  'What are some useful JavaScript libraries or tools for front-end development?',
  'How can I optimize the performance of my JavaScript code?',
  'What are the differences between synchronous and asynchronous JavaScript programming?',
  'How can I use JavaScript to create interactive web applications and user interfaces?',
  'What are some techniques for managing state in complex JavaScript applications?',
  'How can I stay up-to-date with the latest trends and advancements in JavaScript development?',
  'What are the best resources to learn JavaScript beyond the basics?',
  'How can I write efficient and optimized JavaScript code?',
  'What are some popular JavaScript libraries and frameworks, and how can I learn them?',
  'What are the most important concepts to understand when working with JavaScript event handling?',
  'How can I implement modern JavaScript features such as async/await and arrow functions?',
  'What are some common JavaScript security risks, and how can I avoid them?',
  'How can I use JavaScript to build interactive web applications?',
  'What are some tips for organizing and structuring large JavaScript codebases?',
  'How can I use JavaScript to manipulate and interact with the Document Object Model (DOM)?',
  'What are some common performance issues in JavaScript, and how can I optimize my code to improve performance?',
]
