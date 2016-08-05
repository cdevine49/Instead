class Api::EducationsController < ApplicationController
  def create
    @education = Education.new(education_params)

    if @education.save
      render :show
    else
      render json: { message: "Education wasn't saved" }, status: 422
    end
  end

  def update
    @education = Education.find(params[:id])
    render :show
  end

  def destroy
    @education = Education.find(params[:id])
    @education.destroy
    render json: {}, status: 204
  end

  private
  def education_params
    params.require(:education).permit(:school, :start, :end, :degree, :field,
                                      :grade, :extracurriculars, :description)
  end
end
