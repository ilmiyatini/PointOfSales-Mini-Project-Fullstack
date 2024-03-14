package com.miniproject.miniprojectapi.model.request;

public class TransactionRequestDetail {
	private Long product_id;
    private Long quantity;
    private Long subtotal;
    
	public Long getProduct_id() {
		return product_id;
	}
	public void setProduct_id(Long product_id) {
		this.product_id = product_id;
	}
	public Long getQuantity() {
		return quantity;
	}
	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}
	public Long getSubtotal() {
		return subtotal;
	}
	public void setSubtotal(Long subtotal) {
		this.subtotal = subtotal;
	}
}
