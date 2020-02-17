class Api::UsersController < ApplicationController
  def index
    @users = User.all
    render :index
  end 
  

  def show
    @user = User.find(params[:id])
    render :show
  end

  def create 
    @user = User.new(user_params)
    if @user.save
      @balance = Balance.new(:user_id => @user.id, :amount => 5000.0)
      @balance.save

      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422 #unprocesssable entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
