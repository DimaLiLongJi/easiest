export type TFnWatcher = (oldData?: any) => void;

export type TFnRender = () => any;

export type TLocationState = {
    path: string;
    query?: any,
    params?: any;
}

export type TRouter = {
    path: string;
    redirectTo?: string;
    component?: string;
    children?: TRouter[];
};

export type ComponentList<C> = {
    dom: Node;
    props: any;
    scope: C;
    constructorFunction: Function;
};

export interface IMiddleware<ES> {
    bootstrap(vm: ES): void;
}

export type EsRouteObject = {
    path: string;
    query?: {
        [props: string]: any;
    };
    data?: any;
}

export type TComponentOptions = {
    selector: string;
    template: string;
    providers?: (Function | TUseClassProvider | TuseValueProvider)[];
};

type TDirectiveOptions = {
    selector: string;
    providers?: (Function | TUseClassProvider | TuseValueProvider)[];
};

export type TInjectableOptions = {
    isSingletonMode?: boolean;
};

export type TInjectTokenProvider = {
    [props: string]: any | Function;
    provide: any;
    useClass?: Function;
    useValue?: any;
};

export type TUseClassProvider = {
    provide: any;
    useClass: Function;
};
  
export type TuseValueProvider = {
    provide: any;
    useValue: any;
};

export type TNvModuleOptions = {
    imports?: Function[];
    declarations: Function[];
    providers?: (Function | TUseClassProvider | TuseValueProvider)[];
    exports?: Function[];
    bootstrap?: Function;
};

export type TAttributes = {
    name: string;
    value: string;
};

export interface IVnode {
    tagName?: string;
    node?: DocumentFragment | Element;
    parentNode?: Node;
    attributes?: TAttributes[];
    nodeValue?: string;
    childNodes?: IVnode[];
    type?: string;
    value?: string | number;
    repeatData?: any;
    eventTypes?: string;
    key?: any;
    checked?: boolean;
}

export interface IComponent<State = any, Props = any, Vm = any> {
    state?: State | any;
    props?: Props | any;
    compileUtil: CompileUtil;
    renderDom?: Element;
    $vm?: Vm | any;
    stateWatcher?: Watcher;

    $template?: string;
    $declarations?: Function[];
    $componentList?: ComponentList<IComponent<any, any, any>>[];
    $providerList?: Map<Function | string, Function | any>;

    setState?: SetState;
    getLocation?: GetLocation;
    setLocation?: SetLocation;

    nvOnInit?(): void;
    watchData?(): void;
    nvBeforeMount?(): void;
    nvAfterMount?(): void;
    nvOnDestory?(): void;
    nvHasRender?(): void;
    nvWatchState?(oldState?: any): void;
    nvRouteChange?(lastRoute: string, newRoute: string): void;
    nvReceiveProps?(nextProps: Props): void;
    render(): Promise<IComponent<State, Props, Vm>>;
    reRender(): Promise<IComponent<State, Props, Vm>>;
}

export interface INvModule {
    $imports?: Function[];
    $declarations?: Function[];
    $providers?: (Function | TUseClassProvider | TuseValueProvider)[];
    $exports?: Function[];
    $providerList?: Map<Function | string, Function | any>;
    $providerInstances?: Map<Function | string, any>;
    $bootstrap?: Function;
  
    buildProviderList(): void;
    buildProviders4Services(): void;
    buildProviders4Declarations(): void;
    buildDeclarations4Declarations(): void;
    buildImports(): void;
}

export declare class Watcher {
    data: any;
    watcher: TFnWatcher;
    render: TFnRender;
    constructor(data: any, watcher?: TFnWatcher, render?: TFnRender);
    watchData(data: any): void;
}

export declare class Utils {
    constructor();
    toString: () => string;
    setCookie(name: string, value: any, options?: any): void;
    getCookie(name: string): any;
    removeCookie(name: string): boolean;
    buildQuery(object: any): string;
    getQuery(name: string): string;
    isFunction(func: any): boolean;
    isEqual(a: any, b: any, aStack?: any[], bStack?: any[]): boolean;
    deepIsEqual(a: any, b: any, aStack?: any[], bStack?: any[]): boolean;
    formatInnerHTML(inner: string): string;
    isBrowser(): boolean;
}

