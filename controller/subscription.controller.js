import Subscription  from "../model/subscription.model.js"

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