package com;

//import java.beans.Statement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;

public class docpayment {

	
	private Connection connect()
	 {
	 Connection con = null;
	 try
	 {
	 Class.forName("com.mysql.jdbc.Driver");
	 con =
	 DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/test", "root", "");
	 }
	 catch (Exception e)
	 {
	 e.printStackTrace();
	 }
	 return con;
	 }
	
	public String readdocpayment()
	 {
	 String output = "";
	 try
	 {
	 Connection con = connect();
	 if (con == null)
	 {
	 return "Error while connecting to the database for reading.";
	 }
	// Prepare the html table to be displayed
	 output =  "<table border=\"1\"><tr><th>Paymentcode</th><th>DocID</th><th>DocName</th><th>PaymentType</th><th>Amount</th><th>DateOfPayed</th>"; 
	String query = "select * from docpayment";
	java.sql.Statement stmt = con.createStatement();
	ResultSet rs = stmt.executeQuery(query);

	 // iterate through the rows in the result set
	 while (rs.next())
	 { 
		String PaymentID = Integer.toString(rs.getInt("PaymentID"));
		String Paymentcode = rs.getString("Paymentcode");
		String DocID = rs.getString("DocID");
		String DocName = rs.getString("DocName");
		String PaymentType = rs.getString("PaymentType");
		String Amount = Float.toString(rs.getFloat("Amount"));
		String DateOfPayed = rs.getString("DateOfPayed");

	 // Add into the html table
	    output += "<tr><td><input id='hidPaymentIDUpdate'name='PaymentIDUpdate'type='hidden' value='" + PaymentID + "'>" + Paymentcode + "</td>";
	    output += "<tr><td>" + Paymentcode + "</td>";
		output += "<td>" + DocID + "</td>";
		output += "<td>" + DocName + "</td>";
		output += "<td>" + PaymentType + "</td>";
		output += "<td>" + Amount + "</td>";
		output += "<td>" + DateOfPayed + "</td>";

	 // buttons
	output += "<td><input name='btnUpdate'type='button' value='Update'class='btnUpdate btn btn-secondary'></td>"
	 + "<td><input name='btnRemove'type='button' value='Remove'class='btnRemove btn btn-danger'data-paymentid='"+ PaymentID + "'>" + "</td></tr>";
	 }
	 con.close();
	 // Complete the html table
	 output += "</table>";
	 }
	 catch (Exception e)
	 {
	 output = "Error while reading the docpayment.";
	 System.err.println(e.getMessage());
	 }
	 return output;
	 } 
	
	public String insertdocpayment(String PaymentID,String Paymentcode, String DocID, String DocName, String PaymentType, String Amount, String DateOfPayed)
			 {
			 String output = "";
			 try
			 {
			 Connection con = connect();
			 if (con == null)
			 {
			 return "Error while connecting to the database for inserting.";
			 }
			 // create a prepared statement
			 String query = " insert into docpayment(PaymentID,Paymentcode,DocID,DocName,PaymentType,Amount,DateOfPayed)"
						+ " values (?, ?, ?, ?, ? ,? ,?)";

			 PreparedStatement preparedStmt = con.prepareStatement(query);
			 // binding values
			    preparedStmt.setInt(1, 0);
				preparedStmt.setString(2, Paymentcode);
				preparedStmt.setString(3, DocID);
				preparedStmt.setString(4, DocName);
				preparedStmt.setString(5, PaymentType);
				preparedStmt.setDouble(6, Float.parseFloat(Amount));
				preparedStmt.setString(7, DateOfPayed);

			 // execute the statement
			 preparedStmt.execute();
			 con.close();
			 String newdocpayment = readdocpayment();
			 output = "{\"status\":\"success\", \"data\": \"" + newdocpayment + "\"}";
			 }
			 catch (Exception e)
			 {
			 output = "{\"status\":\"error\", \"data\":\"Error while inserting the docpayment.\"}";
			 System.err.println(e.getMessage());
			 }
			 return output;
			 } 
	
	
	public String updatedocpayment(String PaymentID,String Paymentcode, String DocID, String DocName, String PaymentType, String Amount, String DateOfPayed)
			 {
			 String output = "";
			 try
			 {
			 Connection con = connect();
			 if (con == null)
			 {
			 return "Error while connecting to the database for updating.";
			 }
			 // create a prepared statement
			 String query = "UPDATE docpayment SET Paymentcode=?,DocID=?,DocName=?,PaymentType=?,Amount=?,DateOfPayed=? WHERE PaymentID=?";
			 PreparedStatement preparedStmt = con.prepareStatement(query);
			 // binding values
			    preparedStmt.setString(1, Paymentcode);
				preparedStmt.setString(2, DocID);
				preparedStmt.setString(3, DocName);
				preparedStmt.setString(4, PaymentType);
				preparedStmt.setFloat(5, Float.parseFloat(Amount));
				preparedStmt.setString(6, DateOfPayed);
				preparedStmt.setInt(7,Integer.parseInt(PaymentID));

			 // execute the statement
			 preparedStmt.execute();
			 con.close();
			 String newdocpayment = readdocpayment();
			 output = "{\"status\":\"success\", \"data\": \"" + newdocpayment + "\"}";
			 }
			 catch (Exception e)
			 {
			 output = "{\"status\":\"error\", \"data\": \"Error while updating the docpayment.\"}";
			 System.err.println(e.getMessage());
			 }
			 return output;
			 } 
	
	
	
	public String deletedocpayment(String PaymentID)
	 {
	 String output = "";
	 try
	 {
	 Connection con = connect();
	 if (con == null)
	 {
	 return "Error while connecting to the database for deleting.";
	 } 
	
	 // create a prepared statement
	 String query = "delete from docpayment where PaymentID=?";
	 PreparedStatement preparedStmt = con.prepareStatement(query);
	 // binding values
	 preparedStmt.setInt(1, Integer.parseInt(PaymentID));
	 // execute the statement
	 preparedStmt.execute();
	 con.close();
	 String newdocpayment = readdocpayment();
	 output = "{\"status\":\"success\", \"data\": \"" + newdocpayment + "\"}";
	 }
	 catch (Exception e)
	 {
	 output = "{\"status\":\"error\", \"data\":\"Error while deleting the docpayment.\"}";
	 System.err.println(e.getMessage());
	 }
	 return output;
	 } 
	
	
}
