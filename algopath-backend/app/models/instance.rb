class Instance < ApplicationRecord
  belongs_to :user
  has_many :walls
end
