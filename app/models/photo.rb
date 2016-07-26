class Photo < ActiveRecord::Base
  belongs_to :photoable, polymorphic: true
  has_many :photo_joins

  has_attached_file :image

  validates_attachment :image,
    content_type: { content_type: /\Aimage\/.*\Z/ }
end
