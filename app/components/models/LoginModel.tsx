"use client";
import axios from "axios";
import {signIn} from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";
import { FieldValue, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import UseRegisterModel from "../hooks/useRegisterModle";
import UseLoginModel from "../hooks/useLoginModel";
import { useCallback, useState } from "react";
import Model from "./Model";
import Heading from "../Heading";
import Input from "../Input";
import { toast } from "react-hot-toast";
import {useRouter} from "next/navigation"
import Button from "../Button";
import { AiFillGithub } from "react-icons/ai";
const LoginModel = () => {
  const router = useRouter();
  const registerModel = UseRegisterModel();
  const loginModel = UseLoginModel();
  const [isLoading, setIsloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsloading(true);
    signIn('credentials',{
      ...data,redirect:false,
    })
    .then((callback)=>{
      setIsloading(false);
      if(callback?.ok){
        toast.success('Logged In ');
        router.refresh();
        loginModel.onClose();
      }
      if(callback?.error){
        toast.error(callback.error)
      }
    })
  };
  const onToggle = useCallback(() => {
    loginModel.onClose();
    registerModel.onOpen();
  }, [loginModel, registerModel]);
  
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back" subtitle="Login To your Account" center />
      <Input
        id="email"
        label="Email"
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
        onClick={() => {signIn("google")}}
      />
       <Button
        outline
        label="Continue With Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
     <div className="
      text-neutral-500 text-center mt-4 font-light">
        <p>First time using Airbnb?
          <span 
            onClick={onToggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Create an account</span>
        </p>
      </div>
    </div>
  );
  return (
    <Model
      disable={isLoading}
      isOpen={loginModel.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={FooterContent}
    />
  );
};

export default LoginModel;
