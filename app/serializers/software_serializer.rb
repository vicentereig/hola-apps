class SoftwareSerializer < ActiveModel::Serializer
  attributes :track_name, :description, :supported_devices, :artwork_url60,
             :artwork_url100, :seller_name, :release_notes, :artist_name, :id,
             :average_user_rating, :user_rating_count, :version, :track_view_url

  def id
    self.object.track_id
  end
end
