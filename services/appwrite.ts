import { Client, Account, ID } from "appwrite";
import supabase from "./supabase";
import axios from "axios";
import { users } from "@prisma/client";

export const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string); // Replace with your project ID

export const account = new Account(client);
export { ID } from "appwrite";

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

export type LoggedInUser = users;

export class AppwriteService {
  //create a new record of user inside appwrite
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        try {
          console.log("userAccount: " + JSON.stringify(userAccount));
          await axios.post("/api/user", userAccount);
          return this.login({ email, password });
        } catch (error: any) {
          account.deleteIdentity(userAccount.$id);
        }
      } else {
        return userAccount;
      }
    } catch (error: any) {
      throw error;
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailSession(email, password);
    } catch (error: any) {
      throw error;
    }
  }

  async isLoggedIn(): Promise<LoggedInUser | null> {
    try {
      const data = await this.getCurrentUser();
      const userData = await axios.get<LoggedInUser>(
        `/api/user?id=${data?.$id}`
      );
      return userData.data;
    } catch (error) {
      console.log("isLoggedIn error: " + error);
    }

    return null;
  }

  async getCurrentUser() {
    try {
      return account.get();
    } catch (error) {
      console.log("getcurrentUser error: " + error);
    }

    return null;
  }

  async logout() {
    try {
      return await account.deleteSession("current");
    } catch (error) {
      console.log("logout error: " + error);
    }
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;
