class SoftwareSearchService < Struct.new(:listener)
  DEFAULT_LIMIT = 200
  def perform(term)
    return notify_listener unless term.present?

    results = software_repo.query(term: term, limit: DEFAULT_LIMIT)
    entities = results.map { |result| Software.new(result) }

    notify_listener(entities, term)
    entities
  end

  def notify_listener(entities=nil, term=nil)
    return unless listener.present?

    if entities.present?
      listener.search_results_found(entities)
    else
      listener.search_results_not_found(term)
    end
  end

  def software_repo
    @repo ||= Conquiro::SoftwareRepository.new
  end
end
