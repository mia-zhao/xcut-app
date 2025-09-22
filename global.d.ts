declare module "messages/en.json" {
  const value: {
    [key: string]: any;
  };
  export default value;
}

import en from "./messages/en.json";

type Messages = typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
