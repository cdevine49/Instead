class Api::EducationsController < ApplicationController
  before_action :find_by_id, only: [:update, :destroy]

  def index
    @educations = current_user.educations
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
    # @education = Education.find(params[:id])
    debugger
    if @education.update(education_params)
      render :show
    else
      render json: { message: "Education wasn't updated" }, status: 422
    end

  end

  def destroy
    # @education = Education.find(params[:id])
    @education.destroy
    render json: {}, status: 204
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
