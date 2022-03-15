function UpdateEmployeeCount(){ 
    var IT_Department = 0;
    var HR_Department = 0;
    var MD_Department = 0;
    var Sales_Department = 0;

    var sharePoint_Practice_Head = 0;
    var dotNET_Development_Lead = 0;
    var recruiting_Expert = 0;
    var BI_Developer = 0;
    var business_Analyst = 0;

    var indian_Office_Count = 0;
    var seattle_Office_Count = 0;

    for(var i=0 ; i<users.length ; i++){
        switch(users[i].department.toLowerCase()){
            case "it department":
                IT_Department += 1;
                break;
            case "hr department":
                HR_Department += 1;
                break;
            case "md department":
                MD_Department += 1;
                break;
            case "sales department":
                Sales_Department += 1;
                break;
        }
    }

    for(var i=0 ; i<users.length ; i++){
        switch(users[i].designation.toLowerCase()){
            case "sharepoint practice head":
                sharePoint_Practice_Head += 1;
                break;
            case ".net development lead":
                dotNET_Development_Lead += 1;
                break;
            case "recruiting expert":
                recruiting_Expert += 1;
                break;
            case "bi developer":
                BI_Developer += 1;
                break;
            case "business analyst":
                business_Analyst += 1;
                break;
        }
    }

    for(var i=0 ; i<users.length ; i++){
        switch(users[i].office.toLowerCase()){
            case "india":
                indian_Office_Count += 1;
                break;
            case "seattle":
                seattle_Office_Count += 1;
                break;
        }
    };

    

    $("#IT-Department").text("IT ("+IT_Department+")");
    $("#HR-Department").text("HR ("+HR_Department+")");
    $("#MD-Department").text("MD ("+MD_Department+")");
    $("#Sales-Department").text("Sales ("+Sales_Department+")");

    $("#SharePoint-Practice-Head").text("SharePoint Practice Head ("+sharePoint_Practice_Head+")");
    $("#dotNET-Development-Lead").text(".NET Development Lead ("+dotNET_Development_Lead+")");
    $("#Recruiting-Expert").text("Recruiting-Expert ("+recruiting_Expert+")");
    $("#BI-Developer").text("BI Developer ("+BI_Developer+")");
    $("#Business-Analyst").text("Business Analyst ("+business_Analyst+")");

    $("#India-Office").text("India ("+indian_Office_Count+")");
    $("#Seattle-Office").text("Seattle ("+seattle_Office_Count+")");

    /*
    $("li a").each(function () { 
        $(this).text();
    });    
    */
}