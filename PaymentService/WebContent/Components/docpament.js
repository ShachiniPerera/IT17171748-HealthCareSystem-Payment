$(document).ready(function()
{
	if ($("#alertSuccess").text().trim() == "")
	{
		$("#alertSuccess").hide();
	}
	
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
	
	// If valid------------------------
	var method = ($("hidPaymentIDSave").val() == "") ? "POST" : "PUT";
	
	$.ajax(
	{
		url : "docpaymentAPI",
		type : method,
		data : $("#formdocpayment").serialize(),
		dataType : "text",
		complete : function(response, status)
		{
			ondocpaymentSaveComplete(response.responseText, status);
		}
	});
});

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

$(document).on("click", ".btnRemove", function(event)
{
	$.ajax(
	{
		url : "docpaymentAPI",
		type : "DELETE",
		data : "PaymentID=" + $(this).data("paymentid"),
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
		} 
		else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} 
	else if (status == "error")
	{
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} 
	else
	{
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}


function validatedocpaymentForm()
{
	// Paymentcode
	if ($("#Paymentcode").val().trim() == "")
	{
		return "Insert Paymentcode.";
	}
	
	// DocID
	if ($("#DocID").val().trim() == "")
	{
		return "Insert DocID";
	}
	// Doctor name
	if ($("#DocName").val().trim() == "")
	{
	return "Insert DocName.";
	}
	// Payment Type-----
	if ($("#PaymentType").val().trim() == "")
	{
	return "Insert PaymentType.";
	}
	
	// Amount-------------------------------
	if ($("#Amount").val().trim() == "")
	 {
	 return "Insert Payment Amount.";
	 }
	// is numerical value
	var Amount = $("#Amount").val().trim();
	if (!$.isNumeric(Amount))
	 {
	 return "Insert a numerical value for Payment Amount.";
	 }
	// convert to decimal Amount
	 $("#Amount").val(parseFloat(Amount).toFixed(2));
	 
	
	// DateOfPayed------------------------
	if ($("#DateOfPayed").val().trim() == "")
	{
		return "Insert DateOfPayed.";
	}
	
	return true;
}