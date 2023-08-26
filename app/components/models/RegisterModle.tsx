"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import UseRegisterModel from "../hooks/useRegisterModle";
import { useCallback, useState } from "react";
import Model from "./Model";
import Heading from "../Heading";
import Input from "../Input";
import { toast } from "react-hot-toast/headless";
import Button from "../Button";
import { AiFillGithub } from "react-icons/ai";
import UseLoginModel from "../hooks/useLoginModel";
const RegisterModle = () => {
  const loginModel = UseLoginModel();
  const registerModel = UseRegisterModel();
  const [isLoading, setIsloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsloading(true);
    axios
      .post("/api/register", data)
      .then((res) => {
        registerModel.onClose();
        loginModel.onOpen();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        setIsloading(false);
      });
  };
  const toggle = useCallback(() => {
    registerModel.onClose();
    loginModel.onOpen();
  }, [loginModel, registerModel]);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create An Account" center />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  const FooterContent = (
    <div className="flex flex-col gap-4 mt-3 ">
      <hr />
      <Button
        outline
        label="Continue With Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue With Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-center mt-4 font-light text-neutral-500">
        Already have a Account?
        <p
          onClick={toggle}
          className="ml-2 text-gray-800 cursor-pointer hover:underline font-semibold"
        >
          Log In
        </p>
      </div>
    </div>
  );
  return (
    <Model
      disable={isLoading}
      isOpen={registerModel.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={FooterContent}
    />
  );
};

export default RegisterModle;
