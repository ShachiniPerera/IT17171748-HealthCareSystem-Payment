$(document).ready(function()
		{
	         $("#alertSuccess").hide();
	         $("#alertError").hide();
	});


//SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
// Clear alerts---------------------
 $("#alertSuccess").text("");
 $("#alertSuccess").hide();
 $("#alertError").text("");
 $("#alertError").hide(); 
 

// Form validation-------------------
var status = validatedocpaymentForm();

if (status != true)
     {
      $("#alertError").text(status);
      $("#alertError").show();
      
 return;
 }


// If valid-------------------------
var type = ($("#hidPaymentIDSave").val() == "") ? "POST" : "PUT" ;

$.ajax( 
		{
			url : "docpaymentAPI",
			type : type,
			data : $("#formdocpayment").serialize(),
			dataType : "text",
			complete : function(response, status)
			{
				ondocpaymentSaveComplete(response.responseText, status);
			}
		});

});


function ondocpaymentSaveComplete(response, status)
{
   if (status == "success")
        {
         var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success")
     {
       $("#alertSuccess").text("Successfully saved.");
       $("#alertSuccess").show();
       $("#divdocpaymentGrid").html(resultSet.data);
 } 
 else if (resultSet.status.trim() == "error")
	 
        {
          $("#alertError").text(resultSet.data);
          $("#alertError").show();
 }
 } 
   else if (status == "error")
        {
             $("#alertError").text("Error while saving.");
             $("#alertError").show();
 }
   else
     {
       $("#alertError").text("Unknown error while saving..");
       $("#alertError").show();
 }
       $("#hidPaymentIDSave").val("");
       $("#formdocpayment")[0].reset();
}

//UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
 $("#hidPaymentIDSave").val($(this).closest("tr").find('#hidPaymentIDUpdate').val());
 $("#Paymentcode").val($(this).closest("tr").find('td:eq(0)').text());
 $("#DocID").val($(this).closest("tr").find('td:eq(1)').text());
 $("#DocName").val($(this).closest("tr").find('td:eq(2)').text());
 $("#PaymentType").val($(this).closest("tr").find('td:eq(3)').text());
 $("#Amount").val($(this).closest("tr").find('td:eq(4)').text());
 $("#DateOfPayed").val($(this).closest("tr").find('td:eq(5)').text());
});


// REMOVE ===============
$(document).on("click", ".btnRemove", function(event)
		{
		 $.ajax(
		 {
		 url : "docpaymentAPI",
		 type : "DELETE",
		 data : "PaymentID=" + $(this).data("PaymentID"),
		 dataType : "text",
		 complete : function(response, status)
		 {
		 ondocpaymentDeleteComplete(response.responseText, status);
		 }
		 });
});


function ondocpaymentDeleteComplete(response, status)
{
if (status == "success")
 {
 var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success")
 {
 $("#alertSuccess").text("Successfully deleted.");
 $("#alertSuccess").show();
 $("#divdocpaymentGrid").html(resultSet.data);
 } else if (resultSet.status.trim() == "error")
 {
 $("#alertError").text(resultSet.data);
 $("#alertError").show();
 }
 } else if (status == "error")
 {
 $("#alertError").text("Error while deleting.");
 $("#alertError").show();
 } else
 {
 $("#alertError").text("Unknown error while deleting..");
 $("#alertError").show();
 }
}
