function organizeFn(dirPath){
    let destPath;
    // console.log("Organize command implemented for", dirPath);

    // 1.Input -> Directory path given
    if(dirPath == undefined){
        // console.log("Kindly enter the path");
        destPath = process.cwd();
        return ;

    }else {
        let doesExist= fs.existsSync(dirPath);
        if(doesExist){
            // 2. create -> Organised file directory
            // we join the path to dirpath using join module
             destPath = path.join(dirPath, "organized_files");  // this code only join the new file to the given path 
             if(fs.existsSync(destPath) == false){
                    fs.mkdirSync(destPath); // this will create the folder int the destination path
             }
            

        }else {
            console.log("Kindly enter the correct path");
            return ;
            
        }
    }

    organizeHelper(dirPath, destPath);
    
}

function organizeHelper(source , destination){
    let childNames = fs.readdirSync(source); // this will read the directory 
    // console.log(childNames);

    for(let i = 0 ; i < childNames.length ; i++){
        let childAddress = path.join(source, childNames[i]);
        let isfile = fs.lstatSync(childAddress).isFile();
        if(isfile){
            let category = getCategory(childNames[i]);
            // console.log(childNames[i] ," is belongs to --> ", category);
            // we are copy the file from source to destination
            sendFiles(childAddress, destination , category );
            
        }   
    }

}

function getCategory(names){
    let ext  = path.extname(names);
    ext = ext.slice(1);
    for(let type in types ){
        let ctarray = types[type];
        for(let i = 0  ; i < ctarray.length;i++){
            if(ext == ctarray[i]){
                return type;

            }

        }
    }
    return "other hain";


}
function sendFiles(srcFilePath, destination , category ){
    // will  make the path and check if it false then make the file
    let categoryPath = path.join(destination, category);
    if(fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);

    }
    let fileName = path.basename(srcFilePath);
    let destfilePath  = path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath, destfilePath);
    fs.unlinkSync(srcFilePath);
     

    console.log(fileName, "copied to" , category);

}


module.exports = { 
    organizeKey : organizeFn
}