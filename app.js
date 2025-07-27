const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const axios = require('axios'); // Add this
const app = express();
const ProblemPost = require("./models/problempost");
const Alerts = require("./models/alerts");

mongoose.connect('mongodb://localhost:27017/SmartIndiaHackathon')
.then(() => {
    console.log('connected');
})
.catch((err) => {
    console.log(err);
});

app.set("view engine", 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Function to fetch CVE data
async function getCveData(cveId) {
    const baseUrl = 'https://cve.circl.lu/api/cve/';
    const url = `${baseUrl}${cveId}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Failed to retrieve data for ${cveId}. Error: ${error.message}`);
        return null;
    }
}

// Function to format CVE data
function formatCveData(cveData) {
    if (cveData) {
        return [{
            title: ' ',
            CVE: cveData.id,
            Description: cveData.summary,
            published_date: cveData.Published,
            Severity: cveData.cvss,
            references: cveData.references || [],
            impact: cveData.impact,
        }];
    } else {
        console.log("No data available for the provided CVE ID.");
        return [];
    }
}

// CVE route
app.get('/cve/:id', async (req, res) => {
    const cveId = req.params.id;
    const cveData = await getCveData(cveId);
    const formattedData = formatCveData(cveData);

     res.render("report/scraperResults",{cveData:formattedData})
});

// Default route
app.get('/', async (req, res) => {
    try {
        // Fetch the latest 10 patches
        const latestPatches = await ProblemPost.find({}).sort({ createdAt: -1 }).limit(10);

        // Count CVEs by severity level
        const severityCounts = await ProblemPost.aggregate([
            {
                $group: {
                    _id: "$seviyarity",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Initialize counts
        let highSeverityCVECount = 0;
        let severeCVECount = 0;
        let mediumCVECount = 0;
        let lowCVECount = 0;

        // Assign the counts based on severity
        severityCounts.forEach(item => {
            if (item._id === "Critical") {
                highSeverityCVECount = item.count;
            } else if (item._id === "High") {
                severeCVECount = item.count;
            } else if (item._id === "Medium") {
                mediumCVECount = item.count;
            } else if(item._id === "Low") {
                lowCVECount = item.count;
            }
        });

        // Render the data to the home.ejs view
        res.render("home", {
            latestPatches,
            highSeverityCVECount,
            severeCVECount,
            mediumCVECount,
            lowCVECount
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).send("Error fetching data");
    }
});

app.get('/getcve',(req,res)=>{
    const cveData={};
    res.render('report/scraperResults',{cveData})
})

app.post('/getcve', (req, res) => {
    const cveid = req.body.cveNumber;
    res.redirect(`/cve/${cveid}`);
});


app.get('/allReports',async (req,res)=>{
    const reports=await ProblemPost.find({})
    // .sort({ cve: 1 })
    res.render("report/index",{reports})
    
})

app.get('/allReports/allalert',async (req,res)=>{

    const alerts=await Alerts.find({})

    res.render("report/alert",{alerts})

})

app.get('/allReports/allalert/:id',async (req,res)=>{

    const alert=await Alerts.findById(req.params.id)

    res.render("report/showalert",{alert})

})

app.get('/allReports/new',(req,res)=>{ 

    res.render('report/new')

})

app.get('/allReports/newalert',async(req,res)=>{

    res.render('report/newalert')

})



app.get('/allReports/allalert/:id/edit',async (req,res)=>{

    const alert=await Alerts.findById(req.params.id)

    res.render('report/editalert',{alert})

})



app.post('/allReports/alert',async (req,res)=>{

    const al=new Alerts(req.body.alert)

    await al.save()

    res.redirect('/allReports/allalert')

})

app.put('/allReports/allalert/:id',async (req,res)=>{

    const { id } = req.params;

    const { name, mail, seviyarity } = req.body.alert;

    const update = { name, mail, seviyarity };

    const alert = await Alerts.findByIdAndUpdate(id, update);

    res.redirect(`/allReports/allalert/${alert._id}`);

})

app.delete('/allReports/allalert/:id', async (req, res) => {

    const { id } = req.params;

    await Alerts.findByIdAndDelete(id);

    res.redirect('/allReports/allalert');

})

app.post('/allReports',  async(req,res)=>{ 
    const rep=new ProblemPost(req.body.report) 
    // console.log(rep.patch);
    await rep.save()
    res.redirect(`/allReports/${rep._id}`)        
})



app.post('/allReports/search',async(req,res)=>{
    const {cve}=req.body
    // console.log(cve)
    const reports= await ProblemPost.find({ cve: { $regex: cve, $options: 'i' } })
    res.render('report/search',{cve:cve,reports:reports})
})
app.get('/allReports/:id',async(req,res)=>{
    const report=await ProblemPost.findById(req.params.id)
    res.render("report/show",{report})
}) 
app.get('/allReports/:id/edit',async (req,res)=>{
    const report=await ProblemPost.findById(req.params.id)
    res.render('report/edit',{report})
})
app.put('/allReports/:id',async (req,res)=>{
    const {id}=req.params
    const report =await ProblemPost.findByIdAndUpdate(id,{...req.body.report})
    res.redirect(`/allReports/${report._id}`)
})
app.delete('/allReports/:id',async(req,res)=>{
    const {id}=req.params
    await ProblemPost.findByIdAndDelete(id)
    res.redirect('/allReports') 
})

 
     

//starting to the port
app.listen(3000,()=>{
    console.log("listening on port 3000");
})