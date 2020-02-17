class Holding < ApplicationRecord
    validates_uniqueness_of :symbol, :scope => :user_id

    belongs_to :user

end
