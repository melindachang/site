import { writable } from "svelte/store";

export const activeContexts = writable([]);
export const eventFired = writable([]);
export const scrollY = writable(0);
