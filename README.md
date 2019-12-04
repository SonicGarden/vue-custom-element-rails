# vue-custom-element-rails

[vue\-custom\-element](https://github.com/karol-f/vue-custom-element) wrapper

## Installation

```
yarn add @sonicgarden/vue-custom-element-rails
```

```ruby
gem 'vue_custom_element_rails', github: 'SonicGarden/vue-custom-element-rails'
```

## Usage

```javascript
import registerCustomElement from '@sonicgarden/vue-custom-element-rails'

// When IE11 support is not required
// import registerCustomElement from '@sonicgarden/vue-custom-element-rails/dist/slim'

import MyComponent from './components/MyComponent.vue'

registerCustomElement('my-component', MyComponent)
```

```haml
%my-component{ vue_component_props(user: user_hash, items: items) }
```

### With vue-i18n

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
