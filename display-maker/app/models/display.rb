class Display < ActiveRecord::Base
  belongs_to :user

  validates :name, :html_string, presence:true

end
