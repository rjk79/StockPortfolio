json.extract! user, :id, :name, :email


json.transactions do
    user.transactions.each do |transaction|
      json.set! transaction.id do
        json.extract! transaction, :id, :symbol, :quantity, :price
      end
    end
end

json.holdings do
    user.holdings.each do |holding|
      json.set! holding.symbol do
        json.extract! holding, :symbol, :quantity
      end
    end
end

json.balances do
  json.set! user.balance.user_id do
    json.extract! user.balance, :amount
  end
end