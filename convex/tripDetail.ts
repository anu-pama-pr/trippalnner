import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const CreateTripDetail = mutation({
  args: {
    tripId: v.string(),
    uid: v.id("userTable"),
    tripDetail: v.any(),
  },

  handler: async (ctx, args) => {
    const result = await ctx.db.insert("TripDetailTable", {
      tripDetail: args.tripDetail,
      tripId: args.tripId,
      uid: args.uid,
    });
    return { success: true, tripDetailId: result };
  },
});


export const GetUserTrips=query({
  args:{
    uid :v.id('userTable')
  },
  handler:async(ctx,args)=>{
    const result=await ctx.db.query('TripDetailTable')
    .filter(q=> q.eq(q.field('uid'),args.uid))
    .order('desc')
    .collect();
    return result;
  }
})