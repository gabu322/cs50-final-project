export default function Bookmark({ className, color, fill = false }) {
   return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" id="bookmark" className={className}>
      <path fill={fill ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 3.75C5 2.7835 5.7835 2 6.75 2H17.25C18.2165 2 19 2.7835 19 3.75V21.25C19 21.5383 18.8347 21.8011 18.5749 21.926C18.315 22.0509 18.0066 22.0158 17.7815 21.8357L12 17.2105L6.21852 21.8357C5.99339 22.0158 5.68496 22.0509 5.42511 21.926C5.16526 21.8011 5 21.5383 5 21.25V3.75Z" />
   </svg>;
}
