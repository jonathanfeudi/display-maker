class CreateDisplays < ActiveRecord::Migration
  def change
    create_table :displays do |t|
      t.string :display_name
      t.string :html_string
      t.references :user
    end
  end
end
