"use server";

import postModel from "@/models/postModel";
import connectDatabase from "@/config/database";

export async function getPosts() {
  try {
    await connectDatabase();
    const data = JSON.parse(JSON.stringify(postModel.find()));

    return { data };
  } catch (error) {
    return { errMsg: error.message };
  }
}
