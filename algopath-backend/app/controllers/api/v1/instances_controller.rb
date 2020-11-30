class Api::V1::InstancesController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
        instance = Instance.create(start_node_col: params[:start_node_col], start_node_row: params[:start_node_row], end_node_col: params[:finish_node_col], end_node_row: params[:finish_node_row], user_id: params[:user_id])
        render json: instance
    end
end
