exports.show = async(req,res)=>{
    res.status(200).json({
        status: 'Success',
        message: 'You have access to this route',
    });
}