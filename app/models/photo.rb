class Photo < ActiveRecord::Base
  belongs_to :photoable, polymorphic: true
  has_many :photo_joins

  has_attached_file :image

  validates_attachment :image,
    content_type: { content_type: /\Aimage\/.*\Z/ }

  # def cropping?
  #   !crop_x.blank? && !crop_y.blank? && !crop_w.blank? && !crop_h.blank?
  # end
  #
  # def image_geometry(style = :original)
  #   @geometry ||= {}
  #   @geometry[style] ||= Paperclip::Geometry.from_file(image.path(style))
  # end
  #
  # private
  #
  # def reprocess_image
  #   image.reprocess!
  # end
end
