class CreateHoldings < ActiveRecord::Migration[5.2]
  def change
    create_table :holdings do |t|
      t.integer :user_id, null: false
      t.string :symbol, null: false
      t.integer :quantity, null: false

      t.timestamps
    end
    add_index :holdings, :user_id
  end
end
