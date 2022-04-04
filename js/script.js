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

    // removed on click listner and added it to on document ready
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

function ValidateForm(){
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
}

function ValidateEmail(emailToTest){
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(emailToTest);
}

function ValidatePhoneNumber(inputText){
    var re = /^\d{10}$/;
    return re.test(inputText);
}

function HasNumber(inputText) { 
    var re = /^[A-Za-z]+$/;
    return !re.test(inputText);
}

function FilterAll(keyword){
    $(".card").hide();
    for(var i=0;i<users.length;i++){
        Object.keys(users[i]).forEach(element => {
            if(String(users[i][element]).includes(keyword)){
                $("#"+i).show();
            }
        });
    }
}

function Search(filterType) {
    var keyword = $("#search").val();

    if(filterType == 'all'){
        FilterAll(keyword);
        return;
    }

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

function IncreaseEmployeeCount(leftMenuItem) {
    $(leftMenuItem).find('p').text(parseInt($(leftMenuItem).find('p').text(),10) + 1);
}

function ResetCount() { 
    $("li a").each(function(){
        $(this).find('p').text("0");
    });
}

function CreateNewFilter(location, type) { 
    var list = $('<li>', {}).appendTo(location);

    $('<a></a>').attr('name', type).attr('class','left-pannel').attr('href',"#").html(type + " (<p>1</p>)").appendTo(list);


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
    Search("all");
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

    $(".access-column").on('click','a',function () {
        $("#search").val(this.name);
        $("#filter").val($(this).parent().parent().attr("name")).change();
        PressEnter(); 
    });

    $("#clear").click(function(){
        $("#search").val("");
    });

    $("#add-employee").click(function(){
        var modal = document.getElementById("modal");
        ResetInputs();
        $("#btn-submit").text("Save");

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
        
        $("#btn-submit").unbind("click").click(function(e) { //btn-submit id
            e.preventDefault();

            /*
            $("#modal-form").validate({
                rules: {
                    firstname: {
                        required : true,
                        minlength : 3
                    },
                    email : {
                        required: true,
                        email: true
                    },
                    phonenumber : {
                        depends : function() { 
                            return ValidatePhoneNumber($("#phone-number").val());
                        }
                    }
                },
                messages : {
                    name: {
                        minlength: "Name should be at least 3 characters"
                    }
                },

                submitHandler: function() {
                    var user = CreateUser(count, $("#firstname").val(), $("#lastname").val(), $("#department").val(), $("#job-title").val(), $("#office").val(), $("#preffered-name").val(), $("#email").val(), $("#phone-number").val(), $("#skype-ID").val());
                    CreateNewCard(user);
                    $(".close").click();
                    UpdateEmployeeCount();
                    //form.submit();
                }
            }); */
            ValidateForm();
            
        });

    });

    $(".result-container").on('click', ".card", function () { 
        var modal = document.getElementById("modal");
        $(".model-heading").text("Employee Details");
        $("#btn-submit").text("Update");
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

        $("#btn-submit").unbind("click").on('click', function(){
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
            var filterType = $("#filter").val()
            $(".card").hide();

            Search(filterType);
        }
    });
});