class Api::V1::AuthController < ApplicationController
  skip_before_action :authorized, only: [:create]

  def create
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      token = issue_token(user)
      render json: { user: user, jwt: token }
    else
      render json: { error: "That user could not be found" }, status: 401
    end
  end
end
