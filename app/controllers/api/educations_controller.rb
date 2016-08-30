class Api::EducationsController < ApplicationController
  before_action :find_by_id, only: [:update, :destroy]

  def index
    @educations = User.find(params[:user_id]).educations
  end

  def create
    @education = current_user.profile.educations.build(education_params)
    if @education.save
      render :show
    else
      render json: { message: "Education wasn't saved" }, status: 422
    end
  end

  def update
    if @education.update(education_params)
      render :show
    else
      render json: { message: "Education wasn't updated" }, status: 422
    end

  end

  def destroy
    @education.destroy
    render :show
  end

  private
  def education_params
    params.require(:education)
    .permit(:school, {start: []}, {end: []}, :degree, :field, :grade, :extracurriculars, :description)
  end

  def find_by_id
    @education = Education.find(params[:id])
  end
end
