# vue-custom-element-rails

[vue\-custom\-element](https://github.com/karol-f/vue-custom-element) wrapper

## Installation

```
yarn add https://github.com/SonicGarden/vue-custom-element-rails.git
```

```ruby
gem 'vue_custom_element_rails', github: 'SonicGarden/vue-custom-element-rails'
```

## Usage

```javascript
import registerCustomElement from 'vue-custom-element-rails'

// IE11サポート不要の場合
// import registerCustomElement from 'vue-custom-element-rails/src/slim'

import MyComponent from './components/MyComponent.vue'

registerCustomElement('my-component', MyComponent)
```

```haml
%my-component{ vue_component_props(user: user_hash, items: items) }
```

### vue-i18n と組み合わせる場合

```javascript
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import registerCustomElement from 'vue-custom-element-rails'
import MyComponent from './components/MyComponent.vue'

Vue.use(VueI18n)

const messages = {
  en: {
    message: {
      hello: 'hello world',
    },
  },
  ja: {
    message: {
      hello: 'こんにちは、世界',
    },
  },
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
