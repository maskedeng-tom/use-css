
const appendCss = (css: string): HTMLStyleElement => {
  //
  const head = document.head;
  const style = document.createElement('style');
  head.appendChild(style);
  style.appendChild(document.createTextNode(css));
  //
  return style;
  //
};

export { appendCss };