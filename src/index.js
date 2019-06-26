import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
import { getProps } from 'vue-custom-element/src/utils/props'
import 'document-register-element/build/document-register-element'
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
  // NOTE: slotがある場合は遅延コンポーネント扱いしている為、props定義を自前で取得して配列形式で渡す必要がある
  const propsOptions = hasSlot ? { props: getProps(componentDefinition).camelCase } : {}

  const beforeCreateVueInstance = rootElement => ({
    ...rootElement,
    ...vueOptions,
  })

  Vue.customElement(
    tag,
    hasSlot ? asyncComponentDefinition(componentDefinition) : componentDefinition,
    {
      ...options,
      ...propsOptions,
      connectedCallback,
      beforeCreateVueInstance,
    },
  )
}

export default registerCustomElement
