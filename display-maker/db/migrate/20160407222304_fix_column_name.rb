class FixColumnName < ActiveRecord::Migration
  def change
    rename_column :displays, :column_names, :frame_names
  end
end
