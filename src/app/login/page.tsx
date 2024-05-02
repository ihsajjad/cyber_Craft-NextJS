"use client";
import { AuthUserType, LoginType } from "@/lib/types";
import { errorToast, successToast } from "@/lib/utils";
import { AuthContext } from "@/providers/AuthProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { setUser } = useContext(AuthContext) || {};
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginType>();

  const onSubmit = handleSubmit(async (value) => {
    console.log(value);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(value),
    });

    const result = (await response.json()) as AuthUserType;
    if (response.ok && setUser && result.email) {
      setUser(result);
      if (result.role === "User") {
        router.push("/contact");
      } else {
        router.push("/");
      }
      successToast("Login Successfull");
    } else {
      errorToast("Failed to login");
    }
  });

  const showInputError = () => {
    return (
      <span className="text-sm text-red-500">This field is required!</span>
    );
  };
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center">
      <div className="custom-form-container">
        <Image
          src={"/CClogo.png"}
          alt="Cyber Craft"
          width={116}
          height={38}
          className="mx-auto"
        />

        <form onSubmit={onSubmit} className="custom-form">
          <label className="w-full">
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email Address"
              className="custom-input"
            />
            {errors.email && showInputError()}
          </label>
          <label className="w-full">
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className="custom-input"
            />
            {errors.password && showInputError()}
          </label>

          <input type="submit" value="Login" className="custom-btn rounded" />
        </form>
      </div>
    </div>
  );
};

export default Login;
