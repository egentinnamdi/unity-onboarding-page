interface IChildren {
  children: React.ReactNode;
}

interface IClass {
  className?: string;
}

type SI = SI;

interface IRegistration {
  name: string;
  phone: string;
  email: string;
  password: string;
  agreeTerms?: boolean;
}

interface ILogin {
  email: string;
  password: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface ICustomError {
  response?: {
    data?: {
      data?: Record<string, unknown>;
      error?: string;
      message?: string;
      status?: number;
    };
    status?: number;
  };
  message?: string;
}

interface handleToastNotifsInterface {
  type: "success" | "error" | "loading" | "custom";
  message: string;
  id?: string;
  position?: ToastPosition | undefined;
  duration?: number;
  dark?: boolean;
}

type ToastMethod = {
  success: typeof toast.success;
  error: typeof toast.error;
  loading: typeof toast.loading;
  custom: typeof toast.custom;
};

type DelDeac = "del" | "deac" | "acti" | "upd";

interface IDelDeac {
  userId: SI;
  actionType: DelDeac;
}

interface updatedDataType {
  [name: string]: string;
}
