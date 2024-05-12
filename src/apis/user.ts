import Api from "./api";
import errorHandle from "./errorHandler";

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const res = await Api.post("/api/users/signup", { name, email, password });

    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const verifyOtp = async (otp: string) => {
  try {
    const res = await Api.post("/api/users/verifyotp", { otp });

    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const res = await Api.post("/api/users/signin", { email, password });

    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const getNotes = async (search: string, page: number) => {
  try {
    const res = await Api.get(
      `/api/users/allnotes?search=${search}&page=${page}`
    );

    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const addNote = async (title: string, content: string) => {
  try {
    const res = await Api.post("/api/users/addnote", { title, content });

    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const displaySingleNote = async (id: number) => {
  try {
    const res = await Api.get(`/api/users/singlenote?id=${id}`);

    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const editNote = async (id: number, title: string, content: string) => {
  try {
    const res = await Api.put("/api/users/editnote", { id, title, content });
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const trashNote = async (id: number) => {
  try {
    const res = await Api.put(`/api/users/trashnote?id=${id}`);
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const restoreNote = async (id: number) => {
  try {
    const res = await Api.put(`/api/users/restorenote?id=${id}`);
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};

export const deleteNote = async (id: number) => {
  try {
    const res = await Api.delete(`/api/users/deletenote?id=${id}`);
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};


export const userlogout = async () => {
  try {
    const res = await Api.get(`/api/users/logout`);
    return res;
  } catch (error) {
    errorHandle(error as Error);
  }
};
