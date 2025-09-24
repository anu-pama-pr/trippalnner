import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { image } from "motion/react-client";

// export const CreateNewUser = mutation({
//     args: {
//         name: v.string(),
//         email: v.string(),
//         imageUrl: v.string(),
//         subscription: v.optional(v.string()),
//     },
//     handler: async (ctx, args) => {
//         // if user already exist ?

//         const user = await ctx.db
//             .query("userTable")
//             .filter((q) => q.eq(q.field("email"), args.email))
//             .collect();
//         if (user?.length === 0) {
//             const userData = {
//                 name: args.name,
//                 email: args.email,
//                 imageUrl: args.imageUrl,
//                 subscription: args.subscription ?? "free",//make the user free default
//             };
//             // if not there create new user
//             const result = await ctx.db.insert("userTable", userData);
//             return userData;
//         }
//         return user[0];
//     },
// });


export const CreateNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    subscription: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("userTable")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user.length === 0) {
      const userData = {
        name: args.name,
        email: args.email,
        imageUrl: args.imageUrl,
        subscription: args.subscription ?? "free",
      };
      

      // insert new user
      const id = await ctx.db.insert("userTable", userData);
      return {
        id,          // ✅ Convex Id
        ...userData, // include other user info
      };
    }

    // return existing user including its id
    return user[0]; // user[0] already contains id from Convex
  },
});
