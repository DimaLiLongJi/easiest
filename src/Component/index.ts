import { IComponent, TInjectTokenProvider, TUseClassProvider, TuseValueProvider } from '../types';

import Watcher from '../Watcher';
import Utils from '../Utils';

type TComponentOptions = {
  selector: string;
  template: string;
  providers?: (Function | TUseClassProvider | TuseValueProvider)[];
};

const utils = new Utils();

/**
 * Decorator @Component
 * 
 * to decorate an InDiv component
 * render function comes from InDiv instance, you can set it by youself
 *
 * @template State
 * @template Props
 * @template Vm
 * @param {TComponentOptions} options
 * @returns {(_constructor: Function) => void}
 */
function Component<State = any, Props = any, Vm = any>(options: TComponentOptions): (_constructor: Function) => void {
  return function (_constructor: Function): void {
    (_constructor as any).$isComponentDirective = true;
    (_constructor as any).$selector = options.selector;
    (_constructor as any)._injectedDeclarations = new Map();
    const vm: IComponent<State, Props, Vm> = _constructor.prototype;
    vm.$template = options.template;

    // component $providerList for injector
    if (options.providers && options.providers.length > 0) {
      vm.$providerList = new Map();
      const length = options.providers.length;
      for (let i = 0; i < length; i++) {
        const service = options.providers[i];
        if ((service as TInjectTokenProvider).provide) {
          if ((service as TUseClassProvider).useClass || (service as TuseValueProvider).useValue) vm.$providerList.set((service as TInjectTokenProvider).provide, service);
        } else {
          vm.$providerList.set(service as Function, service as Function);
        }
      }
    }

    vm.$declarations = [];
    vm.$componentList = [];

    vm.setState = function (newState: any): void {
      if (newState && utils.isFunction(newState)) {
        const _newState = newState();
        if (_newState && _newState instanceof Object) {
          if (utils.isEqual(this.state, _newState)) return;
          const _state = JSON.parse(JSON.stringify(this.state));
          Object.assign(_state, _newState);
          this.state = _state;
          if ((this as IComponent<State, Props, Vm>).nvWatchState) (this as IComponent<State, Props, Vm>).stateWatcher = new Watcher((this as IComponent<State, Props, Vm>).state, (this as IComponent<State, Props, Vm>).nvWatchState.bind(this as IComponent<State, Props, Vm>), (this as IComponent<State, Props, Vm>).reRender.bind(this as IComponent<State, Props, Vm>));
          if (!(this as IComponent<State, Props, Vm>).nvWatchState) (this as IComponent<State, Props, Vm>).stateWatcher = new Watcher((this as IComponent<State, Props, Vm>).state, null, (this as IComponent<State, Props, Vm>).reRender.bind(this as IComponent<State, Props, Vm>));
          (this as IComponent<State, Props, Vm>).reRender();
        }
      }
      if (newState && newState instanceof Object) {
        if (utils.isEqual(this.state, newState)) return;
        const _state = JSON.parse(JSON.stringify(this.state));
        Object.assign(_state, newState);
        this.state = _state;
        if ((this as IComponent<State, Props, Vm>).nvWatchState) (this as IComponent<State, Props, Vm>).stateWatcher = new Watcher((this as IComponent<State, Props, Vm>).state, (this as IComponent<State, Props, Vm>).nvWatchState.bind(this as IComponent<State, Props, Vm>), (this as IComponent<State, Props, Vm>).reRender.bind(this as IComponent<State, Props, Vm>));
        if (!(this as IComponent<State, Props, Vm>).nvWatchState) (this as IComponent<State, Props, Vm>).stateWatcher = new Watcher((this as IComponent<State, Props, Vm>).state, null, (this as IComponent<State, Props, Vm>).reRender.bind(this as IComponent<State, Props, Vm>));
        (this as IComponent<State, Props, Vm>).reRender();
      }
    };

    vm.watchData = function (): void {
      if (this.state) {
        if ((this as IComponent<State, Props, Vm>).nvWatchState) (this as IComponent<State, Props, Vm>).stateWatcher = new Watcher((this as IComponent<State, Props, Vm>).state, (this as IComponent<State, Props, Vm>).nvWatchState.bind(this as IComponent<State, Props, Vm>), (this as IComponent<State, Props, Vm>).reRender.bind(this as IComponent<State, Props, Vm>));
        if (!(this as IComponent<State, Props, Vm>).nvWatchState) (this as IComponent<State, Props, Vm>).stateWatcher = new Watcher((this as IComponent<State, Props, Vm>).state, null, (this as IComponent<State, Props, Vm>).reRender.bind(this as IComponent<State, Props, Vm>));
      }
    };
  };
}

export default Component;
