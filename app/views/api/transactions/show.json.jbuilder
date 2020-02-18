json.transaction do
    json.set! @transaction.id do
        json.extract! @transaction, :id, :symbol, :price, :quantity
    end
end

json.holding do
    json.extract! @holding, :symbol, :quantity
    
end

json.balance do
    json.set! @balance.user_id do
        json.extract! @balance, :amount, :user_id
    end
end