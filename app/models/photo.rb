class Photo < ActiveRecord::Base
  attr_accessor :crop_x, :crop_y, :crop_w, :crop_h
  after_create :reprocess_image, if: :cropping?
  belongs_to :photoable, polymorphic: true
  has_many :photo_joins

  has_attached_file :image,
                    styles: { original: {} },
                    :processors => [:cropper]

  validates_attachment :image,
    content_type: { content_type: /\Aimage\/.*\Z/ }

  def cropping?
    !crop_x.blank? && !crop_y.blank? && !crop_w.blank? && !crop_h.blank?
  end

  private

  def reprocess_image
    image.reprocess!
  end


end
