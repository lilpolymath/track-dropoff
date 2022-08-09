import UAParser from 'ua-parser-js';

type browserDimensionsType = {
  width: number;
  height: number;
  string: string;
};

export interface DeviceDetails {
  deviceType: string;
  browserName: string;
  userIPAddress: string;
  clientLanguage: string;
  allowedCookies: boolean;
  browserDimensions: browserDimensionsType;
}

const checkCookies = (): boolean => {
  if (navigator.cookieEnabled) {
    return true;
  }
  return false;
};

const browserDimensions = (): browserDimensionsType => {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  return { width, height, string: `${height}x${width} pixels` };
};

const preferredLanguage = (): string => {
  return window.navigator.language;
};

const main = (): DeviceDetails => {
  let deviceDetails: DeviceDetails = {};

  const userAgent = window.navigator.userAgent;

  const parsedUAString: UAParserInstance = UAParser(userAgent);

  const isMobileDevice = (): boolean => {
    const regexs = [
      /(Android)(.+)(Mobile)/i,
      /BlackBerry/i,
      /iPhone|iPod/i,
      /Opera Mini/i,
      /IEMobile/i,
    ];
    return regexs.some((b) => userAgent.match(b));
  };

  const isTabletDevice = (): boolean => {
    const regex =
      /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/;
    return regex.test(userAgent.toLowerCase());
  };

  const isDesktopDevice = (): boolean => !isMobileDevice() && !isTabletDevice();

  const isDesktop = isDesktopDevice();
  const isMobile = isMobileDevice();
  const isTablet = isTabletDevice();

  deviceDetails.allowedCookies = checkCookies();
  deviceDetails.clientLanguage = preferredLanguage();
  deviceDetails.browserDimensions = browserDimensions();
  deviceDetails.deviceType = isDesktop
    ? 'desktop'
    : isMobile
    ? 'mobile'
    : 'undefined';
  deviceDetails.browserName = parsedUAString.browser.name;

  return deviceDetails;
};

export default main;
