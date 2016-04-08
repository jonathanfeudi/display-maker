class DisplaysController < ApplicationController

  def index
    @displays = Display.all
  end

  def show
    @user = User.find(session[:current_user_id])
    @display = Display.find(params[:id])
    if @user.id != @display.user_id
      redirect_to displays_path
    end
  end

  def new
    @display = Display.new
  end

  def create
    @display = Display.new(display_params)

    if @display.save
      redirect_to display_path(@display)
    else
      render new_display_path(@display)
    end
  end


  def edit
    @display = Display.find(params[:id])
  end

  def update
    @display = Display.find(params[:id])
    @display.update(display_params)
    redirect_to display_path(@display)
  end

  def destroy
    @display = Display.find(params[:id])
    @display.destroy
    redirect_to displays_path
  end

  def display_params
    params.require(:display).permit(:display_name, :html_string, :user_id, :frame_names, :background_color)
  end

end
