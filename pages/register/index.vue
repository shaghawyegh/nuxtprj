<template>
    <UiContainer class="flex min-h-dvh items-center justify-center">
      <div class="w-full max-w-[340px]">
        <div class="text-center">
          <h1 class="text-3xl font-semibold lg:text-4xl">ثبت نام</h1>
        </div>
        <form @submit="submit" class="mt-10">
        <fieldset :disabled="isSubmitting" class="grid gap-5 text-right">
          <UiVeeInput name="name" label="* نام کاربری " placeholder="John Doe" />
          <UiVeeInput name="email" label="* ایمیل " placeholder="john@example.com" type="email" />
          <UiVeeInput name="password" label="* رمز عبور " type="password" />
          <UiButton type="submit" class="w-full"> ایجاد حساب </UiButton>
          <UiDivider label="یا" />
          <UiButton @click="signUpWithGoogle" type="button" class="w-full" variant="outline">
            <Icon name="logos:google-icon" /> وارد شدن با حساب گوگل 
          </UiButton>
        </fieldset>
      </form>
        <p class="mt-10 text-center text-sm">
          آیا حساب کاربری داری؟
          <NuxtLink class="text-sm font-semibold text-primary hover:underline" to="/"
            >اینجا وارد شوید</NuxtLink
          >
        </p>
      </div>
    </UiContainer>
  </template>
  <!-- This has to be created in a separate script tag -->
  <script lang="ts">
    import { GoogleAuthProvider } from "firebase/auth";
    definePageMeta({
      middleware: "already-logged-in"
    });

    export const googleAuthProvider = new GoogleAuthProvider();
  </script>
  
  <!-- This has to be created in a separate script tag -->
  <script lang="ts" setup>
    import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
    const auth = useFirebaseAuth();
    
    const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(RegisterSchema),
  });

  const submit = handleSubmit(async (values, ctx) => {
    const loading = useSonner.loading("در حال پردازش ", {
      description: "در حال ایجاد حساب کاربری",
    });
    try {
      const { user } = await createUserWithEmailAndPassword(auth!, values.email, values.password);
      await updateProfile(user, { displayName: values.name });
      useSonner.success("حساب شما با موفقیت ایجاد گردید.", {
        id: loading,
      });
      // redirect to the dashboard
      return await navigateTo("/admin/dashboard", { replace: true });
    } catch (error: any) {
      // show error
      console.log(error.message);
      useSonner.error(error.message, {
        id: loading,
      });
    }
  });
  const signUpWithGoogle = async () => {
    const loading = useSonner.loading("در حال پردازش ", {
      description: "در حال ایجاد حساب کاربری",
    });
    try {
      await signInWithPopup(auth!, googleAuthProvider);
      useSonner.success("حساب شما با موفقیت ایجاد گردید", {
        id: loading,
      });
      // redirect to the dashboard
      return await navigateTo("/admin/dashboard", { replace: true });
    } catch (error: any) {
      // show error
      console.log(error.message);
      useSonner.error(error.message, {
        id: loading,
      });
    }
  };


  </script>