export declare class NVHttp {
    get?<P = any, R = any>(url: string, params?: P): Promise<R>;
    delete?<P = any, R = any>(url: string, params?: P): Promise<R>;
    post?<P = any, R = any>(url: string, params?: P): Promise<R>;
    put?<P = any, R = any>(url: string, params?: P): Promise<R>;
    patch?<P = any, R = any>(url: string, params?: P): Promise<R>;
}

export declare class KeyWatcher {
    data: any;
    watcher?: TFnWatcher;
    key: string;
    constructor(data: any, key: string, watcher?: TFnWatcher);
    watchData(data: any, key: string): void;
}

export declare class CompileUtilForRepeat {
    [index: string]: any;
    $fragment?: Element | DocumentFragment;
    constructor(fragment?: Element | DocumentFragment);
    _getValueByValue(vm: any, exp: string, key: string): any;
    _setValueByValue(vm: any, exp: string, key: string, setValue: any): any;
    _getVMVal(vm: any, exp: string): any;
    _getVMRepeatVal(val: any, exp: string, key: string): any;
    _getVMFunction(vm: any, exp: string): Function;
    _getVMFunctionArguments(vm: any, exp: string, node: Element, key: string, val: any): any[];
    bind(node: Element, key?: string, dir?: string, exp?: string, index?: number, vm?: any, watchValue?: any, val?: any): void;
    templateUpdater(node: Element, val?: any, key?: string, vm?: any): void;
    modelUpdater(node: Element, value: any, exp: string, key: string, index: number, watchData: any, vm: any): void;
    textUpdater(node: Element, value: any): void;
    htmlUpdater(node: Element, value: any): void;
    ifUpdater(node: Element, value: any): void;
    classUpdater(node: Element, value: any): void;
    keyUpdater(node: Element, value: any): void;
    commonUpdater(node: Element, value: any, dir: string): void;
    eventHandler(node: Element, vm: any, exp: string, eventName: string, key: string, val: any): void;
}
export declare class CompileUtil {
    [index: string]: any;
    $fragment?: Element | DocumentFragment;
    constructor(fragment?: Element | DocumentFragment);
    _getValueByValue(vm: any, exp: string, key: string): any;
    _getVMVal(vm: any, exp: string): any;
    _getVMRepeatVal(vm: any, exp: string): void;
    _getVMFunction(vm: any, exp: string): Function;
    _getVMFunctionArguments(vm: any, exp: string, node: Element): any[];
    bind(node: Element, vm: any, exp: string, dir: string): void;
    templateUpdater(node: any, vm: any, exp: string): void;
    modelUpdater(node: Element, value: any, exp: string, vm: any): void;
    textUpdater(node: Element, value: any): void;
    htmlUpdater(node: Element, value: any): void;
    ifUpdater(node: Element, value: any): void;
    classUpdater(node: Element, value: any): void;
    keyUpdater(node: Element, value: any): void;
    commonUpdater(node: Element, value: any, dir: string): void;
    repeatUpdater(node: Element, value: any, expFather: string, vm: any): void;
    repeatChildrenUpdater(node: Element, value: any, expFather: string, index: number, vm: any, watchValue: any): void;
    eventHandler(node: Element, vm: any, exp: string, eventName: string): void;
    isDirective(attr: string): boolean;
    isEventDirective(event: string): boolean;
    isElementNode(node: Element): boolean;
    isRepeatNode(node: Element): boolean;
    isRepeatProp(node: Element): boolean;
    isTextNode(node: Element): boolean;
    cloneNode(node: Element, repeatData?: any): Node;
}
export declare class Compile {
    $vm: any;
    $el: Element;
    $fragment: DocumentFragment;
    constructor(el: string | Element, vm: any);
    init(): void;
    needDiffChildCallback(oldVnode: IVnode, newVnode: IVnode): boolean;
    compileElement(fragment: DocumentFragment): void;
    recursiveDOM(childNodes: NodeListOf<Node & ChildNode>, fragment: DocumentFragment | Element): void;
    compile(node: Element, fragment: DocumentFragment | Element): void;
    node2Fragment(): DocumentFragment;
    compileText(node: Element, exp: string): void;
    isDirective(attr: string): boolean;
    isEventDirective(eventName: string): boolean;
    isElementNode(node: Element | string): boolean;
    isRepeatNode(node: Element): boolean;
    isTextNode(node: Element): boolean;
}

