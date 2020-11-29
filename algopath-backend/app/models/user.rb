class User < ApplicationRecord
    has_many :instances
    has_secure_password

    validates :password, presence: true
    validates :username, presence: true
    validates :username, uniqueness: true
end
