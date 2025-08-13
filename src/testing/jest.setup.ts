// Disabling eslint rules for this file as it is a test setup file
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import "@testing-library/jest-dom";
import ResizeObserver from "resize-observer-polyfill";
import { TextDecoder, TextEncoder } from "util";
import { cloneDeep } from "lodash";
import * as crypto from "crypto" 

// TextEncoder and TextDecoder needs to be in global before JSDOM is created
global.TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// JSDOM window needs mocks to support Chakra UI
import { JSDOM } from "jsdom";
const { window } = new JSDOM();

// ResizeObserver mock
global.ResizeObserver = ResizeObserver;
window.ResizeObserver = ResizeObserver;

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
window.IntersectionObserver = IntersectionObserverMock;

// Scroll Methods mock
window.Element.prototype.scrollTo = () => {};
window.Element.prototype.scrollIntoView = () => {};

// requestAnimationFrame mock
window.requestAnimationFrame = (cb) => setTimeout(cb, 1000 / 60);

// URL object mock
window.URL.createObjectURL = () => "https://i.pravatar.cc/300";
window.URL.revokeObjectURL = () => {};

// scrollTo mock
window.HTMLElement.prototype.scrollTo = function () {};
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
(window as any).PointerEvent = MouseEvent;
(global as any).PointerEvent = MouseEvent;

// Override globalThis
Object.assign(global, { window, document: window.document });

// Chakra UI requires structuredClone
global.structuredClone = cloneDeep;

// Mock crypto for PKCE
Object.defineProperty(window, "crypto", {
  value: crypto,
});

Object.defineProperty(global, "crypto", {
  value: crypto,
});
