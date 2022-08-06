const simpleGit = require("simple-git");
const git = simpleGit.default();

const addRemoteRepository = async () => {
    // await git.checkout("testCheckout");
    // const branch = await git.branch();
    // console.log(branch.current)
    try{
        await git.addRemote('sauces', "https://github.com/sondrebjarkum/sondrebjarkum.github.io")
        
    }catch{
        console.log("Remote already exists!")
    }
    // const remote = await git.listRemote()
    // console.log(remote)
}

const pushToRemote = async () => {
    const remotes = await git.getRemotes(true)
    const filtered = remotes.filter( e => e.name === 'sauces').map( e => e.refs.push)
    console.log(filtered)
    git.push(filtered)
}

exports.createSauce = async (req, res, next) => {
    console.log("Create sauce controller fired...")
    // console.log(req.body)

    addRemoteRepository()
    pushToRemote()
    
    res.status(200).json({
        type: "success",
        message: "Post created successfully",
        data: {
        // post,
        },
    });
    
}