import { writable } from 'svelte/store';
import type { Field } from '../types';

export const uploadedImage = writable<null | File>(null);
export const currentFields = writable<Field[]>([]);
