class UsersController < ApplicationController
  before_action :authenticate, except: [:new, :create]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:current_user_id] = @user.id
      redirect_to displays_path
    else
      redirect_to new_user_path
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def destroy
    @user = User.find(params[:id])
    session[:current_user_id] = nil
    @user.destroy
    #redirect_to a place
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end

end
