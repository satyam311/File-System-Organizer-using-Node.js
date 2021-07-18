function helpFn(){
    console.log(`
        this is list of thing we can do->
            *node main.js tree "directoryPath"
            *node main.js organise "directoryPath"
            *node main.js help 
        
    `);
    
}

module.exports = {
    helpKey : helpFn

}