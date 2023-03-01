declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}
declare module '*.svg' {
  import React from 'react';
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
declare module '*.svg?url' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.jpeg' {
  const content: any;
  export default content;
}

// declare module "*.png" {
// const value: any;
// export = value;
// }
// declare module "*.png" {
//   const path: string;
//   export default path;
// }
// declare module '*.png';
declare module '*.png' {
  const content: any;
  export default content;
}

declare const __IS_DEV__: boolean;
declare const __API__: string;