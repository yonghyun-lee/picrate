import { writable } from 'svelte/store';
import type { Field } from '../types';

export const uploadedImage = writable<null | File>(null);
export const currentFields = writable<Field[]>([]);
export const shareId = writable<string | undefined>(undefined);
export const isOpenNameModal = writable<boolean>(false);
export const currentId = writable<string | undefined>(undefined);
