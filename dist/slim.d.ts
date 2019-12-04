import Vue, { ComponentOptions, VueConstructor } from 'vue';
import vueCustomElement from 'vue-custom-element';
interface Options extends vueCustomElement.options {
    hasSlot?: boolean;
    vueOptions?: ComponentOptions<Vue>;
}
interface IregisterCustomElement {
    (tag: string, componentDefinition: ComponentOptions<Vue>, options?: Options): void;
    (tag: string, singleFileComponent: VueConstructor<Vue>, options?: Options): void;
    (tag: string, asyncComponentDefinition: () => Promise<ComponentOptions<Vue>>, options?: Options): void;
}
declare const registerCustomElement: IregisterCustomElement;
export default registerCustomElement;
