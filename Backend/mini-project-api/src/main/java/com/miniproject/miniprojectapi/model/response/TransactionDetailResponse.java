package com.miniproject.miniprojectapi.model.response;

public class TransactionDetailResponse {
	private int product_id;
    private int quantity;
    private double subtotal;
    
    public TransactionDetailResponse() {
       
    }

    public TransactionDetailResponse(Integer product_id, Integer quantity, Integer subtotal) {
        this.product_id = product_id;
        this.quantity = quantity;
        this.subtotal = subtotal;
    }
    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }
}
