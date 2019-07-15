module VueCustomElementRails
  module Helpers
    def vue_component_props(props)
      hash_arr =
        props.map do |key, value|
          if value.is_a?(Hash) || value.is_a?(Array)
            key = ":#{key}"
            value = _vue_component_props_json(value)
          end

          [key.to_s.downcase.dasherize, value]
        end
      hash_arr.to_h
    end

    using Dekiru::CamelizeHash

    def _vue_component_props_json(value)
      value.is_a?(Hash) ? value.deep_camelize_keys(:lower).to_json : value.to_json
    end
  end
end
