"use client";
import { UserDataType } from "@/lib/types";
import { errorToast, successToast } from "@/lib/utils";
import { AuthContext } from "@/providers/AuthProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { setUser } = useContext(AuthContext) || {};
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserDataType>();

  const onSubmit = handleSubmit(async (userData: UserDataType) => {
    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (response.ok && setUser) {
      setUser(result);
      router.push("/contact");
      successToast("Sign up Successfull");
    } else {
      errorToast("Failed to sign up");
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

        <form className="custom-form" onSubmit={onSubmit}>
          <label className="w-full">
            <input
              type="text"
              {...register("fullName", { required: true })}
              placeholder="Full Name"
              className="custom-input"
            />
            {errors.fullName && showInputError()}
          </label>
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
          <input type="submit" value="Signup" className="custom-btn rounded" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
