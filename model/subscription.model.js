import mongoose from "mongoose"

const subscriptionSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
            trim: true,
            minLength:[2, "Subscription name must be at least 2 characters"]
        },
         price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Subscription price must be greater than 0"],
    },

    currency: {
      type: String,
      enum: ["USD", "EUR", "NGN"],
      default: "USD",
    },

    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: true,
    },

    category: {
      type: String,
      enum: ["entertainment", "productivity", "education", "health", "other"],
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["ussd", "transfer", "card", "crypto"],
      required: true,
      
    },
    status: {
         type: String,
      enum: ["active", "canceled", "expired"],
      default: "active",
    },

    startDate:{
        type:Date,
        required: [true, "Start date of the subscription is required" ],
        validate:{
            validator:(value)=> value <= new Date(),
            message:"Start date cannot be in the future",
        }
    }, 
    
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
       user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
     receiptImage: {
      url: { type: String, default: null },
      publicId: { type: String, default: null },
    },

    }, 
    {timestamps: true }
)


subscriptionSchema.pre("save", function(next){
    if (!this.renewalDate){
        const renewalPeriodsInDays ={
            daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
        }

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate( this.renewalDate.getDate() + renewalPeriodsInDays[this.frequency])
    }

    if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next()
})

const Subscription = mongoose.model("Subscription", subscriptionSchema)

export default Subscription