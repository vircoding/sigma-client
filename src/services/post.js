import { authorizedAPI } from "./api.js";

export default {
  insertPost(post, token) {
    return authorizedAPI().post("/posts", {
      type: post.type,
      province: post.address.province,
      municipality: post.address.municipality,
      living_room: post.features.living_room,
      bed_room: post.features.bed_room,
      bath_room: post.features.bath_room,
      dinning_room: post.features.dinning_room,
      kitchen: post.features.kitchen,
      garage: post.features.garage,
      garden: post.features.garden,
      pool: post.features.pool,
      phone: post.phone,
      description: post.description,
      currency: post.currency,
      frequency: post.frequency,
      amount: post.amount,
    });
  },
};
