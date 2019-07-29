import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
import { getProps } from 'vue-custom-element/src/utils/props'
import camelCase from 'lodash.camelcase'

Vue.use(vueCustomElement)

function connectedCallback() {
  const el = this
  // NOTE: Object, Array型のプロパティを自前でJSON.parseする必要がある
  Array.from(el.attributes)
    .filter(({ name }) => name.startsWith(':'))
    .forEach(({ name, value }) => {
      el[camelCase(name.slice(1))] = JSON.parse(value)
    })
}

// NOTE: vue-custom-element && Chromeで発生するslot不具合の暫定対応 (遅延させないとchidNodesが取れない)
// SEE: https://github.com/karol-f/vue-custom-element/issues/162
const asyncComponentDefinition = component => () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(component)
  }, 0)
})

const registerCustomElement = (
  tag,
  componentDefinition,
  { hasSlot, vueOptions, ...options } = {},
) => {
  // NOTE: Vue.extendで定義しているコンポーネントをそのまま渡すとasyncコンポーネント扱いになってエラーとなる為extendsOptionsを渡すようにしている
  // SEE: https://github.com/karol-f/vue-custom-element/issues/143
  // SEE: https://github.com/vuejs/vue/blob/v2.6.10/src/core/global-api/extend.js#L19-L81
  const componentOptions = componentDefinition.extendOptions
    ? componentDefinition.extendOptions
    : componentDefinition

  // NOTE: slotがある場合は遅延コンポーネント扱いしている為、props定義を自前で取得して配列形式で渡す必要がある
  const propsOptions = hasSlot ? { props: getProps(componentOptions).camelCase } : {}

  const beforeCreateVueInstance = rootElement => ({
    ...rootElement,
    ...vueOptions,
  })

  Vue.customElement(tag, hasSlot ? asyncComponentDefinition(componentOptions) : componentOptions, {
    ...options,
    ...propsOptions,
    connectedCallback,
    beforeCreateVueInstance,
  })
}

export default registerCustomElement
