<%@page import="com.docpayment"%>
<%
// page language="java" contentType="text/html; charset=ISO-8859-1"
// pageEncoding="ISO-8859-1"


%>


<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title> Doctor Payment  Management </title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/items.js"></script>
</head>
<body>

<div class="container">
<div class="row">
<div class="col-6">
<h1>Doctor Payment Management </h1>
<form id="formdocpayment" name="formdocpayment">
 Paymentcode:
 <input id="Paymentcode" name="Paymentcode" type="text"
 class="form-control form-control-sm">
 <br> DocID:
 <input id="DocID" name="DocID" type="text"
 class="form-control form-control-sm">
 <br> DocName:
 <input id="DocName" name="DocName" type="text"
 class="form-control form-control-sm">
 <br> PaymentType:
 <input id="PaymentType" name="PaymentType" type="text"
 class="form-control form-control-sm">
 <br>
 <br> Amount:
 <input id="Amount" name="Amount" type="text"
 class="form-control form-control-sm">
 <br>
 <br> DateOfPayed:
 <input id="DateOfPayed" name="DateOfPayed" type="text"
 class="form-control form-control-sm">
 <br>
 <input id="btnSave" name="btnSave" type="button" value="Save"
 class="btn btn-primary">
 <input type="hidden" id="hidPaymentIDSave"
 name="hidPaymentIDSave" value="">
</form>
<div id="alertSuccess" class="alert alert-success"></div>
<div id="alertError" class="alert alert-danger"></div>
<br>
<div id="divdocpaymentsGrid">
 <%
 docpayment itemObj = new docpayment();
 out.print(itemObj.readdocpayment());
 %>
</div>

</div>
 </div>
</div>
 

</body>
</html>