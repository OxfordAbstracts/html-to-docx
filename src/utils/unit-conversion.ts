export const pixelRegex = /([\d.]+)px/i
export const emRegex = /([\d.]+)em/i
export const remRegex = /([\d.]+)rem/i
export const percentageRegex = /([\d.]+)%/i
export const pointRegex = /([\d.]+)pt/i
export const cmRegex = /([\d.]+)cm/i
export const inchRegex = /([\d.]+)in/i

/* eslint-disable new-cap */

export function pixelToEMU(pixelValue: number) {
  return Math.round(pixelValue * 9525)
}

export function emToEmu(emValue: number) {
  return pixelToEMU(emValue * 16)
}

export function remToEmu(remValue: number) {
  return pixelToEMU(remValue * 16)
}

export function EMUToPixel(EMUValue: number) {
  return Math.round(EMUValue / 9525)
}

export function TWIPToEMU(TWIPValue: number) {
  return Math.round(TWIPValue * 635)
}

export function EMUToTWIP(EMUValue: number) {
  return Math.round(EMUValue / 635)
}

export function pointToTWIP(pointValue: number) {
  return Math.round(pointValue * 20)
}

export function TWIPToPoint(TWIPValue: number) {
  return Math.round(TWIPValue / 20)
}

export function pointToHIP(pointValue: number) {
  return Math.round(pointValue * 2)
}

export function HIPToPoint(HIPValue: number) {
  return Math.round(HIPValue / 2)
}

export function HIPToTWIP(HIPValue: number) {
  return Math.round(HIPValue * 10)
}

export function TWIPToHIP(TWIPValue: number) {
  return Math.round(TWIPValue / 10)
}

export function pixelToTWIP(pixelValue: number) {
  return EMUToTWIP(pixelToEMU(pixelValue))
}

export function TWIPToPixel(TWIPValue: number) {
  return EMUToPixel(TWIPToEMU(TWIPValue))
}

export function pixelToHIP(pixelValue: number) {
  return TWIPToHIP(EMUToTWIP(pixelToEMU(pixelValue)))
}

export function HIPToPixel(HIPValue: number) {
  return EMUToPixel(TWIPToEMU(HIPToTWIP(HIPValue)))
}

export function inchToPoint(inchValue: number) {
  return Math.round(inchValue * 72)
}

export function inchToTWIP(inchValue: number) {
  return pointToTWIP(inchToPoint(inchValue))
}

export function cmToInch(cmValue: number) {
  return cmValue * 0.3937008
}

export function cmToTWIP(cmValue: number) {
  return inchToTWIP(cmToInch(cmValue))
}

export function pixelToPoint(pixelValue: number) {
  return HIPToPoint(pixelToHIP(pixelValue))
}

export function pointToPixel(pointValue: number) {
  return HIPToPixel(pointToHIP(pointValue))
}

export function EIPToPoint(EIPValue: number) {
  return Math.round(EIPValue / 8)
}

export function pointToEIP(PointValue: number) {
  return Math.round(PointValue * 8)
}

export function pixelToEIP(pixelValue: number) {
  return pointToEIP(pixelToPoint(pixelValue))
}

export function EIPToPixel(EIPValue: number) {
  return pointToPixel(EIPToPoint(EIPValue))
}
