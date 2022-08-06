const simpleGit = require("simple-git");
const git = simpleGit.default();
const fs = require('fs');
const e = require("cors");
const { setTimeout } = require("timers/promises");

const addRemoteRepository = async () => {
    // await git.checkout("testCheckout");
    // const branch = await git.branch();
    // console.log(branch.current)
    // try{
    //     await git.addRemote('sauces', "https://github.com/sondrebjarkum/sondrebjarkum.github.io")
        
    // }catch{
    //     console.log("Remote already exists!")
    // }
    // const remote = await git.listRemote()
    // console.log(remote)
}
const pushToBranch = async () => {
    console.log("pushToBranch")
    
    try{
        console.log("commiting")
        // git.commit("Update sauces", "sauces").push('origin', 'testing');
        git.add(["./data/sauces.json"])
            .commit("Update sauces")
            .push(['-u', 'origin', 'testing'], () => console.log('push done'));
    }catch(e){
        console.log(e)
    }
    console.log("Git done")

}
const writeFile = async () => {
    console.log("Getting sauces file...")

    var result = JSON.parse(fs.readFileSync('./data/sauces.json', 'utf8'))
    const testObject = {
        brand: 'Sondresaus',
        name: 'Blåbær',
        strength: '7',
        price: '169',
        descr: 'Sterk-- saus som smaker mye av blåbær. Morsom på pannekaker, fin i gryter og sauser.',
        imageurl: 'ssblåbær.jpg',
        tags: [ 'blåbær' ],
        chilis: [ 'Ghost' ]
    }
    result.push(testObject)
    
    const filter = result.filter( (e) => e.name === "Blåbær")
    // console.log(filter)

    console.log("Writing to file...")

    fs.writeFile("./data/sauces.json", JSON.stringify(result), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            pushToBranch()
        }
    })
}

exports.createSauce = async (req, res, next) => {
    console.log("Create sauce controller fired...")

    writeFile()
    pushToBranch()

    

    await res.status(200).json({
        type: "success",
        message: "Post created successfully",
        data: {
        // post,
        },
    });

    
    
}