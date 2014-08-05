class Api::SoftwareController < ApplicationController
  respond_to :json

  def index
    search_service = SoftwareSearchService.new(self)
    results = search_service.perform(params[:term])
  end

  def search_results_found(results)
    render json: results, each_serializer: SoftwareSerializer, root: 'app'
  end

  def search_results_not_found(term)
    render status: :not_found
  end
end
