var emi;
function calculate_emi(){
	var p = document.getElementById("amt").valueAsNumber;
	var R = document.getElementById("roi").valueAsNumber;
	var t = document.getElementById("tenure").valueAsNumber;
	
	if( isNaN(p) || isNaN(R) || isNaN(t)){
		alert("Please fill all the fields...");
	} else {
		var r = R/(12*100);
		var n = t*12;
		emi = p*r*(Math.pow(1+r, n)/(Math.pow(1+r, n)-1));
		
		var totalAmt = emi*n;
		var totalInt = totalAmt-p;
		var effRateAnnum = (totalInt*100)/(t*p);
		var effRateMonth = effRateAnnum/12;
		
		document.getElementById("emi").innerHTML = "&#8377; " + emi.toFixed(2);
		document.getElementById("tot_amt").innerHTML = "&#8377; " + totalAmt.toFixed(2);
		document.getElementById("tot_int").innerHTML = "&#8377; " + totalInt.toFixed(2);
		document.getElementById("eff_rate_pa").innerHTML = "&#8377; " + effRateAnnum.toFixed(2);
		document.getElementById("eff_rate_pm").innerHTML = "&#8377; " + effRateMonth.toFixed(2);
		document.getElementById("res").style.display = "block";
	}
}

function get_Amortization(){
	var princ = document.getElementById("amt").valueAsNumber;
	var tenure = document.getElementById("tenure").valueAsNumber;
	var roi_pa = document.getElementById("roi").valueAsNumber;
	
	var intrest, principal, outstanding;
	var condition = tenure*12;
	var time = 1;
	var roi_pm = roi_pa/12;
	var details = [];
	
	for(j=0;j<condition;j++){
		var temp = {"sl_no": "","interest": "","principal": "","outstanding": ""};
		
		interest = ((princ * time * roi_pm)/100);
		principal = (emi - interest);
		outstanding = (princ - principal);
		
		temp["sl_no"] = 1+j;
		temp.interest = interest.toFixed(2);
		temp.principal = principal.toFixed(2);
		temp.outstanding = outstanding.toFixed(2);
		
		princ = outstanding;
		details.push(temp) 
	}
	
	t = "<table border=1px cellpadding='0' cellspacing='0'>"+"<tr><th>Sl.no.</th><th>Interest</th><th>Principal</th><th>Outstanding</th></tr>";
	for(i=0;i<details.length;i++){
		t = t+"<tr><td>"+details[i].sl_no+"</td><td style='text-align:right;'>"+ "&#8377; " + details[i].interest+"</td><td style='text-align:right;'>"+ "&#8377; " + details[i].principal+"</td><td style='text-align:right;'>"+ "&#8377; " + Math.abs(details[i].outstanding).toFixed(2)+"</td></tr>";
	}
	t = t+"</table>";

	document.getElementById("amortize").innerHTML = t;
}
