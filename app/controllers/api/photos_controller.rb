class Api::PhotosController < ApplicationController
  def create
    @photo = Photo.new(photo_params)

    if @photo.save
      render :show
    else
      render json: { message: "Photo wasn't saved" }, status: 422
    end
  end

  private
  def photo_params
    params.require(:photo).permit(:image)
  end
end
