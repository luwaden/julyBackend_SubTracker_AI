import Subscription  from "../model/subscription.model.js"
import{errorMessage} from "../utils/errorMessage.js"

export const createSubscription = async (req, res, next)=>{
    try {
        const {name, price, currency, frequency, category, paymentMethod, startDate,} = req.body

        let receiptImage; 
        if(req.file){
            const result = await uploadBufferToCloudinary(req.file.buffer, {folder:"subscription-tracker/receipts"});
            receiptImage = {url:result.secure_url, publicId: result.public_id}
        }


        const subscription = await Subscription.create({
            name, price,currency, frequency, category, paymentMethod, startDate, user:req.user._id, ...(receiptImage && {receiptImage})
        });

        res.status(201).json({
            success: true, 
            message:"Subscription created successfully",
            data: subscription,
        })

    } catch (error) {
        next (error)
    }
}

export const getMySubscription  =  async(req, res, next )=>{
    try{
        const filter ={user:req.user._id};
        if (req.query.status)filter.status = req.query.status;
        if (req.query.category)filter.category = req.query.category;
        if (req.query.frequency)filter.frequency = req.query.frequency;


        const subscription = await Subscription.find(filter).sort({renewalDate: 1})

        res.status(200).json({
            success: true,
            count:subscription.length,
            data:subscription
        })

    }catch(error){
        next(error)
    }
}

export const updateSubscription = async (req, res, next)=>{
    try {
        const subscription = await Subscription.fincById(req.params.id);
        if(!subscription){
           return next(errorMessage('Subscription not found'))
        }
        if (subscription.user.toString() !== req.user._id.toString()){
            return next(errorMessage("not authorized to update this subscription "))
        }

        const allowedFields = ["name", "price", "currency", "frequncy","category", "paymentMethod", "startDate", "status"]

        const updates = {};
        allowedFields.forEach((field)=>{
            if(req.body[field] !== undefined) updates[field]=req.body[field]});
        
        const updated = await Subscription.findByIdAndUpdate(req.params.id,updates, {new:true, runValidators:true})

        res.status(200).json({
            success:true, 
            message:"The subscription has been updated",
            data: updated
        })
    } catch (error) {
        
    }
}