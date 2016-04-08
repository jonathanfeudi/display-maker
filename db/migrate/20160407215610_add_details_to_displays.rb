class AddDetailsToDisplays < ActiveRecord::Migration
  def change
    add_column :displays, :background_color, :string
    add_column :displays, :column_names, :string
  end
end
