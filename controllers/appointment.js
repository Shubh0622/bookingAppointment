const Appointment = require('../model/appointment');

exports.getAppointments = async (req,res,next)=>{
    try{
        const appointments = await Appointment.findAll();
        res.status(200).json({allAppointments: appointments});     
    }
    catch(err){
        res.status(500).json({
            error: err
        })
    }
};

exports.deleteAppointment = async(req,res,next)=>{
    try{
        if(req.params.id=='undefined'){
            return res.status(400).json({
                error: 'ID is missing'
            })
        }
        const aId = req.params.id;
        await Appointment.destroy({where:{id: aId}});
        res.sendStatus(200);
    }
    catch(err){
        res.status(500).json({
            error: err
        })
    } 
};

exports.postAddAppointment = async (req,res,next)=>{
    try{
        // if(!req.body.number){
        //     throw new Error('Phone number is mandatory.');
        // }
        // if(!req.body.email){
        //     throw new Error('Email is mandatory.');
        // }
        const name = req.body.name;
        const number = req.body.number;
        const email = req.body.email;
        const data = await Appointment.create({name: name, number: number, email: email})
        res.status(201).json({newAppointmentDetail: data});
    }
    catch(err){
        res.status(500).json({
            error: err
        })
    }
};