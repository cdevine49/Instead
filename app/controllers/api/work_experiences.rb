class Api::WorkExperiencesController < ApplicationController
  def create
    @work_experience = WorkExperience.new(work_experience_params)

    if @work_experience.save
      render :show
    else
      render json: { message: "Work Experience wasn't saved" }, status: 422
    end
  end

  def update
    @work_experience = WorkExperience.find(params[:id])
    render :show
  end

  def destroy
    @work_experience = WorkExperience.find(params[:id])
    @work_experience.destroy
    render json: {}, status: 204
  end

  private
  def work_experience_params
    params.require(:work_experience).permit(:company, :position, :start, :end, :description)
  end
end
