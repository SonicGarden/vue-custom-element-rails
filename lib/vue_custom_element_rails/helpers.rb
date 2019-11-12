require 'active_support/core_ext/string'
require 'dekiru/camelize_hash'
require 'json'

module VueCustomElementRails
  module Helpers
    def vue_component_props(props)
      hash_arr =
        props.map do |key, value|
          if value.is_a?(Hash) || value.is_a?(Array)
            key = ":#{key}"
            value = _vue_component_props_json(value)
          end

          [key.to_s.underscore.downcase.dasherize, value.to_s]
        end
      hash_arr.to_h
    end

    using Dekiru::CamelizeHash

    def _vue_component_props_json(value)
      case value
      when Hash
        value.deep_camelize_keys(:lower).to_json
      when Array
        value.map { |v| v.is_a?(Hash) ? v.deep_camelize_keys(:lower) : v }.to_json
      else
        value
      end
    end
  end
end
