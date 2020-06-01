function printerrorform(nameinput,error){
    parentnode=document.getElementsByName(nameinput)[0].parentNode.classList;
    parentnodevalue=document.getElementsByName(nameinput)[0].parentNode.classList.value;
    ///sucess
    if(error=="has-success"){ 
    if(parentnodevalue=="form-group"){
        parentnode.toggle("has-success")
    }else if(parentnodevalue=="form-group has-warning"){
        parentnode.replace("has-warning", "has-success");
    }else if(parentnodevalue=="form-group has-error"){
        parentnode.replace("has-error", "has-success");
    }else if(parentnodevalue=="iti iti--allow-dropdown"){
        parentnode.toggle("has-success");
    }else if(parentnodevalue=="iti iti--allow-dropdown has-warning"){
        parentnode.replace("has-warning", "has-success");
    }else if(parentnodevalue=="iti iti--allow-dropdown has-error"){
        parentnode.replace("has-error", "has-success");
    }
    }
    ///warning 
    if(error=="has-warning"){ 
        if(parentnodevalue=="form-group"){
            parentnode.toggle("has-warning")
        }else if(parentnodevalue=="form-group has-success"){
            parentnode.replace("has-success", "has-warning");
        }else if(parentnodevalue=="form-group has-error"){
            parentnode.replace("has-error", "has-warning");
        }else if(parentnodevalue=="iti iti--allow-dropdown"){
            parentnode.toggle("has-warning");
        }else if(parentnodevalue=="iti iti--allow-dropdown has-success"){
            parentnode.replace("has-success", "has-warning");
        }else if(parentnodevalue=="iti iti--allow-dropdown has-error"){
            parentnode.replace("has-error", "has-warning");
        }
    }
    ///danger
    if(error=="has-error"){ 
        if(parentnodevalue=="form-group"){
            parentnode.toggle("has-error")
        }else if(parentnodevalue=="form-group has-success"){
            parentnode.replace("has-success", "has-error");
        }else if(parentnodevalue=="form-group has-warning"){
            parentnode.replace("has-warning", "has-error");
        }else if(parentnodevalue=="iti iti--allow-dropdown"){
            parentnode.toggle("has-error");
        }else if(parentnodevalue=="iti iti--allow-dropdown has-success"){
            parentnode.replace("has-success", "has-error");
        }else if(parentnodevalue=="iti iti--allow-dropdown has-warning"){
            parentnode.replace("has-warning", "has-error");
        } 
    }
}