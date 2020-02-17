class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :user_id, null: false
      t.string :symbol, null: false
      t.integer :price, null: false
      t.integer :quantity, null: false

      t.timestamps
    end
    add_index :transactions, :user_id
  end
end
