class Software < SimpleDelegator
  include ActiveModel::Serialization

  def attributes
    self.to_h
  end
end
