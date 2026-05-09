// Disabling eslint rules for this file as it is a test setup file
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import "@testing-library/jest-dom";
import ResizeObserver from "resize-observer-polyfill";
import { TextDecoder, TextEncoder } from "util";
import { cloneDeep } from "lodash";

// TextEncoder and TextDecoder needs to be in global before JSDOM is created
global.TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
const testWindow = window;

// ResizeObserver mock
global.ResizeObserver = ResizeObserver;
testWindow.ResizeObserver = ResizeObserver;

// IntersectionObserver mock
class IntersectionObserverMock implements IntersectionObserver {
  root: Element | null = null;
  rootMargin = "";
  thresholds: readonly number[] = [];
  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve() {}
}

global.IntersectionObserver = IntersectionObserverMock;
testWindow.IntersectionObserver = IntersectionObserverMock;

// Scroll Methods mock
testWindow.Element.prototype.scrollTo = () => {};
testWindow.Element.prototype.scrollIntoView = () => {};

// requestAnimationFrame mock
testWindow.requestAnimationFrame = (cb) => setTimeout(cb, 1000 / 60);

// URL object mock
testWindow.URL.createObjectURL = () => "https://i.pravatar.cc/300";
testWindow.URL.revokeObjectURL = () => {};

// scrollTo mock
testWindow.HTMLElement.prototype.scrollTo = function () {};
global.HTMLElement.prototype.scrollTo = function () {};

// matchMedia mock
const matchMediaMock = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // Deprecated
  removeListener: jest.fn(), // Deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

// Set matchMedia on both window and global
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: matchMediaMock,
});

Object.defineProperty(global, "matchMedia", {
  writable: true,
  value: matchMediaMock,
});

// PointerEvent mock
(testWindow as any).PointerEvent = MouseEvent;
(global as any).PointerEvent = MouseEvent;

// Override globalThis
Object.assign(global, { window, document: window.document });

// Chakra UI requires structuredClone
global.structuredClone = cloneDeep;
