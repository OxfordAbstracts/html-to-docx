declare module 'html-to-vdom' {
  function htmlToVdom(options: any): (html: string) => any;
  export = htmlToVdom;
}