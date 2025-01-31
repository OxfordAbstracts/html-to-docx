export const pixelRegex = /([\d.]+)px/i
export const percentageRegex = /([\d.]+)%/i
export const pointRegex = /([\d.]+)pt/i
export const cmRegex = /([\d.]+)cm/i
export const inchRegex = /([\d.]+)in/i

/* eslint-disable new-cap */

export function pixelToEMU(pixelValue) {
  return Math.round(pixelValue * 9525)
}

export function EMUToPixel(EMUValue) {
  return Math.round(EMUValue / 9525)
}

export function TWIPToEMU(TWIPValue) {
  return Math.round(TWIPValue * 635)
}

export function EMUToTWIP(EMUValue) {
  return Math.round(EMUValue / 635)
}

export function pointToTWIP(pointValue) {
  return Math.round(pointValue * 20)
}

export function TWIPToPoint(TWIPValue) {
  return Math.round(TWIPValue / 20)
}

export function pointToHIP(pointValue) {
  return Math.round(pointValue * 2)
}

export function HIPToPoint(HIPValue) {
  return Math.round(HIPValue / 2)
}

export function HIPToTWIP(HIPValue) {
  return Math.round(HIPValue * 10)
}

export function TWIPToHIP(TWIPValue) {
  return Math.round(TWIPValue / 10)
}

export function pixelToTWIP(pixelValue) {
  return EMUToTWIP(pixelToEMU(pixelValue))
}

export function TWIPToPixel(TWIPValue) {
  return EMUToPixel(TWIPToEMU(TWIPValue))
}

export function pixelToHIP(pixelValue) {
  return TWIPToHIP(EMUToTWIP(pixelToEMU(pixelValue)))
}

export function HIPToPixel(HIPValue) {
  return EMUToPixel(TWIPToEMU(HIPToTWIP(HIPValue)))
}

export function inchToPoint(inchValue) {
  return Math.round(inchValue * 72)
}

export function inchToTWIP(inchValue) {
  return pointToTWIP(inchToPoint(inchValue))
}

export function cmToInch(cmValue) {
  return cmValue * 0.3937008
}

export function cmToTWIP(cmValue) {
  return inchToTWIP(cmToInch(cmValue))
}

export function pixelToPoint(pixelValue) {
  return HIPToPoint(pixelToHIP(pixelValue))
}

export function pointToPixel(pointValue) {
  return HIPToPixel(pointToHIP(pointValue))
}

export function EIPToPoint(EIPValue) {
  return Math.round(EIPValue / 8)
}

export function pointToEIP(PointValue) {
  return Math.round(PointValue * 8)
}

export function pixelToEIP(pixelValue) {
  return pointToEIP(pixelToPoint(pixelValue))
}

export function EIPToPixel(EIPValue) {
  return pointToPixel(EIPToPoint(EIPValue))
}
