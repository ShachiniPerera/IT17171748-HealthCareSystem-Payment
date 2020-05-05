<%@page import="com.docpayment"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Payment Management</title>

<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/docpament.js"></script>

</head>
<body>
<div class="container">
	<div class="row">
		<div class="col-6">
			<h1>Payment Management </h1>
			
			<form id="formdocpayment" name="formdocpayment" method="post" action="Payment.jsp">

				Payment code:
				<input id="Paymentcode" name="Paymentcode" type="text" class="form-control form-control-sm">
				<br>
				 
				Doctor ID:
				<input id="DocID" name="DocID" type="text" class="form-control form-control-sm">
				<br>
				
				Doctor Name :
				<input id="DocName" name="DocName" type="text" class="form-control form-control-sm">
				<br>
				 
				Payment Type:
				<input id="PaymentType" name="PaymentType" type="text" class="form-control form-control-sm">
				<br>
				
				Amount :
				<input id="Amount" name="Amount" type="text" class="form-control form-control-sm">
				<br>
				
				Date Of Payed :
				<input id="DateOfPayed" name="DateOfPayed" type="text"  class="form-control form-control-sm">
				<br>
				
				<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
				<input type="hidden" id="hidPaymentIDSave" name="hidPaymentIDSave" value="">
			</form>
			
			<div id="alertSuccess" class="alert alert-success"></div>
			<div id="alertError" class="alert alert-danger"></div>
			<br>

			<div id="divdocpaymentGrid">
				<%
				docpayment docpaymentObj = new docpayment();
					out.print(docpaymentObj.readdocpayment());
				%>
			</div>
		</div>
	</div>
</div>
</body>
</html>