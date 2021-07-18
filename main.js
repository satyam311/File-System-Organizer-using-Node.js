#!/usr/bin/env node
let inputArr = process.argv.slice(2); 


let fs = require("fs");
let path = require("path");
let helpobj = require("./commands/help");
let treeobj = require("./commands/tree");
let organizeobj = require("./commands/organize");
const { organizeKey } = require("./commands/organize");

let types = {
    media : ["mp4" , "mkv", "jpg" ,"png", "webm"] , 
    archives : ['zip' , '7z' , 'rar' ,'tar', 'gz' , 'ar' , 'iso' , 'xz' ] , 
    documents : ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt' , 'ods' ,'odp' , 'odg' , 'odf','txt', 'ps','tex'] ,
    app : ['exe' , 'dmg', 'pkg','deb'] 
}


// console.log("You are the best");

// we have to implement- on terminal 
// node main.js tree "directoryPath"
// node main.js organise "directoryPath"
// node main.js help 


let command = inputArr[0];
switch(command) {
    case "tree": 
        treeobj.treeKey(inputArr[1]);
        break;
    case "organize":
        organizeobj.organizeKey(inputArr[1]);
        break;
    case "help":
        helpobj.helpKey();
        break;
    default : 
        console.log("Please give the right input😁");
        break;
         
}

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

// help is implemented 


