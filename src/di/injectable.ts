type TInjectableOptions = {
  isSingletonMode?: boolean;
};

/**
 * Decorator @Injectable
 * 
 * to decorate an InDiv Service
 *
 * @param {TInjectableOptions} [options]
 * @returns {(_constructor: Function) => void}
 */
export default function Injectable(options?: TInjectableOptions): (_constructor: Function) => void {
  return function (_constructor: Function): void {
      (_constructor as any).isSingletonMode = true;
      if (options) (_constructor as any).isSingletonMode = options.isSingletonMode;
  };
}