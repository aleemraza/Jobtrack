const Job = require('../Model/jobModel');
const User = require('../Model/userModel');
//Create A job 
exports.createJob = async(req,res)=>{
    try{
    console.log(req.body) 
    const {company,position} = req.body;
    if(!company || !position){
        res.status(404).json({
            status:"failed",
            message:"Please provide complete deatils"
        });
        return;
    }
    req.body.createdBy = req.user._id;
    const job = await Job.create(req.body);
    res.status(201).json({
        status:"Secuess",
        message:"Job Created Secusessfully",
        data: {
            job
        }
    });
    }catch(error){
        console.log(error)
        res.status(404).json({
            status:"failed",
            message:"Api didnot work"
        });
    }
    
}
// get all job 
exports.getAllJob = async(req,res)=>{
    try{
        const { status, jobType, sort, search } = req.query;
        //console.log(status)
        const queryObject = { createdBy: req.user._id};
       // console.log(queryObject)
        if (status && status !== 'all') {
            queryObject.status = status;
          }
          if (jobType && jobType !== 'all') {
            queryObject.jobType = jobType;
          }
          if (search) {
            queryObject.position = { $regex: search, $options: 'i' };
          }
        let result = Job.find(queryObject);
        if (sort === 'latest') {
            result = result.sort('-createdAt');
          } else if (sort === 'oldest') {
            result = result.sort('createdAt');
          } else if (sort === 'a-z') {
            result = result.sort('position');
          } else if (sort === 'z-a') {
            result = result.sort('-position');
          }
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        result = result.skip(skip).limit(limit);
        const jobs = await result;
        const totalJobs = await Job.countDocuments(queryObject);
        const numOfPages = Math.ceil(totalJobs / limit);  
        res.status(200).json({
            message:"this is very good",
            data:{
                jobs, 
                totalJobs, 
                numOfPages
            }
        })
    }catch(eror){
        console.log(eror)
        res.status(404).json({
            status:"failed",
            message:"Internal Server Error",
        });
    }   
}
//Update Controler
exports.updateJob = async(req,res)=>{
  try{
    const {id:jobId} = req.params;
    // console.log(jobId)
    const {company,position} = req.body
    // console.log(company)
    if(!company || !position){
      return res.status(404).json({
        status:"Failed",
        message:"Please provide all values"
      })
    }
    // Find the job and check permissions in one go
    const job = await Job.findOne({_id:jobId})
    if(!job){
      return res.status(403).json({
        status:"Failed",
        message:"No job Data Found"
      })
    }
    // console.log('CreateBy',job.createdBy.toString())
    // console.log('CreateBy',req.user._id.toString())

    // Check if the user has permission to update the job
    if(req.user._id.toString() === job.createdBy.toString()){
       // Update the job
       const updateJob = await Job.findByIdAndUpdate({_id:jobId}, req.body,{
        new: true,
        runValidators: true,
       })
       res.status(200).json({
        status:'seccuess',
        data:{
          updateJob
        }
      });
    }else{
      res.status(404).json({
        status:"Failed",
        message:"Not authorized to access this route"
      });
    }
  }catch(error){
    console.log(error)
        res.status(404).json({
            status:"failed",
            message:"Internal Server Error",
        });
  }
}
exports.deleteJob = async(req,res)=>{
  const {id:jobId} = req.params;
  const job = await Job.findOne({_id:jobId})
  if(!job){
    return res.status(403).json({
      status:"Failed",
      message:"No job Data Found"
    });
  }
  //Check Permssion 
  if(req.user._id.toString() === job.createdBy.toString()){
     await job.remove();
     res.status(200).json({
      status:'seccuess',
      message:"Success! Job removed"
    });
  }else{
    res.status(404).json({
      status:"Failed",
      message:"Not authorized to access this route"
    });
  }
}

