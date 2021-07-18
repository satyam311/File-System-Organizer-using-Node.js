
let fs = require("fs");
let path = require("path");

function treeFn(dirPath){
    // console.log("Tree command implemented for", dirPath);
    if(dirPath == undefined){
        // console.log("Oops! you entered wrong Directory Path");
        
        treeHelper(process.cwd(), "");
        return ;

    }else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){
            // to apna kaam karunga - Tree ka helper karunga majese 
            treeHelper(dirPath, "");

        }else{
            console.log("Pllase❤  write the correct path");
            return;

        }

    }


}


function treeHelper(dirPath, indent){
    // we check if the dirpath is file or folder 
    // if it is a file -we print that 
    // if it is a folder - we makeit a node and try to read the file in it 
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile == true){
        let fileName = path.basename(dirPath);
        console.log(indent+"|-----" + fileName);

    }else{
        let dirName = path.basename(dirPath);
        console.log(indent + "|_____" +dirName );
        let children = fs.readdirSync(dirPath);
        for(let i = 0 ; i < children.length;i++){
            let childPath = path.join(dirPath, children[i]);
            treeHelper(childPath, indent + "\t");
        }

    }

}

module.exports = {
    treeKey : treeFn
}