interface ValidationConfiguration {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export default function validate(config: ValidationConfiguration): boolean {
  if (!config.value) return false;

  let input = config.value;

  if (!input && config.required) return false;

  if (typeof input === "string") {
    input = input as string;

    if (input.length === 0) return false;
    if (config.minLength && input.length < config.minLength) return false;
    if (config.maxLength && input.length > config.maxLength) return false;
  } else {
    if (config.min && config.min > input) return false;
    if (config.max && config.max < input) return false;
  }

  return true;
}
