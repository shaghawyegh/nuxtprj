<template>
    <div class="sticky top-20 mt-5 text-right">
    
      <UiButton class="text-right" @click="dialog = true">یادآوری</UiButton>
      
        <UiContainer>
              <template v-for="p in pets" :key="p.id">
                    
                        <div class="mt-5 flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <UiCardFooter class="gap-3">
                                        <UiButton @click="setEdit(p)" size="sm">ویرایش</UiButton>
                                        <UiButton @click="remove(p)" size="sm" variant="ghost">حذف </UiButton>
                                </UiCardFooter>
                              
                                        <div>
                                        <p class="font-semibold">
                              
                                        <span class="mr-2 text-muted-foreground"></span>{{ p.name }}
                                        </p>
                                        </div>
                                        <div>
                                        <p class="text-muted-foreground"><span class="mr-2"></span>{{ p.age }}</p>
                                        </div>
                                        <div>
                                        <Icon name="heroicons:check-circle" class="h-4 w-4 text-muted-foreground" />
                                        </div>
                                   

                                
                            </div>
                        </div>
                    
                </template>
                
            
            
        </UiContainer>
      
      <PetModal v-model="dialog" :pet="editItem" />
    </div>
  </template>
  
  <script setup lang="ts">
    const reminders = [
      { title: "Call John", time: "10:00 AM" },
      { title: "Meeting with Jane", time: "11:00 AM" },
      { title: "Call Sally", time: "12:00 PM" },
      { title: "Lunch with Sarah", time: "1:00 PM" },
    ];
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
      const res = confirm("Are you sure you want to remove this pet?");
      if (res) {
        await deleteDoc(doc(db, collectionName, pet.id!));
        useSonner.success("Pet removed successfully");
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