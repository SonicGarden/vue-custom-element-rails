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

      it { is_expected.to eq({ ':vue-custom-element' => '{"userName":"hoge"}', 'gem-version' => '0.1' }) }
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

      it { is_expected.to eq({ ':vue-custom-element' => '{"userName":"hoge"}', 'gem-version' => '0.1' }) }
    end

    context 'boolean props' do
      let(:props) do
        {
          is_show: true,
          is_hide: false,
        }
      end

      it { is_expected.to eq({ 'is-show' => 'true', 'is-hide' => 'false' }) }
    end

    context 'number props' do
      let(:props) do
        {
          integer: 10,
          float: 0.01,
        }
      end

      it { is_expected.to eq({ 'integer' => '10', 'float' => '0.01' }) }
    end

    context 'nil props' do
      let(:props) do
        {
          nil_value: nil,
          some_value: 'some'
        }
      end

      it { is_expected.to eq({ 'some-value' => 'some' }) }
    end
  end
end
