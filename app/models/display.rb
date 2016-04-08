class Display < ActiveRecord::Base
  belongs_to :user

  validates :display_name, :html_string, presence:true

end
