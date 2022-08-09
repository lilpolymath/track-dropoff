// Track's the client IP address
// Track whether the client allowed cookies or not
// Track the language of the client
// Determine whether the visitor is on a desktop device or a mobile device
// Determine the name of the browser used by the client
// Determine the dimensions of the browser (e.g. 1792x1120 pixels)

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
