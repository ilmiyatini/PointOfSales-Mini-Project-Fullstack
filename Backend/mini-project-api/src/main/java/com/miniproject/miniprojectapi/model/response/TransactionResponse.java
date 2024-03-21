package com.miniproject.miniprojectapi.model.response;


import java.util.List;


public class TransactionResponse {

    private List<TransactionDetailResponse> transaction_details;

    public TransactionResponse(List<TransactionDetailResponse> transaction_details) {
        this.transaction_details = transaction_details;
    }

    public List<TransactionDetailResponse> getTransaction_details() {
        return transaction_details;
    }

    public void setTransaction_details(List<TransactionDetailResponse> transaction_details) {
        this.transaction_details = transaction_details;
    }
}
