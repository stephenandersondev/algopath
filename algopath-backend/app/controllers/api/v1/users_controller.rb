class Api::V1::UsersController < ApplicationController
  skip_before_action :authorized, only: [:create, :show]

  def create
    @user = User.new(username: params[:username], password: params[:password])
    if @user.valid?
      @user.save
      @token = issue_token(@user)
      render json: { user: @user, jwt: @token }
    else
      render json: { error: "Failed to create user" }, status: :not_acceptable
    end
  end

  def show
    user = User.find(params[:id])
    results = user.last_ten
    render json: results
  end
end
