"use client";
import { LoginType } from "@/lib/types";
import Image from "next/image";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginType>();

  const onSubmit = handleSubmit((value) => {
    console.log(value);
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
              type="text"
              {...register("email", { required: true })}
              placeholder="Full Name"
              className="custom-input"
            />
            {errors.email && showInputError()}
          </label>
          <label className="w-full">
            <input
              type="text"
              {...register("password", { required: true })}
              placeholder="Email Address"
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
