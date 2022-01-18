class CreateColors < ActiveRecord::Migration[7.0]
  def change
    create_table :colors do |t|
      t.text :hex_code
      t.integer :views

      t.timestamps
    end
  end
end
