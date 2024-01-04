import { writable } from 'svelte/store';

export const tasks = writable([]);
export const message = writable('');
export const type = writable('');
export const show = writable(false);

export function showMessage() {
    show.set(true);
    setTimeout(() => {
      show.set(false);
    }, 2000);
  }