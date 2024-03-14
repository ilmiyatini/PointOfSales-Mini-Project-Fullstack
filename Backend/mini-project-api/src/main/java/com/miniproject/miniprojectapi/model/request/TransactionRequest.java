package com.miniproject.miniprojectapi.model.request;

import java.util.List;

public class TransactionRequest {
	private Long total_amount;
    private Long total_pay;
    private List<TransactionRequestDetail> transaction_details;
    
	public Long getTotal_amount() {
		return total_amount;
	}
	public void setTotal_amount(Long total_amount) {
		this.total_amount = total_amount;
	}
	public Long getTotal_pay() {
		return total_pay;
	}
	public void setTotal_pay(Long total_pay) {
		this.total_pay = total_pay;
	}
	public List<TransactionRequestDetail> getTransaction_details() {
		return transaction_details;
	}
	public void setTransaction_details(List<TransactionRequestDetail> transaction_details) {
		this.transaction_details = transaction_details;
	}  
}
