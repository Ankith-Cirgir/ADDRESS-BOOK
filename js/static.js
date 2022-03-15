function CreateStaticAccounts(){
    CreateNewCard(CreateUser(count,"Ankith","Cirgir","IT",".NET Development Lead","India","","ankith.c@Technovert.com","7386991912","121212"));
    CreateNewCard(CreateUser(count,"Arjun","", "Sales", "SharePoint Practice Head", "India", "", "Arjun@Technovert.com", "","2323223"));
    CreateNewCard(CreateUser(count,"Akash","","HR","Recruiting Expert", "Seattle","","Akash@Technovert.com","","34343434"));
    CreateNewCard(CreateUser(count,"Arun","","MD","Business Analyst", "India","","Arun@Technovert.com","","2131231"));
}

function AddAlphabets() { 
    var alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    alphabets.forEach(function(value, index) {
        jQuery('<a>', {
            href: '#',
            text: value,
        }).appendTo('.search-alphabetic').attr('onclick',"AlphabeticSearch(\'"+  value.toLowerCase() +"\')");
    });
}