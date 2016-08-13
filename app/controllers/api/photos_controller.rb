class Api::PhotosController < ApplicationController
  def create
    @photo = Photo.new(photo_params)

    if @photo.save
      render :show
    else
      render json: { message: "Photo wasn't saved" }, status: 422
    end
  end

  def update
    @photo = Photo.find(params[:id])
    render :show
  end

  def upload_avatar
    @photo = Photo.new(photo_params)

    if @photo.save
      current_user.profile.avatar = @photo
      render :show
    else
      render json: { message: "Avatar wasn't saved"}
    end
  end

  private
  def photo_params
    params.require(:photo).permit(:image, :url, :crop_x, :crop_y, :crop_w, :crop_h)
  end
end
