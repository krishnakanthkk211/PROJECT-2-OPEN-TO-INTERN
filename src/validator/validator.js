const isValidname =function(name){
    return /^[a-zA-Z]+([_-]?[a-zA-Z])*$/.test(name)
    
    
    }
    const isValidfullName =function(fullName){
        return /^[a-zA-z]+$/;
    }
    const isValidemail = function (email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
    
    const isValidmobile = function (mobile) {
        return /^([+]\d{2})?\d{10}$/.test(mobile);
    }
    const isValidLogoLink = function(logoLink){
        return /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(logoLink)
    }
    module.exports.isValidLogoLink=isValidLogoLink
    module.exports.isValidname=isValidname
    module.exports.isValidemail=isValidemail
    module.exports.isValidmobile=isValidmobile
    module.exports.isValidfullName=isValidfullName