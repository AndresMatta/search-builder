// Extend the CSS module to support Tailwind CSS classes
declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}
