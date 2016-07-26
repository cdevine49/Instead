module Photoable
  extend ActiveSupport::Concern

  included do
    has_many :photo_joins, as: :photoable
    has_many :photos, through: :photo_joins
  end
end
