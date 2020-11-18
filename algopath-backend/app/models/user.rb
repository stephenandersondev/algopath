class User < ApplicationRecord
    has_many :instances
    has_secure_password
end
