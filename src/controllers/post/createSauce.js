const simpleGit = require("simple-git");
const git = simpleGit.default();
const fs = require('fs');
const e = require("cors");
const { setTimeout } = require("timers/promises");
const beautify = require("json-beautify");

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
        console.log("3. commiting")
        // git.commit("Update sauces", "sauces").push('origin', 'testing');
        git.add(["./data/sauces.json"])
            .commit("Update sauces")
            .push(['-u', 'origin', 'testing'], () => resolve("4. Git done...!"));
    }catch(e){
        console.log(e)
        reject(new Error('Something is not right in git!'))
    }
    console.log("Git done")

}
const writeFile = async (obj) => {

    return new Promise( (resolve, reject) => {

    var result = JSON.parse(fs.readFileSync('./data/sauces.json', 'utf8'))

        result.push(obj)

        console.log("1. Writing to file...")

        fs.writeFile("./data/sauces.json", beautify(result, null, 2, 100), (err) => {
            if (err){
                console.log(err);
                reject(new Error('Something is not right in file writing!'))
            }
            else {
                console.log("2. File written successfully\n");
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
        console.log("3. sending response...")
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