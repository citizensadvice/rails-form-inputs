import { generateData } from './generate_form_data.js';
import type { Data, Transform } from './types.js';

interface ToFormDataOptions {
  transform?: Transform;
  snakeCase?: boolean;
}

export function toRailsFormData(
  data: Data,
  { transform, snakeCase = true }: ToFormDataOptions = {},
): FormData {
  const formData = new FormData();
  Array.from(generateData({ value: data, snakeCase, transform })).forEach(
    ({ name, value }) => {
      formData.append(name, value);
    },
  );
  return formData;
}
