import { SetMetadata } from '@nestjs/common';

export const EXAMPLE_KEY = 'example';
export const Example = (...args: string[]) => SetMetadata(EXAMPLE_KEY, args);
