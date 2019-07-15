module VueCustomElementRails
  class Railtie < Rails::Railtie
    ActiveSupport.on_load :action_view do
      require 'vue_custom_element_rails/helpers'
      include Helpers
    end
  end
end
