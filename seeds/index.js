const mongoose=require("mongoose")
const ProblemPost=require("../models/problempost")
const problems=require("./problem")
mongoose.connect('mongodb://localhost:27017/SmartIndiaHackathon')
.then(()=>{
    console.log('connected')
})
.catch((err)=>{
    console.log(err)
})

const seedDB=async ()=>{
    await ProblemPost.deleteMany({})
    for(let i=0;i<15;i++){
        const x=new ProblemPost({
            title:problems[i].title,
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjp7mBPNB-ED1BPe3qr8ZkSnUQdE-iXWvb3A&s",
            description:problems[i].description,
            seviyarity:problems[i].seviyarity,
            cve:problems[i].cve,
            patch:problems[i].patch,
            solution:problems[i].solution
        })
        await x.save()
        // console.log(problems[i])
    }
}

seedDB().then(()=>{
    mongoose.connection.close()
})