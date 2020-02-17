class Api::SessionsController < ApplicationController
  def new
  end 

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      login(@user)
      render 'api/users/show'
    else
      render json: ['Invalid email or password'], status: 401 #unauthed
    end
  end

  def destroy
    if current_user
      logout
      render json: {}
    else  
      render json: ['No user is logged in'], status: 422
    end
  end
end
