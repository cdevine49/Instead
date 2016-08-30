class Api::WorkExperiencesController < ApplicationController
  def create
    debugger
    @work_experience = current_user.profile.work_experiences.build(work_experience_params)
    @work_experience.start = set_date(params[:work_experience][:start_year], params[:work_experience][:start_month])
    @work_experience.end = set_date(params[:work_experience][:end_year], params[:work_experience][:end_month])

    if @work_experience.save
      render :show
    else
      render json: { message: "Work Experience wasn't saved" }, status: 422
    end
  end

  def update
    @work_experience = WorkExperience.find(params[:id])

    if @work_experience.update(work_experience_params)
      render :show
    else
      render json: { message: "Experience wasn't updated" }, status: 422
    end
  end

  def destroy
    @work_experience = WorkExperience.find(params[:id])
    @work_experience.destroy
    render json: {}, status: 204
  end

  private
  def work_experience_params
    params.require(:work_experience).permit(:company, :position, :location, :description)
  end
end
