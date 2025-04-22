"use server";

import usersModel from "@/models/usersModel";
import connectDatabase from "@/config/database";

export async function getUsers() {
  try {
    await connectDatabase();
    const data = JSON.parse(JSON.stringify(usersModel.find()));

    return { data };
  } catch (error) {
    return { errMsg: error.message };
  }
}
