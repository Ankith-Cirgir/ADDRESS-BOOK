function CreateNewCard(user){ 
    var name = user.firstName + " " + user.lastName;
    var designation = user.designation;
    var department = user.department;

    $('<div>', { class: 'card', id: count}).appendTo('.result-container');

    $('<img>').attr('src', "avatar.jpg").attr('class', "profile-picture").appendTo('#'+count);

    $('<div>', { id: count+'-content', class: 'content'}).appendTo('#'+count);

    $('<p></p>').attr('class', 'name').text(name).appendTo("#"+count+"-content");

    $('<p></p>').attr('class', 'department').text(department).appendTo("#"+count+"-content");

    $('<p></p>').attr('class', 'designation').text(designation).appendTo("#"+count+"-content");

    $('<div>', { id: count+'-contact', class: 'contact'}).appendTo( "#"+count+'-content');

    $('<img>').attr('src', "call-grey.png").attr('class', "icons").appendTo('#'+count+'-contact');

    $('<img>').attr('src', "email-grey.png").attr('class', "icons").appendTo('#'+count+'-contact');

    $('<img>').attr('src', "comment-grey.png").attr('class', "icons").appendTo('#'+count+'-contact');

    $('<img>').attr('src', "star-grey.png").attr('class', "icons").appendTo('#'+count+'-contact');

    $('<img>').attr('src', "like-grey.png").attr('class', "icons").appendTo('#'+count+'-contact');

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
}

function Search(filterType) {
    var keyword = $("#search").val();
    for(var i=0 ; i<users.length ; i++){
        if(users[i][filterType].toLowerCase().includes(keyword.toLowerCase())){
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

function IncreaseEmployeeCount(context) { //leftmenuitem
    $(context).find('p').text(parseInt($(context).find('p').text(),10) + 1);
}

function ResetCount() { 
    $("li a").each(function(){
        $(this).find('p').text("0");
    });
}

function CreateNewFilter(location, type) { 
    var list = $('<li>', {}).appendTo(location);

    $('<a></a>').attr('name', type).attr('href',"#").html(type + " (<p>1</p>)").appendTo(list);

    $("li a").on('click', function () {
        $("#search").val(this.name);
        $("#filter").val($(this).parent().parent().attr("name")).change();
        PressEnter(); 
    });

}

function UpdateEmployeeCount(){ 
    ResetCount();
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
    $(".table input").val("");
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