export declare class InDiv {
    modalList: IMiddleware<InDiv>[];
    rootDom: Element;
    $rootPath: string;
    $canRenderModule: boolean;
    $routeDOMKey: string;
    $rootModule: INvModule;
    $declarations?: Function[];
    $esRouteObject?: EsRouteObject;
    $esRouteParmasObject?: {
        [props: string]: any;
    };
    render?: <State = any, Props = any, Vm = any>() => Promise<IComponent<State, Props, Vm>>;
    reRender?: <State = any, Props = any, Vm = any>() => Promise<IComponent<State, Props, Vm>>;
    constructor();
    use(modal: IMiddleware<InDiv>): number;
    setRootPath(rootPath: string): void;
    bootstrapModule(Esmodule: Function): void;
    init(): void;
    renderModuleBootstrap(): void;
    renderComponent(BootstrapComponent: Function, renderDOM: Element): Promise<IComponent>;
    replaceDom(component: IComponent, renderDOM: Element): Promise<IComponent>;
}

// Dependency Injection
export declare function Injectable(options?: TInjectableOptions): (_constructor: Function) => void;

export declare function Injected(_constructor: Function): void;

export declare function injector(_constructor: Function, rootModule: any): any[];

export declare function factoryCreator(_constructor: Function, rootModule: any): any;

export declare function Component<State = any, Props = any, Vm = any>(options: TComponentOptions): (_constructor: Function) => void;

export declare function Directive<State = any, Props = any, Vm = any>(options: TDirectiveOptions): (_constructor: Function) => void;

export declare function NvModule(options: TNvModuleOptions): (_constructor: Function) => void;

export declare function factoryModule(EM: Function): INvModule;

// life cycle hooks
export declare interface OnInit {
    nvOnInit(): void;
}

export declare interface BeforeMount {
    nvBeforeMount(): void;
}

export declare interface AfterMount {
    nvAfterMount(): void;
}

export declare interface OnDestory {
    nvOnDestory(): void;
}

export declare interface HasRender {
    nvHasRender(): void;
}

export declare interface WatchState {
    nvWatchState(oldState?: any): void;
}

export declare interface RouteChange {
    nvRouteChange(lastRoute?: string, newRoute?: string): void;
}

export declare interface ReceiveProps {
    nvReceiveProps(nextProps: any): void;
}

// component functions
export declare type SetState = <S>(newState: { [key: string]: S }) => void;

// InDiv Router
export declare class Router {
    routes: TRouter[];
    routesList: TRouter[];
    currentUrl: string;
    lastRoute: string;
    rootDom: Element;
    $rootPath: string;
    hasRenderComponentList: IComponent[];
    needRedirectPath: string;
    $vm: InDiv;
    watcher: KeyWatcher;
    renderRouteList: string[];
    constructor();
    bootstrap(vm: InDiv): void;
    init(arr: TRouter[]): void;
    setRootPath(rootPath: string): void;
    routeChange?(lastRoute?: string, nextRoute?: string): void;
    redirectTo(redirectTo: string): void;
    refresh(): void;
    distributeRoutes(): Promise<any>;
    insertRenderRoutes(): Promise<IComponent>;
    generalDistributeRoutes(): Promise<IComponent>;
    routerChangeEvent(index: number): void;
    emitComponentEvent(componentList: ComponentList<IComponent>[], event: string): void;
    instantiateComponent(FindComponent: Function, renderDom: Element): Promise<IComponent>;
}

export declare type GetLocation = () => {
    path?: string;
    query?: {
        [props: string]: any;
    };
    params?: {
        [props: string]: any;
    };
    data?: any;
};

export declare type SetLocation = <Q, P>(path: string, query?: Q, params?: P, title?: string) => void;
