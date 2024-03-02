<template>
    <UiContainer class="flex min-h-dvh items-center justify-center">
      <div class="w-full max-w-[340px]">
        <div class="text-center">
          <h1 class="text-3xl font-semibold lg:text-4xl">وارد شوید</h1>
        </div>
        <form @submit="submit" class="mt-10">
          <fieldset :disabled="isSubmitting" class="grid gap-5 text-right">
            <UiVeeInput name="email" label="* ایمیل  " placeholder="john@example.com" type="email" />
            <UiVeeInput name="password" label="* رمز عبور " type="password" />
            <p>
              <NuxtLink
                class="text-sm font-semibold text-primary"
                to="/forgot-password"
                >رمز عبور خو را فراموش کرده اید؟</NuxtLink>
            </p>
            <UiButton type="submit" class="w-full"> وارد شوید </UiButton>
            <UiDivider label="or" />
            <UiButton @click="signInWithGoogle" type="button" class="w-full" variant="outline">
              <Icon name="logos:google-icon" /> وارد شدن با حساب گوگل
            </UiButton>
          </fieldset>
        </form>
        <p class="mt-10 text-center text-sm">
          حساب کاربری ندارید؟
          <NuxtLink class="text-sm font-semibold text-primary hover:underline" to="/register"
            >حساب کاربری ایجاد نمایید</NuxtLink
          >
        </p>
      </div>
    </UiContainer>
  </template>
  
  <!-- This has to be created in a separate script tag -->
  <script lang="ts">
    import { GoogleAuthProvider } from "firebase/auth";
  
    export const googleAuthProvider = new GoogleAuthProvider();
  </script>
  
  <script lang="ts" setup>
    import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
    definePageMeta({
      middleware: "already-logged-in"
    });
    // get auth instance
    const auth = useFirebaseAuth();
  
    const { handleSubmit, isSubmitting } = useForm({
      validationSchema: toTypedSchema(LoginSchema),
    });
  
    const submit = handleSubmit(async (values, ctx) => {
      const loading = useSonner.loading("در حال پردازش ...", {
        description: "شما وارد شدید",
      });
      try {
        await signInWithEmailAndPassword(auth!, values.email, values.password);
        useSonner.success("حساب شما با موفقیت ایجاد شد.", {
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
  
    const signInWithGoogle = async () => {
      const loading = useSonner.loading("در حال پردازش ", {
        description: "حساب شما با موفقیت ایجاد شد",
      });
      try {
        await signInWithPopup(auth!, googleAuthProvider);
        useSonner.success("حساب شما با موفقیت ایجاد شد", {
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