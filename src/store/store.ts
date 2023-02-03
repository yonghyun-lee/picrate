import { writable } from 'svelte/store';

export const uploadedImage = writable<null | File>(null);
