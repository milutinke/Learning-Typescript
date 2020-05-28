export default function validate(config) {
    if (!config.value)
        return false;
    let input = config.value;
    if (!input && config.required)
        return false;
    if (typeof input === "string") {
        input = input;
        if (input.length === 0)
            return false;
        if (config.minLength && input.length < config.minLength)
            return false;
        if (config.maxLength && input.length > config.maxLength)
            return false;
    }
    else {
        if (config.min && config.min > input)
            return false;
        if (config.max && config.max < input)
            return false;
    }
    return true;
}
//# sourceMappingURL=validation.js.map