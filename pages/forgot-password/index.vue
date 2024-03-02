<template>
    <UiContainer class="flex min-h-dvh items-center justify-center">
      <div class="w-full max-w-[340px]">
        <div class="text-center">
          <h1 class="text-3xl font-semibold lg:text-4xl">فراموشی رمز عبور</h1>
          
        </div>
        <form @submit="submit" class="mt-10">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <UiVeeInput name="email" label="* ایمیل " placeholder="john@example.com" type="email" />
            <UiButton type="submit" class="w-full">ارسال دستورالعمل</UiButton>
            <UiDivider label="or" />
            <UiButton to="/" type="button" class="w-full" variant="outline"> وارد حساب خود شوید </UiButton>
          </fieldset>
        </form>
      </div>
    </UiContainer>
  </template>
  
  <script lang="ts" setup>
    import { sendPasswordResetEmail } from "firebase/auth";
    definePageMeta({
      middleware: "already-logged-in"
    });
  
    // get auth instance
    const auth = useFirebaseAuth();
  
    const { handleSubmit, isSubmitting } = useForm({
      validationSchema: toTypedSchema(ForgotPasswordSchema),
    });
  
    const submit = handleSubmit(async (values, ctx) => {
      const loading = useSonner.loading("در حال پردازش", {
        description: "We are sending the instructions to your email",
      });
      try {
        await sendPasswordResetEmail(auth!, values.email, {
          url: "http://localhost:3000",
        });
        useSonner.success("Please check your email", {
          id: loading,
          description: "We have sent you instructions to reset your password",
        });
        // redirect to the sign in page
        return await navigateTo("/", { replace: true });
      } catch (error: any) {
        // show error
        console.log(error.message);
        useSonner.error(error.message, {
          id: loading,
        });
      }
    });
  </script>