export default function AutoBind(target, methodName, descriptor) {
    const originalMethod = descriptor.value;
    const ajustedDescriptor = {
        configurable: true,
        get() {
            return originalMethod.bind(this);
        },
    };
    return ajustedDescriptor;
}
//# sourceMappingURL=autobind.js.map