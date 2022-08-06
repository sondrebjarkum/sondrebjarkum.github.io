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
const pushToBranch = async (resolve, reject) => {
    console.log("pushToBranch")
    
    try{
        console.log("commiting")
        // git.commit("Update sauces", "sauces").push('origin', 'testing');
        git.add(["./data/sauces.json"])
            .commit("Update sauces")
            .push(['-u', 'origin', 'testing'], () => resolve("Git done...!"));
    }catch(e){
        console.log(e)
        reject(new Error('Something is not right in git!'))
    }
    console.log("Git done")

}
const writeFile = async (obj) => {
    console.log("Getting sauces file...")
    console.log(obj)
    return new Promise( (resolve, reject) => {

    var result = JSON.parse(fs.readFileSync('./data/sauces.json', 'utf8'))
    // const testObject = {
    //     brand: 'Sondresaus',
    //     name: 'Blåbær',
    //     strength: '7',
    //     price: '169',
    //     descr: 'Sterk-- saus som smaker mye av blåbær. Morsom på pannekaker, fin i gryter og sauser.',
    //     imageurl: 'ssblåbær.jpg',
    //     tags: [ 'blåbær' ],
    //     chilis: [ 'Ghost' ]
    // }
    result.push(obj)
    
    const filter = result.filter( (e) => e.name === "Blåbær")
    // console.log(filter)

    console.log("Writing to file...")

    fs.writeFile("./data/sauces.json", JSON.stringify(result), (err) => {
        if (err){
            console.log(err);
            reject(new Error('Something is not right in file writing!'))
        }
        else {
            console.log("File written successfully\n");
            // pushToBranch()
            resolve("File written successfully")
        }
    })

    })
    
}

exports.createSauce = async (req, res, next) => {
    // console.log("Create sauce controller fired...")

    // writeFile()
    // pushToBranch()

    // let prom1 = new Promise(writeFile)
    //     .then(new Promise(pushToBranch).then(() => {
    //         res.status(200).json({
    //             type: "success",
    //             message: "Post created successfully",
    //             data: {
    //             // post,
    //             },
    //         });
    //     }) )
    const obj = req.body
    writeFile(obj)
    .then(new Promise(pushToBranch).then(() => {
        res.status(200).json({
            type: "success",
            message: "Sauce has been added successfully!",
            data: {
                obj,
            },
        });
    }) )

    // let prom1 = new Promise(writeFile)
    // .then(new Promise(pushToBranch).then(() => {
    //     res.status(200).json({
    //         type: "success",
    //         message: "Post created successfully",
    //         data: {
    //         // post,
    //         },
    //     });
    // }) )

    

    
    
}