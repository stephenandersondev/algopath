class Api::V1::WallsController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
        walls = params[:walls]
        walls.each do |wall|
            Wall.create(col: wall[0], row: wall[1], instance_id: wall[2])
        end
    end
end
