require 'rails_helper'

describe SoftwareSearchService, vcr: {match_requests_on: [:method, :uri]} do
  let(:search_service) { described_class.new(listener) }
  let(:listener) { double() }
  let(:gasapp_results) { search_service.perform('gasapp') }

  it 'should find 2 results' do
    allow(listener).to receive(:search_results_found) { |results|
      expect(results.size).to eq(2)
    }
    gasapp_results
  end

  describe 'returning results' do
    it 'should be an instance of the Software entity' do
      allow(listener).to receive(:search_results_found) { |results|
        expect(results.first).to be_a(Software)
        puts results
        puts results.first
        expect(results.first.seller_name).not_to be_nil
      }

      gasapp_results
    end
  end
end
