const urlContent: string;

declare module '*.png' {
  export default urlContent;
}
declare module '*.svg' {
  export default urlContent;
}
declare module '*.jpeg' {
  export default urlContent;
}
declare module '*.jpg' {
  export default content;
}
declare module '*.webp' {
  export default content;
}

const cssModule: {
  [k: string]: string;
};

declare module '*.css' {
  export default cssModule;
}
declare module '*.scss' {
  export default cssModule;
}
declare module '*.sass' {
  export default cssModule;
}
