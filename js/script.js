function CreateNewCard(user){ 
    var name = user.firstName + " " + user.lastName;
    var designation = user.designation;
    var department = user.department;

    $('<div>', { class: 'card', id: count}).appendTo('.result-container');

    var img = $('<img>');
    img.attr('src', "avatar.jpg");
    img.attr('class', "profile-picture");
    img.appendTo('#'+count);

    $('<div>', { id: count+'-content', class: 'content'}).appendTo('#'+count);

    var person_name = $('<p></p>');
    person_name.attr('class', 'name');
    person_name.text(name);
    person_name.appendTo("#"+count+"-content");

    var person_department = $('<p></p>');
    person_department.attr('class', 'department');
    person_department.text(department);
    person_department.appendTo("#"+count+"-content");

    var person_designation = $('<p></p>');
    person_designation.attr('class', 'designation');
    person_designation.text(designation);
    person_designation.appendTo("#"+count+"-content");

    $('<div>', { id: count+'-contact', class: 'contact'}).appendTo( "#"+count+'-content');

    var img = $('<img>');
    img.attr('src', "call-grey.png");
    img.attr('class', "icons");
    img.appendTo('#'+count+'-contact');

    var img = $('<img>');
    img.attr('src', "email-grey.png");
    img.attr('class', "icons");
    img.appendTo('#'+count+'-contact');

    var img = $('<img>');
    img.attr('src', "comment-grey.png");
    img.attr('class', "icons");
    img.appendTo('#'+count+'-contact');

    var img = $('<img>');
    img.attr('src', "star-grey.png");
    img.attr('class', "icons");
    img.appendTo('#'+count+'-contact');

    var img = $('<img>');
    img.attr('src', "like-grey.png");
    img.attr('class', "icons");
    img.appendTo('#'+count+'-contact');

    $("#"+count).on('click', function(){
        var modal = document.getElementById("modal");
        $(".model-heading").text("Employee Details");
        modal.style.display = "block";

        $(".close").click(function(){
            modal.style.display = "none";
        });

        window.onclick = function(event) {
        if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        EmployeeDetails(user);

        $("#positive-button").click(function(){
            this.text("Update");
            modal.style.display = "none";
        })

        $("#cancel-button").click(function(){
            modal.style.display = "none";
        })
    }); 

    count += 1;
}

function UpdateVariables(index){ 
    if(HasNumber($("#firstname").val() || HasNumber($("#lastname").val()))){
        alert("Enter a valid Name");
        return;
    }
    users[index].department = $("#department").val();
    users[index].designation = $("#job-title").val();
    users[index].office = $("#office").val();
    users[index].firstName = $("#firstname").val();
    users[index].lastName = $("#lastname").val();
    users[index].prefferedName = $("#preffered-name").val();
    users[index].email = $("#email").val();
    users[index].phone = $("#phone-number").val();
    users[index].skypeID = $("#skype-ID").val();

    ResetCount();
    UpdateEmployeeCount();
    UpdateCard(index);
}

function UpdateCard(index){ 
    $("#"+index).find(".department").text(users[index].department);
    $("#"+index).find(".designation").text(users[index].designation);
    $("#"+index).find(".name").text(users[index].firstName + " " + users[index].lastName);
}

function EmployeeDetails(user){ 
    $("#firstname").val(user.firstName);
    $("#lastname").val(user.lastName);
    $("#preffered-name").val(user.prefferedName);
    $("#email").val(user.email);
    $("#job-title").val(user.designation);
    $("#office").val(user.office);
    $("#department").val(user.department);
    $("#phone-number").val(user.phone);
    $("#skype-ID").val(user.skypeID);
}

function ValidateEmail(emailToTest)
{
     var atSymbol = emailToTest.indexOf("@");
     if(atSymbol < 1) return false;
 
     var dot = emailToTest.indexOf(".");
     if(dot <= atSymbol + 2) return false;
 
     if (dot === emailToTest.length - 1) return false;
 
     return true;
}

function ValidatePhoneNumber(inputtxt)
{
    var phoneno = /^\d{10}$/;
    if(phoneno.test(inputtxt)){
        return true;
    }
    return false;
}

function HasNumber(myString) {
    var re = /^[A-Za-z]+$/;
    return !re.test(myString);
    //return /\d+/g.test(myString);
}

function Search(type) { 
    var keyword = $("#search").val();
    for(var i=0 ; i<users.length ; i++){
        if(users[i][type].toLowerCase().includes(keyword.toLowerCase())){
            $("#" + i).show();
        }
    }
}

function AlphabeticSearch(alphabet){ 
    $(".card").hide();

    for(var i=0 ; i<users.length ; i++){
        if(users[i].firstName.charAt(0).toLowerCase() == alphabet){
            $("#" + i).show();
        }
    }
}

function PressEnter() { 
    var e = jQuery.Event("keypress");
    e.which = 13;
    e.keyCode = 13;
    $("#search").trigger(e);   
}

function IncreaseEmployeeCount(context) { 
    $(context).find('p').text(parseInt($(context).find('p').text(),10) + 1);
}

function ResetCount() { 
    $("li a").each(function(){
        $(this).find('p').text("0");
    });
}

function CreateNewFilter(location, type) { 
    var list = $('<li>', {}).appendTo(location);

    var newFilter = $('<a></a>');
    newFilter.attr('name', type);
    newFilter.attr('href',"#");
    newFilter.html(type + " (<p>1</p>)");
    newFilter.appendTo(list);

    $("li a").on('click', function () {
        $("#search").val(this.name);
        $("#filter").val($(this).parent().parent().attr("name")).change();
        PressEnter(); 
    });

}

function UpdateEmployeeCount(){ 
    for(var i=0 ; i<users.length ; i++){
        $("li a").each(function(){
            if($(this).attr("name") == users[i].department || $(this).attr("name") == users[i].designation || $(this).attr("name") == users[i].office){
                IncreaseEmployeeCount(this);
            }
        });
    }
}

function ResetCards(){
    $("#clear").click();
    Search("department");
}

function ResetInputs() { 
    $("#firstname").val("");
    $("#lastname").val("");
    $("#department").val("");
    $("#job-title").val("");
    $("#office").val("");
    $("#preffered-name").val("");
    $("#email").val("");
    $("#phone-number").val("");
    $("#skype-ID").val("");
}

function AppendAttributes(user){

    if(!departments.includes(user.department) && user.department != ""){
        CreateNewFilter($(".department-list"), user.department);
        departments.push(user.department);
    }

    if(!designations.includes(user.designation) && user.designation != ""){
        CreateNewFilter($(".job-title-list"), user.designation);
        designations.push(user.designation);
    }

    if(!offices.includes(user.office) && user.office != ""){
        CreateNewFilter($(".office-list"), user.office);
        offices.push(user.office);
    }
}

function CreateUser(id, firstName, lastName, department, designation, office,prefferedName, email, phone, skypeID){ 
    var user = {id: id,firstName: firstName, lastName: lastName, department: department, designation: designation, office: office, prefferedName: prefferedName, email: email, phone: phone, skypeID: skypeID}
    users.push(user);
    AppendAttributes(user);
    return user;
}

var users = [];

var departments = [];
var designations = [];
var offices = [];

count = 0;


$(document).ready(function(){

    CreateStaticAccounts();

    AddAlphabets();

    ResetCount();
    UpdateEmployeeCount(); 

    $("#clear").click(function(){
        $("#search").val("");
    });

    $("#add-employee").click(function(){
        var modal = document.getElementById("modal");
        ResetInputs();
        $("#positive-button").text("Save");


        modal.style.display = "block";
        
        $(".model-heading").text("Add Employee");

        $(".close").click(function(){
            modal.style.display = "none";
        });

        $("#cancel-button").click(function(){
            modal.style.display = "none";
        });
        
        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            }
        }
        
        $("#positive-button").unbind("click").click(function(e) {
            e.preventDefault();
            if(!HasNumber($("#firstname").val()) || !HasNumber($("#lastname").val())){
                if(ValidateEmail($("#email").val())){
                    if(ValidatePhoneNumber($("#phone-number").val())){
                        var user = CreateUser(count, $("#firstname").val(), $("#lastname").val(), $("#department").val(), $("#job-title").val(), $("#office").val(), $("#preffered-name").val(), $("#email").val(), $("#phone-number").val(), $("#skype-ID").val());
                        ResetInputs();
                        
                    }else{
                        alert("Enter a Valid Phone Number...");
                        return;
                    }
                }else{
                    alert("Enter a valid email");
                    return;
                }
            }else{
                alert("Enter a valid Name...");
                return;
            }

            CreateNewCard(user);
            
            $(".close").click();

            ResetCount();
            UpdateEmployeeCount();
        });

    });

    $(".result-container").on('click', ".card", function () { 
        var modal = document.getElementById("modal");
        $("#positive-button").text("Update");
        modal.style.display = "block";

        $(".close").click(function(){
            modal.style.display = "none";
        });
        
        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            }
        }

        var id = this.id;

        EmployeeDetails(users[id]);

        $("#positive-button").unbind("click").on('click', function(){
            UpdateVariables(id);
            modal.style.display = "none";
        })
        $("#cancel-button").unbind("click").on('click', function(){
            modal.style.display = "none";
        })
    });

    $('#search').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            var input = $("#filter").val()
            $(".card").hide();

            Search(input);
        }
    });
});