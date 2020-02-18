class Api::TransactionsController < ApplicationController


    def create
        price = params[:transaction][:price].to_f
        quantity = params[:transaction][:quantity].to_i
        symbol = params[:transaction][:symbol]
        # user = current_user
        if !update_balance(price * quantity)  #attempt to
            return render json: ['Not enough cash'], status: 422 
        end
        @transaction = Transaction.new(transaction_params)
        @transaction.user_id = current_user.id
        if @transaction.save
            @holding = update_holdings(symbol, quantity)
            render :show
        else
            render json: @transaction.errors.full_messages, status: 422 #unprocesssable entity
        end

    end

    private
    def update_holdings(symbol, quantity)
        
        @holding = current_user.holdings.find_by(symbol: symbol)
        if @holding
            @holding.quantity += quantity
        else
            @holding = Holding.new(:quantity => quantity, 
                                    :user_id => current_user.id, 
                                    :symbol => symbol)
        end
        @holding.save
        return @holding
    end
    def update_balance(amount)
        @balance = current_user.balance
        if @balance.amount >= amount
            @balance.amount -= amount
            @balance.save
            return true
        else
            return false
        end
    end
    def transaction_params
        return params.require(:transaction).permit(:symbol, :price, :quantity)
    end
end