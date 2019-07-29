require 'active_support/core_ext/hash/keys' # NOTE: dekiru側で読み込むべき
require 'vue_custom_element_rails/helpers'

RSpec.describe VueCustomElementRails::Helpers do
  let(:helper) do
    (Class.new do
      include VueCustomElementRails::Helpers
    end).new
  end

  describe '#vue_component_props' do
    subject { helper.vue_component_props(props) }

    context 'underscore props' do
      let(:props) do
        {
          vue_custom_element: {
            user_name: 'hoge',
          },
          gem_version: 0.1,
        }
      end

      it { is_expected.to eq({ ':vue-custom-element' => '{"userName":"hoge"}', 'gem-version' => 0.1 }) }
    end

    context 'camelcase props' do
      let(:props) do
        {
          vueCustomElement: {
            user_name: 'hoge',
          },
          gem_version: 0.1,
        }
      end

      it { is_expected.to eq({ ':vue-custom-element' => '{"userName":"hoge"}', 'gem-version' => 0.1 }) }
    end
  end
end
