# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Balance.destroy_all
Transaction.destroy_all
Holding.destroy_all

ActiveRecord::Base.connection.tables.each do |t|
  ActiveRecord::Base.connection.reset_pk_sequence!(t)
end

aa = User.create!(name: "Guest", email: "guest@email.com", password: "password")

ba = Balance.create!(user_id: aa.id, amount: 5000.0)

ca = Transaction.create!(user_id: aa.id, symbol: "MSFT", price: 40.05, quantity: 3)

da = Holding.create!(user_id: aa.id, symbol: "MSFT", quantity: 3)