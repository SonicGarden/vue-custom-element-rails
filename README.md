# vue-custom-element-rails

[vue\-custom\-element](https://github.com/karol-f/vue-custom-element)のラッパー

## Installation

```
"vue-custom-element-rails": "https://github.com/SonicGarden/vue-custom-element-rails.git"
```

## Usage

```javascript
import registerCustomElement from 'vue-custom-element-rails'
import MyComponent from './components/MyComponent.vue'

registerCustomElement('my-component', MyComponent)
```

### vue-i18nと組み合わせる場合

```javascript
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import registerCustomElement from 'vue-custom-element-rails'
import MyComponent from './components/MyComponent.vue'

Vue.use(VueI18n)

const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}

const i18n = new VueI18n({
  locale: 'ja',
  messages,
})

registerCustomElement('my-component', MyComponent, { vueOptions: { i18n } })
```

### Slot

In app/views/home/index.html.haml:
```haml
%my-component
  %p hello
```

```javascript
import registerCustomElement from 'vue-custom-element-rails'
import MyComponent from './components/MyComponent.vue'

registerCustomElement('my-component', MyComponent, { hasSlot: true })
```
