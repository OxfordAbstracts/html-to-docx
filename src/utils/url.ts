export function isValidUrl(urlString: string) {
  const urlRegex =
    // dprint-ignore
    // eslint-disable-next-line max-len
    /http(s)?:\/\/(\w+:?\w*@)?(\S+)(:\d+)?((?<=\.)\w+)+(\/([\w#!:.?+=&%@!\-/])*)?/gi

  return Boolean(urlRegex.test(urlString))
}
