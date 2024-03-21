package com.miniproject.miniprojectapi.model.request;

import java.util.List;

public class TransactionRequest {
	private Integer total_amount;
    private Integer total_pay;
    
    private List<TransactionRequestDetail> transaction_details;
    
	public Integer getTotal_amount() {
		return total_amount;
	}
	public void setTotal_amount(Integer total_amount) {
		this.total_amount = total_amount;
	}
	public Integer getTotal_pay() {
		return total_pay;
	}
	public void setTotal_pay(Integer total_pay) {
		this.total_pay = total_pay;
	}
	public List<TransactionRequestDetail> getTransaction_details() {
		return transaction_details;
	}
	public void setTransaction_details(List<TransactionRequestDetail> transaction_details) {
		this.transaction_details = transaction_details;
	}  
}
