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
    if(HasNumber($("#details-firstname").val() || HasNumber($("#details-lastname").val()))){
        alert("Enter a valid Name");
        return;
    }
    users[index].department = $("#details-department").val();
    users[index].designation = $("#details-job-title").val();
    users[index].office = $("#details-office").val();
    users[index].firstName = $("#details-firstname").val();
    users[index].lastName = $("#details-lastname").val();
    users[index].prefferedName = $("#details-preffered-name").val();
    users[index].email = $("#details-email").val();
    users[index].phone = $("#details-phone-number").val();
    users[index].skypeID = $("#details-skype-ID").val();

    UpdateEmployeeCount();
    UpdateCard(index);
}

function UpdateCard(index){ 
    $("#"+index).find(".department").text(users[index].department);
    $("#"+index).find(".designation").text(users[index].designation);
    $("#"+index).find(".name").text(users[index].firstName + " " + users[index].lastName);
}

function EmployeeDetails(user){ 
    $("#details-firstname").val(user.firstName);
    $("#details-lastname").val(user.lastName);
    $("#details-preffered-name").val(user.prefferedName);
    $("#details-email").val(user.email);
    $("#details-job-title").val(user.designation);
    $("#details-office").val(user.office);
    $("#details-department").val(user.department);
    $("#details-phone-number").val(user.phone);
    $("#details-skype-ID").val(user.skypeID);
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
    //$(".error").style.display = "none";
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

    $("#modal-form").validate({
        rules: {
            firstname: "required",
            lastname : "required",
            email : {
                required: true,
                email : true,
            },
            phonenumber : {
                minlength: 10,
                maxlength: 10,
                number: true,
                required : true,
            }
        },
        messages : {
            firstname: "Please enter your firstname",
            lastname: "Please enter your lastname",
            email : {
                required: "Email is manditory",
            },
            phonenumber : {
                number: "Please enter number only"
            },
        },

    });

    $("#modal-form").submit(function(e){
        e.preventDefault();
        if($("#modal-form").valid()){
            var user = CreateUser(count, $("#firstname").val(), $("#lastname").val(), $("#department").val(), $("#job-title").val(), $("#office").val(), $("#preffered-name").val(), $("#email").val(), $("#phone-number").val(), $("#skype-ID").val());
            CreateNewCard(user);
            $(".close").click();
            UpdateEmployeeCount();
        }
    })

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
        $("label").hide();
        
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

    });

    $(".result-container").on('click', ".card", function () { 
        var modal = document.getElementById("employee-details-modal");

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

        $("#update-button").unbind("click").on('click', function(){
            UpdateVariables(id);
            modal.style.display = "none";
        })
        $("#employee-details-cancel-button").unbind("click").on('click', function(){
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