class User < ApplicationRecord
    has_many :instances
    has_secure_password

    validates :password, presence: true
    validates :username, presence: true
    validates :username, uniqueness: true

    def last_ten
        last_ten = self.instances.sort_by{ |instance| -instance.id }.take(10)
        last_ten.map do |instance|
        {
            instance: instance,
            walls: instance.walls
        }
        end
    end
end
