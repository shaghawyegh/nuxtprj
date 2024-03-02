<template>
    <div>
      <Header />
      <div class="container lg:grid lg:grid-cols-12 lg:gap-10">
      
        <Sidebar class="sticky top-[65px] hidden h-[calc(100vh-65px)] py-5 lg:col-span-3 lg:block" />
      
        <main class="py-5 lg:col-span-6">
          
          <StatusCard />
          <NewCustomers />
          <SalesChart />

        </main>
        <div class="hidden py-5 lg:col-span-3 lg:block">
          <Reminders />

        </div>
      </div>

    </div>
  </template>
  
  <script lang="ts" setup>
    import { signOut } from "firebase/auth";
    import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
    import type { Pet } from "~/types";
  
    definePageMeta({ middleware: "auth" });
    useSeoMeta({
      title: "Pets",
      description: "Manage your pets",
    });
    const user = useCurrentUser();
  
    const dialog = ref(false);
    const editItem = ref<Pet>();
  
    const auth = useFirebaseAuth();
    const db = useFirestore();
    const collectionName = "pets";
  
    const q = query(collection(db, collectionName), where("userId", "==", user.value?.uid));
  
    const { data: pets, pending } = useCollection<Pet>(q);
  
    const logout = async () => {
      await signOut(auth!);
      await navigateTo("/", { replace: true });
    };
  
    const remove = async (pet: Pet) => {
      const res = confirm("آیا از حذف یاذآوری مطمئن می باشید؟");
      if (res) {
        await deleteDoc(doc(db, collectionName, pet.id!));
        useSonner.success("یادآوری با موفقیت حذف شد.");
      }
    };
  
    const setEdit = (pet: Pet) => {
      editItem.value = pet;
      dialog.value = true;
    };
  
    watch(dialog, (v) => {
      if (!v) {
        editItem.value = undefined;
      }
    });
  </script>