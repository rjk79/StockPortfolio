class ChangePriceToFloat < ActiveRecord::Migration[5.2]
  def change
    change_column :transactions, :price, :float
  end
end
